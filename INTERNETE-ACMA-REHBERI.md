# 🌐 BALANCE WEBSİTESİNİ İNTERNETE AÇMA REHBERİ

Google'da aranabilir hale getirmek ve internette yayınlamak için detaylı adımlar.

## 📋 İhtiyaç Listesi

Sitenizi internete açmak için şunlar gereklidir:

1. **Domain Adı** (example.com)
2. **Web Hosting** (Frontend'i barındırmak için)
3. **Backend Hosting** (Node.js server'ı çalıştırmak için)
4. **SSL Sertifikası** (HTTPS - Google tarafından zorunlu)
5. **Google Search Console Kaydı** (Google'da görünmek için)

---

## 🚀 ADIM ADIM KURULUM

### ADIM 1: DOMAIN ADINI SATINAL

**Domain Sağlayıcıları (Türkiye):**
- 🔗 **Aksiyon**: https://www.aksiyon.net
- 🔗 **Namecheap**: https://www.namecheap.com
- 🔗 **GoDaddy**: https://www.godaddy.com
- 🔗 **1&1 Ionos**: https://www.ionos.com
- 🔗 **Domain.com.tr**: https://www.domain.com.tr

**Önerilen Domain Adları:**
- balance.com.tr
- balancegiyim.com
- balancesweatshirt.com
- balancetr.com

**Fiyat Aralığı:** 
- .com.tr: 30-50 ₺/yıl
- .com: 10-15$/yıl
- .store: 40-60₺/yıl

**Domain Seçim İpuçları:**
✅ Kısa ve kolay hatırlanır
✅ Markanız ile ilgili
✅ Türkçe karaktersiz (ASCII)
❌ Sayı ve tire kullanmaktan kaçının

---

### ADIM 2: HOSTING SEÇİMİ

BALANCE siteniz **2 bölümden oluşur:**
1. **Frontend** (HTML, CSS, JavaScript) - Statik
2. **Backend** (Node.js server) - Dinamik

#### Seçenek A: VPS + Netlify (Önerilen)

**Frontend için Netlify (Ücretsiz):**
- 📌 https://www.netlify.com
- ✅ Otomatik deployment
- ✅ HTTPS sertifikası otomatik
- ✅ Global CDN
- ✅ Ücretsiz (hobiler için)

**Backend için DigitalOcean VPS:**
- 📌 https://www.digitalocean.com
- ✅ Başlangıç: $5/ay (512MB RAM)
- ✅ Node.js çalıştırmak için ideal
- ✅ Easy deployment
- ✅ 1 aylık ücretsiz trial

#### Seçenek B: Tümleşik Hosting

**Hostinger (Tavsiye):**
- 📌 https://www.hostinger.com
- ✅ Fiyat: 40₺/ay
- ✅ Node.js desteği
- ✅ Unlimited bandwidth
- ✅ Türkçe destek
- ✅ Kuruluş paketleri

**Bluehost:**
- 📌 https://www.bluehost.com
- ✅ Fiyat: $2.95/ay (promosyon)
- ✅ WordPress ve Node.js desteği
- ✅ 30 gün para iadesi garantisi

#### Seçenek C: Cloud Platformlar

**Heroku:**
- 📌 https://www.heroku.com
- ✅ Ücretsiz tier (sınırlı)
- ✅ Kolay Node.js deployment
- ⚠️ Ücretsiz tier kaldırıldı (ücretli başladı)

**AWS:**
- 📌 https://aws.amazon.com
- ✅ 12 ay ücretsiz (EC2)
- ✅ Ölçeklenebilir
- ⚠️ Karmaşık kurulum

---

### ADIM 3: FİLELERİ INTERNETE YÜKLEMEK

#### Netlify ile Frontend Yükleme

**1. Netlify'a Kaydol**
- https://app.netlify.com/signup
- GitHub, GitLab veya email ile giriş

**2. Git Repository Oluştur**
```bash
cd c:\Users\pc\balance

# Git başlat
git init

# Dosyaları ekle
git add .

# Commit et
git commit -m "BALANCE E-ticaret sitesi ilk commit"

# GitHub'da repo oluştur: github.com/new
# Sonra push et
git remote add origin https://github.com/username/balance.git
git branch -M main
git push -u origin main
```

**3. Netlify Connect**
- Netlify dashboard açın
- "New site from Git" tıklayın
- GitHub'ı seçin ve repository'i bağlayın
- Deploy et (otomatik!)

**Netlify Settings:**
```
Build command: (boş bırakın - statik site)
Publish directory: . (root directory)
```

#### DigitalOcean VPS'e Backend Yükleme

**1. Droplet Oluştur**
- DigitalOcean dashboard açın
- "Create" → "Droplets"
- Ubuntu 22.04 seçin
- $5/ay plan seçin
- Region: Frankfurt (Avrupa) veya NYC

**2. SSH ile Bağlan**
```bash
# Terminal/PowerShell
ssh root@DROPLET_IP_ADRESI

# Parola sor (emailde gönderilen)
```

**3. Node.js Yükle**
```bash
# Ubuntu paketlerini güncelle
apt update && apt upgrade -y

# Node.js 18 yükle
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt-get install -y nodejs

# Versiyonları kontrol et
node -v
npm -v
```

**4. Backend Dosyalarını Yükle**
```bash
# Root dizininde backend klasörü oluştur
mkdir /var/www/balance-backend
cd /var/www/balance-backend

# Dosyaları yükle (WinSCP veya GitHub ile)
# Veya GitHub'dan clone et:
git clone https://github.com/username/balance.git .
```

**5. Dependencies Yükle ve Server Başlat**
```bash
# NPM paketlerini yükle
npm install

# .env dosyası oluştur
nano .env

# İçeriğini yapıştır:
# IYZICO_API_KEY=sandbox-xxxxx
# IYZICO_SECRET_KEY=sandbox-yyyyy
# NODE_ENV=production
# PORT=3000
# CALLBACK_URL=https://siteniz.com/api/payment-callback

# Ctrl+X, Y, Enter ile kaydet

# PM2 ile background'da çalıştır
npm install -g pm2
pm2 start server.js --name "balance-backend"
pm2 startup
pm2 save
```

**6. Nginx ile Reverse Proxy Ayarla**
```bash
# Nginx yükle
apt install -y nginx

# Config dosyası oluştur
nano /etc/nginx/sites-available/balance

# İçeriği yapıştır:
```

```nginx
server {
    listen 80;
    server_name siteniz.com www.siteniz.com;

    # Redirect to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name siteniz.com www.siteniz.com;

    # SSL Certificate (Let's Encrypt)
    ssl_certificate /etc/letsencrypt/live/siteniz.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/siteniz.com/privkey.pem;

    # API proxy
    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_cache_bypass $http_upgrade;
    }

    # Static files (frontend)
    location / {
        proxy_pass https://siteniz.netlify.app;
        proxy_set_header Host siteniz.netlify.app;
    }
}
```

```bash
# Config'i aktifleştir
ln -s /etc/nginx/sites-available/balance /etc/nginx/sites-enabled/
rm /etc/nginx/sites-enabled/default

# Nginx test et
nginx -t

# Nginx başlat
systemctl start nginx
systemctl enable nginx
```

**7. SSL Sertifikası (Let's Encrypt)**
```bash
# Certbot yükle
apt install -y certbot python3-certbot-nginx

# Sertifika al
certbot certonly --nginx -d siteniz.com -d www.siteniz.com
```

---

### ADIM 4: DOMAIN AYARLARINI YAPIFLANDIR

**DNS Kayıtları (Domain Sağlayıcıda Ayarla):**

| Tip | Host | Değer | TTL |
|-----|------|-------|-----|
| A | @ | DROPLET_IP_ADRESI | 3600 |
| A | www | DROPLET_IP_ADRESI | 3600 |
| CNAME | netlify | siteniz.netlify.app | 3600 |

**DNS Kontrol:**
```bash
# PowerShell'de
nslookup siteniz.com
```

DNS yayılması 24 saat sürebilir.

---

### ADIM 5: GOOGLE'DA GÖRÜNMEK

#### 1. Google Search Console'a Kayıt

**Kayıt İşlemleri:**
1. https://search.google.com/search-console adresine git
2. "Siteyi Ekle" tıkla
3. Domain adını gir (siteniz.com)
4. DNS doğrulaması seçeneğini seç
5. Google tarafından verilen DNS kaydını domain sağlayıcıya ekle
6. Doğrulama tamamlandıktan sonra Sitemap gönder

#### 2. Sitemap Oluştur ve Gönder

```xml
<!-- sitemap.xml dosyası oluştur -->
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://siteniz.com/</loc>
        <lastmod>2025-12-12</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
    </url>
    <url>
        <loc>https://siteniz.com/sweatsihtler.html</loc>
        <lastmod>2025-12-12</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>https://siteniz.com/sepet.html</loc>
        <changefreq>monthly</changefreq>
        <priority>0.6</priority>
    </url>
    <url>
        <loc>https://siteniz.com/siparislerim.html</loc>
        <changefreq>monthly</changefreq>
        <priority>0.6</priority>
    </url>
</urlset>
```

Search Console'a gönder: Sitemap → Yeni sitemap ekle

#### 3. robots.txt Oluştur

```
# robots.txt
User-agent: *
Allow: /
Disallow: /admin.html
Disallow: /iyzico-payment.html

Sitemap: https://siteniz.com/sitemap.xml
```

#### 4. Meta Etiketleri Ekle

[index.html](index.html#L1) dosyasının `<head>` kısmına ekle:

```html
<!-- SEO Meta Etiketleri -->
<meta name="description" content="BALANCE - Premium Türk Streetwear Markası. Kaliteli sweatshirtler, oversize tasarımlar ve hızlı kargo.">
<meta name="keywords" content="sweatshirt, oversize, streetwear, Türk moda, kaliteli giyim">
<meta name="author" content="BALANCE">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<!-- Open Graph (Facebook, Twitter) -->
<meta property="og:title" content="BALANCE - Premium Streetwear">
<meta property="og:description" content="Kaliteli ve trendy sweatshirtler">
<meta property="og:image" content="https://siteniz.com/hero-image.jpg">
<meta property="og:url" content="https://siteniz.com">

<!-- Google Verification -->
<meta name="google-site-verification" content="GOOGLE_VERIFICATION_CODE">

<!-- Favicon -->
<link rel="icon" type="image/x-icon" href="favicon.ico">
```

#### 5. Google Analytics Ekle

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

---

### ADIM 6: HTTPS & SECURİTY

**SSL Sertifikası Kontrolü:**
```bash
# Sertifika otomatik yenileme (DigitalOcean)
systemctl enable certbot.timer
systemctl start certbot.timer
```

**Firewall Ayarla:**
```bash
# Firewall başlat
ufw enable

# Portları aç
ufw allow 22   # SSH
ufw allow 80   # HTTP
ufw allow 443  # HTTPS
```

---

## 📊 KONTROL LISTI

Sitenizi internete açmadan önce kontrol edin:

- [ ] Domain adı satın alındı
- [ ] Hosting seçildi ve hesap oluşturdu
- [ ] Frontend dosyaları Netlify'e yüklendi
- [ ] Backend server DigitalOcean'da çalışıyor
- [ ] DNS kayıtları konfigüre edildi
- [ ] SSL sertifikası aktif (HTTPS çalışıyor)
- [ ] Google Search Console'a kaydedildi
- [ ] Sitemap gönderildi
- [ ] robots.txt oluşturuldu
- [ ] Meta etiketleri eklendi
- [ ] Tüm linkler çalışıyor (404 yok)
- [ ] Mobile responsive kontrol edildi
- [ ] Ödeme sistemi test edildi
- [ ] Admin paneli şifre korumalı
- [ ] Backup sistemi ayarlandı

---

## 🔍 ARAMA MOTORU OPTİMİZASYONU (SEO)

### Başlık ve Açıklamalar

```html
<!-- index.html -->
<title>BALANCE - Premium Türk Streetwear | Sweatshirt Satışı</title>
```

### Ürün Sayfaları

Her ürün için yapılandırılmış veri ekle:

```html
<script type="application/ld+json">
{
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Siyah Oversize Sweatshirt",
    "description": "Premium kaliteli oversize sweatshirt",
    "image": "https://siteniz.com/image.jpg",
    "brand": {
        "@type": "Brand",
        "name": "BALANCE"
    },
    "offers": {
        "@type": "Offer",
        "price": "600",
        "priceCurrency": "TRY",
        "availability": "https://schema.org/InStock"
    }
}
</script>
```

### Hızlı Yükleme

- ✅ Resimleri optimize et (WebP format)
- ✅ CSS/JS minify et
- ✅ CDN kullan (Netlify otomatik yapıyor)
- ✅ Lazy loading ekle

### İçerik Optimizasyonu

- ✅ H1 başlık: Bir kez kullan
- ✅ H2 başlıklar: Mantıklı şekilde
- ✅ Anahtar kelimeler: Doğal kullan
- ✅ İç linkler: Sayfalar arasında bağ
- ✅ Mobil uyum: 100% responsive

---

## 💰 KÖŞEBEÜCELİ ÖDEME TAHMİNİ

| Hizmet | Fiyat | Dönem |
|--------|-------|-------|
| Domain (.com.tr) | 40 ₺ | Yıllık |
| Hosting (DigitalOcean) | 60₺ | Aylar |
| Netlify (Frontend) | Ücretsiz | - |
| SSL Sertifikası | Ücretsiz | - |
| **TOPLAM** | **100 ₺/ay** | - |

---

## 🆘 SORUN GIDERME

**Siteye Erişilemiyor:**
```bash
# DNS kontrolü
nslookup siteniz.com

# Sunucu bağlantısı
ping siteniz.com

# Port kontrolü
netstat -tlnp | grep 3000
```

**HTTPS Hatası:**
```bash
# Sertifika kontrol et
certbot certificates

# Yenile
certbot renew --dry-run
```

**Backend Çalışmıyor:**
```bash
# PM2 durumu kontrol et
pm2 status

# Log bak
pm2 logs balance-backend
```

---

## 📞 DESTEK

- **Netlify Destek**: https://community.netlify.com
- **DigitalOcean Dokümantasyon**: https://docs.digitalocean.com
- **Google Search Console Yardım**: https://support.google.com/webmasters
- **Let's Encrypt**: https://letsencrypt.org/getting-started/

---

## ✨ SONRAKI ADIMLAR

Siteyi internete açtıktan sonra:

1. **Sosyal Medya Entegrasyonu** (Instagram, Facebook)
2. **E-posta Marketing** (Mailchimp, Brevo)
3. **Chat Desteği** (Tawk.to)
4. **Analitik Derinlemesine** (Google Analytics)
5. **CRM Sistemi** (Müşteri yönetimi)
6. **Inventory Sistemi** (Stok takibi)
7. **Backlink Oluşturma** (SEO)

---

**Başarılar! 🚀 BALANCE'ı internete açmak için hazırsınız!**
