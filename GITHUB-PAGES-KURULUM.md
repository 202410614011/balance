# 🚀 BALANCE WEBSİTESİNİ 5 DAKİKADA INTERNETTE AÇMA (ÜCRETSİZ)

GitHub Pages ile websiteyi **tamamen ücretsiz** internette açabilirsiniz!

## 📌 EN KOLAY YOL: GitHub Pages

**Avantajlar:**
- ✅ Tamamen ücretsiz
- ✅ 5 dakikada tamamlanır
- ✅ Otomatik HTTPS (güvenli)
- ✅ Arkadaşlarla link paylaşabilirsiniz
- ✅ Kurulum ve bakım çok basit

---

## 🎯 ADIM 1: GitHub Hesabı Oluştur

1. **https://github.com** sayfasına git
2. **"Sign Up"** tıkla
3. E-mail adresin: senin@email.com
4. Güçlü şifre seç
5. Doğrulama e-mailini aç, onay ver
6. ✅ Hesap oluşturuldu!

**Önerilen kullanıcı adı:** balance, balance-shop, balancegiyim

---

## 🎯 ADIM 2: Repository Oluştur

1. GitHub'da giriş yap
2. Sağ üst köşede **"+"** tıkla
3. **"New repository"** seç
4. Bilgileri doldur:

```
Repository name: balance  (veya balancegiyim, balance-shop)
Description: BALANCE E-Ticaret Sitesi
Public: ✓ (Seç - önemli!)
Initialize with README: ✗ (Boş bırak)
```

5. **"Create repository"** tıkla

---

## 🎯 ADIM 3: Dosyaları GitHub'a Yükle

### YÖNTEM A: Web Interface'den Yükleme (En Kolay - Başlayanlar için)

1. GitHub repo sayfasında **"Add file"** → **"Upload files"** tıkla
2. Tüm BALANCE dosyalarını seç:
   - index.html
   - sweatsihtler.html
   - sepet.html
   - Ödeme.html
   - siparislerim.html
   - admin.html
   - siparis-basarili.html
   - iyzico-payment.html
   - payment-failed.html
   
3. Dosyaları sürükle ve bırak (drag & drop)
4. Alt kısımda commit message yaz: `BALANCE sitesi ilk yayın`
5. **"Commit changes"** tıkla

✅ Dosyalar yüklendi!

### YÖNTEM B: Git Komut Satırı (İleri Kullanıcılar)

```bash
# PowerShell'de bu komutları çalıştır:

# Dizine git
cd c:\Users\pc\balance

# Git başlat
git init

# Tüm dosyaları ekle
git add .

# İlk commit
git commit -m "BALANCE sitesi ilk yayın"

# GitHub repo URL'ni ekle (değiştir: USERNAME ve REPONAME)
git remote add origin https://github.com/USERNAME/REPONAME.git

# Main branch'e yönlendir
git branch -M main

# GitHub'a gönder
git push -u origin main
```

---

## 🎯 ADIM 4: GitHub Pages'i Aktifleştir

1. **GitHub repo sayfasında** "Settings" tıkla
2. Sol menüde **"Pages"** seçeneğine git
3. **"Source"** bölümünde:
   - Branch: **main** seç
   - Folder: **/(root)** seç
4. **"Save"** tıkla

✅ Site otomatik yayında!

---

## 🎯 ADIM 5: SİTEN INTERNETTE!

**Siteniz açık adresi:**

```
https://USERNAME.github.io/REPONAME
```

**Örnek:**
- Kullanıcı adı: **ahmet**
- Repository: **balance**
- Site linki: `https://ahmet.github.io/balance`

**Arkadaşlarına gönder:**
```
Siteyi ziyaret et: https://ahmet.github.io/balance
```

---

## 📱 Mobilde Test Et

1. Telefonundan linki aç
2. Sepete ürün ekle
3. Ödeme işlemini test et
4. Admin paneline gir (şifre: balance2025)

✅ Her şey çalışmalı!

---

## 🔧 Siteyi Güncellemek

