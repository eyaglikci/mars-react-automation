# Playwright BDD Login Test Suite

MARS sistemine giriş yapma işlevlerini test etmek için Playwright BDD kullanılan test projesi.

## 📁 Proje Yapısı

```
PW_deneme/
├── features/
│   ├── login.feature                 # Login senaryoları (Gherkin syntax)
│   ├── step_definitions/
│   │   └── loginSteps.ts            # Login adımlarının uygulanması
│   └── support/
├── playwright.config.ts              # Playwright konfigürasyonu
├── package.json                      # Proje dependencies ve scripts
├── tsconfig.json                     # TypeScript konfigürasyonu
└── README.md                         # Bu dosya
```

## 🚀 Kurulum ve Çalıştırma

### 1. Bağımlılıkları Yükle
```bash
npm install
```

### 2. Testleri Çalıştır
```bash
# Headless modda çalıştır
npm run test

# Tarayıcı penceresiyle çalıştır
npm run test:headed

# Debug modda çalıştır
npm run test:debug

# Raporu görüntüle
npm run report
```

## 📝 Login Test Senaryoları

1. ✅ **Geçerli kullanıcı adı ve şifre ile başarılı giriş**
2. ❌ **Geçersiz şifre ile giriş başarısız**
3. ❌ **Boş kullanıcı adı ile giriş başarısız**
4. ❌ **Boş şifre ile giriş başarısız**
5. 🌐 **Sayfa dilini değiştirme (English/Türkçe)**

## 🔗 Test Ortamı

- **URL:** http://172.16.11.154:9002/mars/app/login
- **Browsers:** Chromium, Firefox, WebKit

## 📋 Notlar

- CAPTCHA doğrulaması test için şu anda statik değer kullanıyor
- Gerçek test ortamında CAPTCHA çözümü gerekli olabilir
- Test verileri (username/password) güvenlik için `.env` dosyasına taşınabilir

## 🛠️ Ek Senaryo Ekleme

Yeni test senaryo eklemek için:

1. `features/login.feature` dosyasına Scenario ekle
2. `features/step_definitions/loginSteps.ts` dosyasına adımlar ekle
3. `npm run test` ile testleri çalıştır

Örnek:
```gherkin
Scenario: Çıkış yap
  When Çıkış butonuna tıklar
  Then Login sayfasına döndüğü doğrulanmalı
```
