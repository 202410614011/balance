# 🛍️ BALANCE E-TİCARET SİTESİ

Modern ve profesyonel bir e-ticaret platformu. Sweatshirt satışı için tasarlanmış, tam özellikli bir online alışveriş deneyimi.

## 📋 Özellikler

### ✅ Müşteri Tarafı
- 🏠 Modern ana sayfa (hero section, öne çıkanlar)
- 👕 Ürün kataloğu (hover efektli ürün kartları)
- 🛒 Sepet yönetimi (localStorage ile kalıcı)
- 📐 Beden seçimi (L/M)
- 💳 Güvenli ödeme sayfası (İyzico entegrasyonu)
- ✅ Sipariş onay sayfası
- 📦 Sipariş geçmişi
- 📱 Responsive tasarım

### 🔐 Admin Paneli
- 🔑 Şifre korumalı giriş (balance2025)
- 📊 Dashboard (istatistikler)
- 🔍 Sipariş arama
- 📝 Sipariş detayları görüntüleme
- 🎯 Sipariş durumu güncelleme
- 📄 CSV export

### 💰 Ödeme Sistemi
- 💳 İyzico kredi kartı entegrasyonu
- 🏦 Havale/EFT seçeneği
- 🔒 256-bit SSL güvenlik
- ✅ Demo ve gerçek mod desteği

## 🚀 Kurulum

### Frontend (Statik HTML)

1. Dosyaları web sunucunuza yükleyin
2. `index.html` sayfasını açın
3. Hemen kullanıma hazır!

### Backend (Gerçek Ödeme İçin)

```bash
# 1. Node.js paketlerini yükle
npm install

# 2. .env dosyası oluştur
cp .env.example .env

# 3. İyzico API anahtarlarını .env'e ekle
# .env dosyasını düzenleyip kendi anahtarlarınızı yazın

# 4. Server'ı başlat
npm start

# veya geliştirme modu (auto-reload):
npm run dev
```

## 🔑 İyzico Entegrasyonu

### Test Ortamı (Sandbox)

1. **Kayıt Ol:** https://sandbox-merchant.iyzipay.com
2. **API Anahtarları:** Settings > API & Security
3. **Test Kartları:**
   ```
   Kart No: 5528790000000008
   CVV: 123
   Son Kullanma: 12/30
   3D Secure Şifre: Test123
   ```

### Canlı Ortam (Production)

1. **Başvuru:** https://www.iyzico.com/basvuru
2. **Doğrulama:** Kimlik ve vergi belgelerini yükle
3. **Onay:** İyzico ekibi inceledikten sonra canlı API anahtarlarını al
4. **Entegre Et:** `.env` dosyasındaki anahtarları güncelle

## 📁 Dosya Yapısı

```
balance/
├── index.html              # Ana sayfa
├── sweatsihtler.html       # Ürün kataloğu
├── sepet.html              # Alışveriş sepeti
├── Ödeme.html              # Ödeme formu
├── iyzico-payment.html     # İyzico ödeme simülasyonu
├── siparis-basarili.html   # Sipariş başarılı
├── payment-failed.html     # Ödeme başarısız
├── siparislerim.html       # Sipariş geçmişi
├── admin.html              # Admin paneli
├── server.js               # Backend API server
├── package.json            # Node.js bağımlılıkları
├── .env.example            # Ortam değişkenleri örneği
├── .gitignore              # Git ignore kuralları
├── ODEME-ENTEGRASYONU.md   # Detaylı entegrasyon rehberi
└── README.md               # Bu dosya
```

## 🎨 Teknolojiler

### Frontend
- HTML5
- CSS3 (Flexbox, Grid, Animations)
- Vanilla JavaScript
- Google Fonts (Poppins)
- localStorage API

### Backend
- Node.js
- Express.js
- İyzico Node.js SDK
- CORS
- dotenv

## 🔐 Güvenlik

