// BALANCE E-TİCARET BACKEND SERVER
// Node.js + Express + İyzico Ödeme Entegrasyonu

const express = require('express');
const Iyzipay = require('iyzipay');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// İyzico Konfigürasyonu
const iyzipay = new Iyzipay({
    apiKey: process.env.IYZICO_API_KEY || 'sandbox-xxxx',
    secretKey: process.env.IYZICO_SECRET_KEY || 'sandbox-yyyy',
    uri: process.env.NODE_ENV === 'production' 
        ? 'https://api.iyzipay.com' 
        : 'https://sandbox-api.iyzipay.com'
});

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        message: 'BALANCE E-Ticaret Backend API',
        status: 'running',
        endpoints: {
            initiatePayment: 'POST /api/initiate-payment',
            paymentCallback: 'POST /api/payment-callback',
            checkPayment: 'GET /api/check-payment/:token'
        }
    });
});

// Ödeme başlatma endpoint'i
app.post('/api/initiate-payment', async (req, res) => {
    try {
        const { orderData, customerData } = req.body;

        // Validasyon
        if (!orderData || !customerData) {
            return res.status(400).json({ 
                error: 'Eksik veri', 
                message: 'Sipariş ve müşteri bilgileri gerekli' 
            });
        }

        // İyzico için istek hazırlama
        const request = {
            locale: Iyzipay.LOCALE.TR,
            conversationId: orderData.orderNumber,
            price: orderData.total.toFixed(2),
            paidPrice: orderData.total.toFixed(2),
            currency: Iyzipay.CURRENCY.TRY,
            installment: '1',
            basketId: orderData.orderNumber,
            paymentChannel: Iyzipay.PAYMENT_CHANNEL.WEB,
            paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
            
            // Callback URL (canlıya çıkınca kendi domain'iniz)
            callbackUrl: process.env.CALLBACK_URL || 'http://localhost:3000/api/payment-callback',
            
            // Müşteri bilgileri
            buyer: {
                id: 'BY' + Date.now(),
                name: customerData.firstName,
                surname: customerData.lastName,
                gsmNumber: customerData.phone,
                email: customerData.email,
                identityNumber: '11111111111', // Test için, gerçekte müşteriden alınmalı
                lastLoginDate: new Date().toISOString().split('T')[0] + ' 00:00:00',
                registrationDate: new Date().toISOString().split('T')[0] + ' 00:00:00',
                registrationAddress: customerData.address,
                ip: req.ip || '85.34.78.112',
                city: customerData.city,
                country: 'Turkey',
                zipCode: customerData.zipCode
            },
            
            // Teslimat adresi
            shippingAddress: {
                contactName: `${customerData.firstName} ${customerData.lastName}`,
                city: customerData.city,
                country: 'Turkey',
                address: customerData.address,
                zipCode: customerData.zipCode
            },
            
            // Fatura adresi
            billingAddress: {
                contactName: `${customerData.firstName} ${customerData.lastName}`,
                city: customerData.city,
                country: 'Turkey',
                address: customerData.address,
                zipCode: customerData.zipCode
            },
            
            // Sepet ürünleri
            basketItems: orderData.items.map((item, index) => ({
                id: `BI${index + 1}`,
                name: item.name,
                category1: 'Giyim',
                category2: 'Sweatshirt',
                itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
                price: (item.price * item.qty).toFixed(2)
            }))
        };

        console.log('İyzico isteği gönderiliyor:', request.conversationId);

        // İyzico'ya ödeme talebi gönder
        iyzipay.checkoutFormInitialize.create(request, (err, result) => {
            if (err) {
                console.error('İyzico hatası:', err);
                return res.status(500).json({ 
                    error: 'Ödeme başlatılamadı',
                    details: err 
                });
            }

            if (result.status === 'success') {
                console.log('Ödeme sayfası oluşturuldu:', result.token);
                res.json({
                    success: true,
                    paymentPageUrl: result.paymentPageUrl,
                    token: result.token
                });
            } else {
                console.error('İyzico başarısız yanıt:', result);
                res.status(400).json({
                    error: 'Ödeme başlatılamadı',
                    message: result.errorMessage
                });
            }
        });

    } catch (error) {
        console.error('Server hatası:', error);
        res.status(500).json({ 
            error: 'Sunucu hatası', 
            message: error.message 
        });
    }
});

