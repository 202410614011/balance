# BALANCE E-TİCARET - ÖDEME ENTEGRASYONU REHBERİ

## 🔐 Gerçek Ödeme Entegrasyonu İçin Gereksinimler

### 1. İyzico Hesabı Açma
- **Website:** https://www.iyzico.com
- **Kayıt:** İş yeri bilgilerinizle kayıt olun
- **Doğrulama:** Kimlik ve vergi belgelerini yükleyin
- **Test ve Canlı API Anahtarları:** Dashboard'dan alın

### 2. Backend Server Kurulumu

#### Node.js + Express Örneği:

```javascript
// server.js
const express = require('express');
const Iyzipay = require('iyzipay');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// İyzico ayarları (GÜVENLE SAKLAYIN - .env dosyasında)
const iyzipay = new Iyzipay({
    apiKey: 'SIZIN_API_ANAHTARINIZ',
    secretKey: 'SIZIN_SECRET_ANAHTARINIZ',
    uri: 'https://sandbox-api.iyzipay.com' // Test ortamı
    // Canlı için: 'https://api.iyzipay.com'
});

// Ödeme başlatma endpoint'i
app.post('/api/initiate-payment', (req, res) => {
    const { orderData, customerData } = req.body;
    
    const request = {
        locale: Iyzipay.LOCALE.TR,
        conversationId: orderData.orderNumber,
        price: orderData.total,
        paidPrice: orderData.total,
        currency: Iyzipay.CURRENCY.TRY,
        installment: '1',
        basketId: orderData.orderNumber,
        paymentChannel: Iyzipay.PAYMENT_CHANNEL.WEB,
        paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
        
        // Callback URL'leri
        callbackUrl: 'https://siteniz.com/payment-callback',
        
        // Alıcı bilgileri
        buyer: {
            id: 'BY' + Date.now(),
            name: customerData.firstName,
            surname: customerData.lastName,
            email: customerData.email,
            identityNumber: '11111111111', // Gerçek TCKN
            registrationAddress: customerData.address,
            city: customerData.city,
            country: 'Turkey',
            zipCode: customerData.zipCode,
            ip: req.ip
        },
        
        // Teslimat adresi
        shippingAddress: {
            contactName: customerData.firstName + ' ' + customerData.lastName,
            city: customerData.city,
            country: 'Turkey',
            address: customerData.address,
            zipCode: customerData.zipCode
        },
        
        // Fatura adresi
        billingAddress: {
            contactName: customerData.firstName + ' ' + customerData.lastName,
            city: customerData.city,
            country: 'Turkey',
            address: customerData.address,
            zipCode: customerData.zipCode
        },
        
        // Sepet ürünleri
        basketItems: orderData.items.map((item, index) => ({
            id: 'BI' + index,
            name: item.name,
            category1: 'Giyim',
            category2: 'Sweatshirt',
            itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
            price: (item.price * item.qty).toFixed(2)
        }))
    };

    // İyzico'ya ödeme talebi gönder
    iyzipay.checkoutFormInitialize.create(request, (err, result) => {
        if (err) {
            console.error('İyzico hatası:', err);
            res.status(500).json({ error: 'Ödeme başlatılamadı' });
        } else {
            // İyzico'nun ödeme sayfası URL'ini döndür
            res.json({
                paymentPageUrl: result.paymentPageUrl,
                token: result.token
            });
        }
    });
});

// Ödeme callback endpoint'i (İyzico'dan dönüş)
app.post('/payment-callback', (req, res) => {
    const { token } = req.body;
    
    iyzipay.checkoutForm.retrieve({
        locale: Iyzipay.LOCALE.TR,
        token: token
    }, (err, result) => {
        if (err) {
            // Ödeme başarısız
            res.redirect('/payment-failed.html');
        } else if (result.paymentStatus === 'SUCCESS') {
            // Ödeme başarılı
            // Veritabanına kaydet
            // E-posta gönder
            res.redirect('/siparis-basarili.html?orderId=' + result.basketId);
        } else {
            res.redirect('/payment-failed.html');
        }
    });
});

app.listen(3000, () => {
    console.log('Backend server çalışıyor: http://localhost:3000');
});
```

#### package.json:
```json
{
  "name": "balance-backend",
  "version": "1.0.0",
  "dependencies": {
    "express": "^4.18.2",
    "iyzipay": "^2.0.52",
    "cors": "^2.8.5",
    "dotenv": "^16.0.3"
  }
}
```

### 3. Frontend'i Backend'e Bağlama

**Ödeme.html'deki `initiateIyzicoPayment()` fonksiyonunu güncelleyin:**

