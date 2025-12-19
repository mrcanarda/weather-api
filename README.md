# Weather API Backend

Modern ve güvenilir bir hava durumu API backend'i. OpenWeatherMap API kullanarak güncel hava durumu ve tahmin bilgileri sağlar.

## 🚀 Özellikler

- ✅ Güncel hava durumu bilgisi (şehir adı veya koordinat ile)
- ✅ 5 günlük hava durumu tahmini
- ✅ Detaylı hava durumu bilgileri (sıcaklık, nem, rüzgar, vb.)
- ✅ Çoklu dil desteği
- ✅ Celsius, Fahrenheit, Kelvin birim desteği
- ✅ CORS desteği
- ✅ Hata yönetimi ve validasyon
- ✅ RESTful API yapısı

## 📋 Gereksinimler

- Node.js (v14 veya üzeri)
- npm veya yarn
- OpenWeatherMap API anahtarı ([Ücretsiz alın](https://openweathermap.org/api))

## 🔧 Kurulum

1. Bağımlılıkları yükleyin:
```bash
npm install
```

2. `.env` dosyası oluşturun:
```bash
# .env dosyası oluşturun ve aşağıdaki değişkenleri ekleyin:
WEATHER_API_KEY=your_openweathermap_api_key_here
PORT=3000
```

3. Sunucuyu başlatın:
```bash
# Production
npm start

# Development (nodemon ile otomatik yeniden başlatma)
npm run dev
```

Sunucu varsayılan olarak `http://localhost:3000` adresinde çalışacaktır.

## 📚 API Endpoints

### Health Check
```
GET /health
```
Sunucunun çalışıp çalışmadığını kontrol eder.

**Response:**
```json
{
  "status": "OK",
  "message": "Weather API is running",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

### Güncel Hava Durumu (Şehir Adı ile)
```
GET /api/weather/current?city=Istanbul&units=metric&lang=tr
```

**Query Parameters:**
- `city` (required): Şehir adı
- `units` (optional): Birim sistemi (`metric`, `imperial`, `kelvin`) - Varsayılan: `metric`
- `lang` (optional): Dil kodu (`tr`, `en`, `de`, vb.) - Varsayılan: `en`

**Response:**
```json
{
  "city": "Istanbul",
  "country": "TR",
  "temperature": 15.5,
  "feelsLike": 14.2,
  "description": "açık hava",
  "main": "Clear",
  "humidity": 65,
  "pressure": 1013,
  "windSpeed": 3.2,
  "windDirection": 180,
  "visibility": 10,
  "cloudiness": 0,
  "sunrise": "2024-01-01T06:00:00.000Z",
  "sunset": "2024-01-01T18:00:00.000Z",
  "coordinates": {
    "lat": 41.0082,
    "lon": 28.9784
  },
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

### Güncel Hava Durumu (Koordinat ile)
```
GET /api/weather/current/coordinates?lat=41.0082&lon=28.9784&units=metric&lang=tr
```

**Query Parameters:**
- `lat` (required): Enlem
- `lon` (required): Boylam
- `units` (optional): Birim sistemi
- `lang` (optional): Dil kodu

### Hava Durumu Tahmini (Şehir Adı ile)
```
GET /api/weather/forecast?city=Istanbul&units=metric&lang=tr&cnt=40
```

**Query Parameters:**
- `city` (required): Şehir adı
- `units` (optional): Birim sistemi
- `lang` (optional): Dil kodu
- `cnt` (optional): Tahmin sayısı (max 40, varsayılan: 40)

**Response:**
```json
{
  "city": "Istanbul",
  "country": "TR",
  "coordinates": {
    "lat": 41.0082,
    "lon": 28.9784
  },
  "forecast": [
    {
      "dateTime": "2024-01-01T12:00:00.000Z",
      "temperature": 15.5,
      "feelsLike": 14.2,
      "description": "açık hava",
      "main": "Clear",
      "humidity": 65,
      "pressure": 1013,
      "windSpeed": 3.2,
      "windDirection": 180,
      "cloudiness": 0,
      "visibility": 10,
      "pop": 0
    }
    // ... daha fazla tahmin
  ],
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

### Hava Durumu Tahmini (Koordinat ile)
```
GET /api/weather/forecast/coordinates?lat=41.0082&lon=28.9784&units=metric&lang=tr
```

## 🌍 Desteklenen Diller

Türkçe (`tr`), İngilizce (`en`), Almanca (`de`), Fransızca (`fr`), İspanyolca (`es`), İtalyanca (`it`), Rusça (`ru`), ve daha fazlası. Tüm desteklenen diller için [OpenWeatherMap dokümantasyonuna](https://openweathermap.org/api/one-call-3#multi) bakın.

## 📝 Örnek Kullanımlar

### cURL ile Test
```bash
# Health check
curl http://localhost:3000/health

# İstanbul hava durumu
curl "http://localhost:3000/api/weather/current?city=Istanbul&units=metric&lang=tr"

# Koordinat ile hava durumu
curl "http://localhost:3000/api/weather/current/coordinates?lat=41.0082&lon=28.9784"

# 5 günlük tahmin
curl "http://localhost:3000/api/weather/forecast?city=Istanbul&lang=tr"
```

### JavaScript/Fetch ile
```javascript
// Güncel hava durumu
fetch('http://localhost:3000/api/weather/current?city=Istanbul&lang=tr')
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error('Error:', err));

// Tahmin
fetch('http://localhost:3000/api/weather/forecast?city=Istanbul&lang=tr')
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error('Error:', err));
```

## 🔒 Güvenlik

- API anahtarınızı `.env` dosyasında saklayın ve asla commit etmeyin
- `.env` dosyası `.gitignore` içinde olmalıdır
- Production ortamında rate limiting ekleyebilirsiniz

## 🛠️ Teknolojiler

- **Express.js** - Web framework
- **Axios** - HTTP client
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables
- **OpenWeatherMap API** - Hava durumu verisi

## 📄 Lisans

ISC

## 🤝 Katkıda Bulunma

Pull request'ler memnuniyetle karşılanır. Büyük değişiklikler için lütfen önce bir issue açın.

## ⚠️ Hata Ayıklama

- API anahtarınızın doğru olduğundan emin olun
- `.env` dosyasının proje kök dizininde olduğunu kontrol edin
- Port'un başka bir uygulama tarafından kullanılmadığından emin olun
- Network bağlantınızı kontrol edin