Herhangi bir değişiklik yapıp GitHub'a gönder:

### Web Interface'den:
1. GitHub'da dosyayı seç
2. **Edit** (kalem ikonu) tıkla
3. Değişiklik yap
4. **"Commit changes"** tıkla

### Git Komut Satırından:
```bash
# Dosyayı düzelt (örn: index.html)
# Sonra:

git add .
git commit -m "Açıklama yaz"
git push
```

**✅ 30 saniye içinde siteye yansıyacak!**

---

## 📊 GERÇEK DOMAIN (İsteğe Bağlı)

Eğer kendi domain adını (balance.com.tr gibi) kullanmak istersen:

1. Domain al (40₺/yıl)
2. GitHub Pages Settings → Custom domain
3. Domainini yaz: balance.com.tr
4. Domain sağlayıcıda DNS ayarla (rehber verilecek)

Ama şimdilik `https://USERNAME.github.io/balance` yeterli!

---

## ⚠️ ÖNEMLİ NOTLAR

### Çalışacak Özellikler:
✅ Frontend (HTML, CSS, JavaScript)
✅ localStorage (sepet, sipariş tarihi, admin paneli)
✅ Tüm sayfalar ve navigasyon
✅ Responsive tasarım
✅ Admin paneli

### ÇALIŞMAYACAK Özellikler:
❌ İyzico ödemesi (backend gerekli)
❌ E-posta bildirimleri
❌ Veritabanı

**Yani:** Sepete ürün ekle, ödeme formunu doldur ve localhost'ta çalışıyorsa site de çalışacak. Ama gerçek para transferi için backend server gerekli.

---

## 💡 EĞER BACKEND DE GEREKSE

localStorage tabanlı sistem kullanmadığından, backend gerek. O durumda:

**Ücretsiz Backend Hosting:**

### Render.com (Önerilen)
```
1. https://render.com signup
2. Yeni Web Service oluştur
3. GitHub repo bağla
4. Deploy et
5. Ücretsiz!
```

### Vercel.com
```
1. https://vercel.com/signup
2. GitHub'ı bağla
3. Deploy et
4. Node.js backend desteği
5. Ücretsiz!
```

---

## 🚀 QUICK START (ÖZET)

| Adım | Yapılacak | Zaman |
|------|-----------|-------|
| 1 | GitHub hesabı aç | 1 dk |
| 2 | Repository oluştur | 1 dk |
| 3 | Dosyaları yükle | 2 dk |
| 4 | GitHub Pages aktifleştir | 1 dk |
| 5 | Test et | - |

**TOPLAM: 5 DAKİKA** ⚡

---

## 📞 DESTEK

**Sorun olursa:**

1. **Sayfa 404 hatası:**
   - Dosyaların repository root'ta olduğunu kontrol et
   - Settings → Pages → Refresh sayfasını aç

2. **Sayfalar yüklenmiyorsa:**
   - Cache temizle (Ctrl+Shift+Del)
   - Sayfayı yenile (Ctrl+F5)

3. **Link çalışmıyorsa:**
   - GitHub repo Settings'de Public olduğunu kontrol et
   - Pages aktifleştirildiğini kontrol et

---

## 🎉 BİTTİ!

Artık siteniz internette! Arkadaşlarına link gönder:

```
👉 https://USERNAME.github.io/balance
```

**GitHub Pages HARIKA çünkü:**
- ✅ Ücretsiz
- ✅ Sınırsız
- ✅ Hızlı
- ✅ Güvenli (HTTPS)
- ✅ Kolay
- ✅ Hosting endişesi yok

---

## 📈 İLERİ ADIMLAR (Sonra Yapabilir)

1. **Kendi domain**: balance.com.tr
2. **Backend**: Render/Vercel'de Node.js
3. **Veritabanı**: MongoDB Atlas (ücretsiz)
4. **Email**: Nodemailer / Brevo
5. **Analytics**: Google Analytics

---

**Başarılar! 🚀 BALANCE siteniz internette!**

Sorun olursa veya adımda kalmışsan, sorabilirsin! 😊