```javascript
async function initiateIyzicoPayment() {
    const form = document.getElementById('checkout-form');
    const formData = new FormData(form);
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    let total = 0;
    cart.forEach(p => total += p.price * p.qty);

    const orderData = {
        orderNumber: 'BLC' + Date.now().toString().slice(-8),
        total: total,
        itemCount: cart.reduce((sum, p) => sum + p.qty, 0),
        items: cart.map(p => ({
            name: p.name,
            price: p.price,
            qty: p.qty,
            beden: p.beden
        }))
    };

    const customerData = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        address: formData.get('address'),
        city: formData.get('city'),
        zipCode: formData.get('zipCode')
    };

    try {
        // Backend'e istek at
        const response = await fetch('http://localhost:3000/api/initiate-payment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ orderData, customerData })
        });

        const result = await response.json();

        if (result.paymentPageUrl) {
            // İyzico ödeme sayfasına yönlendir
            window.location.href = result.paymentPageUrl;
        } else {
            alert('Ödeme başlatılamadı. Lütfen tekrar deneyin.');
        }
    } catch (error) {
        console.error('Hata:', error);
        alert('Bir hata oluştu. Lütfen tekrar deneyin.');
    }
}
```

### 4. Güvenlik Önlemleri

✅ **YAPILMASI GEREKENLER:**
- API anahtarlarını ASLA frontend kodunda saklamayın
- `.env` dosyası kullanın ve `.gitignore`'a ekleyin
- HTTPS kullanın (SSL sertifikası)
- CORS ayarlarını doğru yapın
- Kullanıcı girişlerini validate edin
- SQL injection koruması yapın
- Rate limiting ekleyin

❌ **YAPILMAMASI GEREKENLER:**
- Kart bilgilerini kaydetmeyin
- API anahtarlarını commit etmeyin
- HTTP kullanmayın (sadece HTTPS)
- Frontend'de hassas bilgi işlemeyin

### 5. Alternatif Ödeme Sistemleri

#### PayTR (Türkiye)
- Website: https://www.paytr.com
- Kolay entegrasyon
- Düşük komisyon
- PHP SDK mevcut

#### Stripe (Global)
- Website: https://stripe.com
- Çok gelişmiş API
- Yabancı kartlar için ideal
- Node.js SDK mükemmel

#### PayPal
- Website: https://www.paypal.com
- Dünya çapında tanınır
- Express Checkout

### 6. Test Kartları (İyzico Sandbox)

```
Kart Numarası: 5528790000000008
CVV: 123
Son Kullanma: 12/30
3D Secure Şifre: Test123

Diğer test kartları:
- Visa: 4603450000000000
- MasterCard: 5528790000000008
```

### 7. Kurulum Adımları

```bash
# 1. Backend klasörü oluştur
mkdir balance-backend
cd balance-backend

# 2. Node.js projesini başlat
npm init -y

# 3. Gerekli paketleri yükle
npm install express iyzipay cors dotenv

# 4. .env dosyası oluştur
echo "IYZICO_API_KEY=sandbox-xxxx" > .env
echo "IYZICO_SECRET_KEY=sandbox-yyyy" >> .env

# 5. Server'ı çalıştır
node server.js
```

### 8. Canlıya Alma Checklist

- [ ] İyzico canlı hesap onayı alındı
- [ ] Canlı API anahtarları alındı
- [ ] Backend production sunucuya deploy edildi
- [ ] HTTPS sertifikası kuruldu
- [ ] Domain bağlandı
- [ ] Test ödemeleri yapıldı
- [ ] Hata logları ayarlandı
- [ ] E-posta bildirimleri test edildi
- [ ] Admin paneli test edildi

### 9. Maliyet Hesaplama

**İyzico Komisyonları:**
- Kredi kartı: %2.99 + 0.25 TL
- Banka kartı: %1.99 + 0.25 TL
- Örnek: 600 TL satış = 17.94 TL + 0.25 TL = 18.19 TL komisyon

### 10. Destek ve Dokümantasyon

- **İyzico Dokümantasyon:** https://dev.iyzipay.com
- **İyzico Destek:** destek@iyzico.com
- **Node.js SDK:** https://github.com/iyzico/iyzipay-node

---

## 🎯 ŞU ANKİ DURUM

Projenizde **simülasyon sistemi** kurulu. Gerçek ödeme için:

1. Yukarıdaki backend kodunu `balance-backend/server.js` olarak kaydedin
2. `npm install` ile paketleri yükleyin
3. İyzico'dan API anahtarlarını alın
4. `.env` dosyasına ekleyin
5. `node server.js` ile backend'i çalıştırın
6. Frontend'deki `initiateIyzicoPayment()` fonksiyonunu güncelleyin

**DEMO MODU:** Şu an test amaçlı çalışıyor, gerçek para transferi yok.