- ✅ API anahtarları `.env` dosyasında saklanır
- ✅ Hassas bilgiler client-side'da işlenmez
- ✅ CORS koruması aktif
- ✅ Input validasyonu mevcut
- ✅ Admin paneli şifre korumalı
- ✅ Kart bilgileri İyzico'da işlenir (PCI DSS uyumlu)

## 📊 Sipariş Durumları

| Durum | Açıklama | Renk |
|-------|----------|------|
| 🟡 Beklemede | Sipariş alındı, onay bekleniyor | Sarı |
| 🟢 Onaylandı | Admin onayladı, hazırlanıyor | Yeşil |
| 🔵 Kargolandı | Kargoya verildi | Mavi |
| 🟣 Tamamlandı | Müşteriye ulaştı | Mor |
| 🔴 İptal | Sipariş iptal edildi | Kırmızı |

## 💻 Kullanım

### Müşteri İşlemleri

1. **Ürün Seçimi:** Ana sayfadan veya katalogdan ürün seç
2. **Beden Seçimi:** L veya M bedenini seç
3. **Sepete Ekle:** "Sepete Ekle" butonuna tıkla
4. **Sepeti Görüntüle:** Sağ üst köşeden "Sepetim"e tıkla
5. **Ödeme:** "ÖDEMEYE GEÇ" butonuyla ödeme sayfasına git
6. **Bilgileri Doldur:** Teslimat ve ödeme bilgilerini gir
7. **Ödeme Yap:** İyzico'da güvenle öde
8. **Onay:** Sipariş numaranı al

### Admin İşlemleri

1. **Giriş:** `admin.html` sayfasına git
2. **Şifre:** `balance2025` şifresini gir
3. **Dashboard:** Siparişleri görüntüle
4. **Detay:** Siparişe tıklayarak detayları aç
5. **Durum Güncelle:** Dropdown'dan yeni durum seç
6. **Kaydet:** "Durumu Güncelle" butonuna tıkla

## 🌐 Canlıya Alma Checklist

- [ ] Domain satın al
- [ ] Hosting ayarla (Frontend için)
- [ ] VPS/Cloud server kur (Backend için)
- [ ] SSL sertifikası kur (HTTPS)
- [ ] İyzico canlı hesap aç
- [ ] Canlı API anahtarlarını al
- [ ] Backend'i deploy et
- [ ] Frontend'i upload et
- [ ] Test ödemeleri yap
- [ ] Gerçek ödeme dene
- [ ] E-posta bildirimleri ayarla
- [ ] Google Analytics ekle (opsiyonel)

## 📞 Destek

### İyzico Desteği
- **Website:** https://www.iyzico.com
- **Dokümantasyon:** https://dev.iyzipay.com
- **E-posta:** destek@iyzico.com

### Alternatif Ödeme Sistemleri
- **PayTR:** https://www.paytr.com (Türkiye)
- **Stripe:** https://stripe.com (Global)
- **PayPal:** https://www.paypal.com (Global)

## 📝 Lisans

Bu proje BALANCE markası için özel olarak geliştirilmiştir.

## 🎯 Gelecek Geliştirmeler

- [ ] Kullanıcı kayıt/giriş sistemi
- [ ] Ürün yorumları ve puanlama
- [ ] Favori ürünler
- [ ] Kargo takip entegrasyonu
- [ ] E-posta bildirimleri
- [ ] SMS bildirimleri
- [ ] Stok yönetimi
- [ ] İndirim kuponları
- [ ] Multi-dil desteği
- [ ] Mobil uygulama

---

**Geliştirici Notu:** Bu site demo amaçlı simülasyon modu ile çalışmaktadır. Gerçek ödeme entegrasyonu için `ODEME-ENTEGRASYONU.md` dosyasını inceleyin ve backend kurulumunu tamamlayın.

✨ **BALANCE** - Premium Streetwear 2025
