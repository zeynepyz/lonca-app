# Lonca Mobile App

Bu uygulama, React Native ile geliştirilmiş bir ürün listeleme ve detay görüntüleme uygulamasıdır. Proje, React Native/Expo frontend ve Node.js/Express backend olmak üzere iki ana bölümden oluşmaktadır.

## Proje Hakkında

Uygulama, farklı satıcılardan ürün listelerini göstermekte ve kullanıcıların ürün detaylarını incelemelerine olanak sağlamaktadır. Ayrıca, satıcı bazlı filtreleme özelliği bulunmaktadır.

### Özellikler

- Ürünleri listeleme ve detaylarını görüntüleme
- Satıcı bazlı filtreleme
- Koyu/açık tema desteği
- Responsive tasarım
- Offline veri desteği
- RESTful API entegrasyonu

### Teknik Altyapı

#### Frontend
- React Native (Expo)
- TypeScript
- React Navigation
- Axios
- NativeWind (TailwindCSS)
- Context API (State Management)

#### Backend
- Node.js
- Express
- MongoDB
- TypeScript
- RESTful API

## Kurulum

Projeyi çalıştırmak için aşağıdaki adımları izleyin:

### Gereksinimler

- Node.js (16.x veya üzeri)
- npm veya yarn
- MongoDB (local veya cloud)
- Android Studio (Android emülatörü için) veya Xcode (iOS simülatörü için)
- Expo Go (fiziksel cihazda test için)

### 1. Repo Klonlama

```bash
git clone <repo-url>
cd lonca-app
```

### 2. Backend Kurulumu

```bash
cd backend
npm install
```

#### MongoDB Kurulumu

- Yerel MongoDB sunucusunu kurun veya MongoDB Atlas'ta ücretsiz bir hesap oluşturun
- `.env` dosyasını düzenleyin ve `MONGO_URI` değerini kendi MongoDB bağlantı dizesiyle güncelleyin:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/lonca_products
NODE_ENV=development
```

#### Veritabanı Verilerini İçe Aktarma

```bash
npm run import
```

Bu komut, proje kök dizinindeki `parent_products.json` dosyasını MongoDB'ye aktaracaktır.

#### Backend Sunucusunu Başlatma

```bash
npm run dev
```

Sunucu başarıyla başlatıldığında şu mesajı göreceksiniz:
`Server running in development mode on port 5000`

### 3. Frontend Kurulumu

Ana dizine dönüp frontend bağımlılıklarını yükleyin:

```bash
cd ..
npm install
```

#### Backend URL'sini Yapılandırma

`services/api.ts` dosyasında, API_URL değişkenini backend sunucusunun çalıştığı URL ile güncelleyin:

- Emülatör kullanıyorsanız (varsayılan): `http://10.0.2.2:5000/api`
- Yerel IP kullanıyorsanız (fiziksel cihaz için): `http://192.168.X.X:5000/api` (kendi IP adresinizle değiştirin)

#### Frontend Uygulamasını Başlatma

```bash
npx expo start
```

Bu komut bir QR kod üretecektir. Bu QR kodu:
- Fiziksel cihazda: Expo Go uygulamasıyla tarayın
- Emülatörde: Konsolda "a" tuşuna basarak Android emülatörü başlatın veya "i" tuşuna basarak iOS simülatörü başlatın

## Test Senaryoları

1. **Ürün Listesi Görüntüleme**:
   - Uygulama açıldığında ürün listesi yüklenmeli
   - Her ürün kart görünümünde olmalı ve ürün görseli, markası, adı ve fiyatı görünmeli

2. **Filtreleme**:
   - Üst kısımdaki satıcı filtresini kullanarak ürünleri filtreleme
   - "Tümü" seçeneği tüm ürünleri göstermeli

3. **Ürün Detayı Görüntüleme**:
   - Herhangi bir ürüne tıklandığında ürün detay sayfası açılmalı
   - Detay sayfasında ürün bilgileri tam olarak görünmeli

4. **Tema Değiştirme**:
   - Ayarlar sayfasından tema değiştirme (açık/koyu tema)

## Olası Sorunlar ve Çözümleri

### Backend Bağlantı Sorunları

- **Sorun**: Frontend uygulaması verileri yükleyemiyor
  - **Çözüm**: Backend sunucunun çalıştığından emin olun (`npm run dev` komutu ile)
  - **Çözüm**: `services/api.ts` dosyasındaki API_URL'nin doğru olduğundan emin olun
  - **Çözüm**: MongoDB bağlantısının doğru olduğundan emin olun

### Expo Bağlantı Sorunları

- **Sorun**: Expo QR kodu tarandıktan sonra uygulama yüklenmiyor
  - **Çözüm**: Telefonunuz ve bilgisayarınızın aynı ağa bağlı olduğundan emin olun
  - **Çözüm**: Firewall ayarlarınızı kontrol edin ve gerekli portları açın
  - **Çözüm**: `expo-cli` sürümünüzü güncelleyin

### MongoDB Veritabanı Sorunları

- **Sorun**: Veritabanı bağlantı hatası
  - **Çözüm**: MongoDB servisinin çalıştığından emin olun
  - **Çözüm**: `.env` dosyasındaki MONGO_URI'nin doğru olduğundan emin olun

### Uygulama Performans Sorunları

- **Sorun**: Uygulama yavaş çalışıyor
  - **Çözüm**: Üretim modu için performans optimizasyonlarını etkinleştirin
  - **Çözüm**: Gelişmiş önbellek stratejileri kullanın

## Proje Yapısı

```
lonca-app/
├── app/                    # Uygulama ekranları
├── assets/                 # İkonlar, görseller ve fontlar
├── backend/                # Backend sunucusu
│   ├── controllers/        # API kontrolcüleri
│   ├── models/             # Veritabanı modelleri
│   ├── routes/             # API rotaları
│   └── server.ts           # Ana sunucu dosyası
├── components/             # Yeniden kullanılabilir bileşenler
├── context/                # React context (tema, auth vb.)
├── services/               # API servisleri ve yardımcı fonksiyonlar
├── types/                  # TypeScript tip tanımlamaları
└── utils/                  # Yardımcı fonksiyonlar
```

## Lisans

Bu proje [MIT lisansı](LICENSE) altında lisanslanmıştır. 