// Ödeme callback endpoint'i (İyzico'dan dönüş)
app.post('/api/payment-callback', (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.status(400).send('Token bulunamadı');
    }

    console.log('Ödeme callback alındı, token:', token);

    // İyzico'dan ödeme sonucunu al
    iyzipay.checkoutForm.retrieve({
        locale: Iyzipay.LOCALE.TR,
        conversationId: token,
        token: token
    }, (err, result) => {
        if (err) {
            console.error('Callback hatası:', err);
            return res.redirect('/payment-failed.html?error=callback');
        }

        console.log('İyzico sonucu:', result);

        if (result.status === 'success' && result.paymentStatus === 'SUCCESS') {
            // ÖDEME BAŞARILI
            console.log('✅ Ödeme başarılı:', result.basketId);
            
            // Burada yapılması gerekenler:
            // 1. Veritabanına kaydet
            // 2. Stok güncelle
            // 3. E-posta gönder
            // 4. Admin'e bildirim
            
            res.redirect(`/siparis-basarili.html?orderId=${result.basketId}&paid=true`);
        } else {
            // ÖDEME BAŞARISIZ
            console.log('❌ Ödeme başarısız:', result.errorMessage);
            res.redirect(`/payment-failed.html?error=${encodeURIComponent(result.errorMessage)}`);
        }
    });
});

// Ödeme durumu sorgulama
app.get('/api/check-payment/:token', (req, res) => {
    const { token } = req.params;

    iyzipay.checkoutForm.retrieve({
        locale: Iyzipay.LOCALE.TR,
        token: token
    }, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Sorgulama hatası' });
        }

        res.json({
            status: result.status,
            paymentStatus: result.paymentStatus,
            basketId: result.basketId,
            paidPrice: result.paidPrice
        });
    });
});

// Test endpoint
app.get('/api/test', (req, res) => {
    res.json({
        message: 'Backend çalışıyor',
        iyzico: {
            configured: !!(process.env.IYZICO_API_KEY && process.env.IYZICO_SECRET_KEY),
            environment: process.env.NODE_ENV || 'development',
            apiUri: iyzipay.options.uri
        }
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ 
        error: 'Endpoint bulunamadı',
        path: req.path 
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error('Sunucu hatası:', err);
    res.status(500).json({ 
        error: 'Sunucu hatası',
        message: err.message 
    });
});

// Server başlat
app.listen(PORT, () => {
    console.log(`
╔═══════════════════════════════════════════╗
║   BALANCE E-TİCARET BACKEND SERVER       ║
╚═══════════════════════════════════════════╝

✅ Server çalışıyor: http://localhost:${PORT}
🔐 İyzico ortamı: ${process.env.NODE_ENV === 'production' ? 'CANLI' : 'TEST'}
📡 API endpoint: http://localhost:${PORT}/api

Endpoints:
  POST /api/initiate-payment   → Ödeme başlat
  POST /api/payment-callback    → İyzico callback
  GET  /api/check-payment/:token → Ödeme sorgula
  GET  /api/test                → Server testi

Ortam değişkenleri:
  IYZICO_API_KEY: ${process.env.IYZICO_API_KEY ? '✅ Ayarlandı' : '❌ Ayarlanmadı'}
  IYZICO_SECRET_KEY: ${process.env.IYZICO_SECRET_KEY ? '✅ Ayarlandı' : '❌ Ayarlanmadı'}
  CALLBACK_URL: ${process.env.CALLBACK_URL || 'http://localhost:3000/api/payment-callback'}
    `);
});

module.exports = app;
