# Weather API Backend

[🇹🇷 Türkçe](#türkçe) | [🇬🇧 English](#english)

---

<a name="türkçe"></a>
## 🇹🇷 Türkçe

Modern ve güvenilir bir hava durumu API backend'i. OpenWeatherMap API kullanarak güncel hava durumu ve tahmin bilgileri sağlar.

### 🚀 Özellikler

- ✅ Güncel hava durumu bilgisi (şehir adı veya koordinat ile)
- ✅ 5 günlük hava durumu tahmini
- ✅ Detaylı hava durumu bilgileri (sıcaklık, nem, rüzgar, vb.)
- ✅ Çoklu dil desteği
- ✅ Celsius, Fahrenheit, Kelvin birim desteği
- ✅ CORS desteği
- ✅ Hata yönetimi ve validasyon
- ✅ RESTful API yapısı

### 📋 Gereksinimler

- Node.js (v14 veya üzeri)
- npm veya yarn
- OpenWeatherMap API anahtarı ([Ücretsiz alın](https://openweathermap.org/api))

### 🔧 Kurulum

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

### 📚 API Endpoints

#### Health Check
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

#### Güncel Hava Durumu (Şehir Adı ile)
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

#### Güncel Hava Durumu (Koordinat ile)
```
GET /api/weather/current/coordinates?lat=41.0082&lon=28.9784&units=metric&lang=tr
```

**Query Parameters:**
- `lat` (required): Enlem
- `lon` (required): Boylam
- `units` (optional): Birim sistemi
- `lang` (optional): Dil kodu

#### Hava Durumu Tahmini (Şehir Adı ile)
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

#### Hava Durumu Tahmini (Koordinat ile)
```
GET /api/weather/forecast/coordinates?lat=41.0082&lon=28.9784&units=metric&lang=tr
```

### 🌍 Desteklenen Diller

Türkçe (`tr`), İngilizce (`en`), Almanca (`de`), Fransızca (`fr`), İspanyolca (`es`), İtalyanca (`it`), Rusça (`ru`), ve daha fazlası. Tüm desteklenen diller için [OpenWeatherMap dokümantasyonuna](https://openweathermap.org/api/one-call-3#multi) bakın.

### 📝 Örnek Kullanımlar

#### cURL ile Test
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

#### JavaScript/Fetch ile
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

### 🔒 Güvenlik

- API anahtarınızı `.env` dosyasında saklayın ve asla commit etmeyin
- `.env` dosyası `.gitignore` içinde olmalıdır
- Production ortamında rate limiting ekleyebilirsiniz

### 🛠️ Teknolojiler

- **Express.js** - Web framework
- **Axios** - HTTP client
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables
- **OpenWeatherMap API** - Hava durumu verisi

### 📄 Lisans

ISC

### 🤝 Katkıda Bulunma

Pull request'ler memnuniyetle karşılanır. Büyük değişiklikler için lütfen önce bir issue açın.

### ⚠️ Hata Ayıklama

- API anahtarınızın doğru olduğundan emin olun
- `.env` dosyasının proje kök dizininde olduğunu kontrol edin
- Port'un başka bir uygulama tarafından kullanılmadığından emin olun
- Network bağlantınızı kontrol edin

---

<a name="english"></a>
## 🇬🇧 English

A modern and reliable weather API backend. Provides current weather and forecast information using the OpenWeatherMap API.

### 🚀 Features

- ✅ Current weather information (by city name or coordinates)
- ✅ 5-day weather forecast
- ✅ Detailed weather information (temperature, humidity, wind, etc.)
- ✅ Multi-language support
- ✅ Celsius, Fahrenheit, Kelvin unit support
- ✅ CORS support
- ✅ Error handling and validation
- ✅ RESTful API structure

### 📋 Requirements

- Node.js (v14 or higher)
- npm or yarn
- OpenWeatherMap API key ([Get it for free](https://openweathermap.org/api))

### 🔧 Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```bash
# Create .env file and add the following variables:
WEATHER_API_KEY=your_openweathermap_api_key_here
PORT=3000
```

3. Start the server:
```bash
# Production
npm start

# Development (auto-restart with nodemon)
npm run dev
```

The server will run on `http://localhost:3000` by default.

### 📚 API Endpoints

#### Health Check
```
GET /health
```
Checks if the server is running.

**Response:**
```json
{
  "status": "OK",
  "message": "Weather API is running",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

#### Current Weather (by City Name)
```
GET /api/weather/current?city=Istanbul&units=metric&lang=en
```

**Query Parameters:**
- `city` (required): City name
- `units` (optional): Unit system (`metric`, `imperial`, `kelvin`) - Default: `metric`
- `lang` (optional): Language code (`tr`, `en`, `de`, etc.) - Default: `en`

**Response:**
```json
{
  "city": "Istanbul",
  "country": "TR",
  "temperature": 15.5,
  "feelsLike": 14.2,
  "description": "clear sky",
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

#### Current Weather (by Coordinates)
```
GET /api/weather/current/coordinates?lat=41.0082&lon=28.9784&units=metric&lang=en
```

**Query Parameters:**
- `lat` (required): Latitude
- `lon` (required): Longitude
- `units` (optional): Unit system
- `lang` (optional): Language code

#### Weather Forecast (by City Name)
```
GET /api/weather/forecast?city=Istanbul&units=metric&lang=en&cnt=40
```

**Query Parameters:**
- `city` (required): City name
- `units` (optional): Unit system
- `lang` (optional): Language code
- `cnt` (optional): Number of forecasts (max 40, default: 40)

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
      "description": "clear sky",
      "main": "Clear",
      "humidity": 65,
      "pressure": 1013,
      "windSpeed": 3.2,
      "windDirection": 180,
      "cloudiness": 0,
      "visibility": 10,
      "pop": 0
    }
    // ... more forecasts
  ],
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

#### Weather Forecast (by Coordinates)
```
GET /api/weather/forecast/coordinates?lat=41.0082&lon=28.9784&units=metric&lang=en
```

### 🌍 Supported Languages

Turkish (`tr`), English (`en`), German (`de`), French (`fr`), Spanish (`es`), Italian (`it`), Russian (`ru`), and more. See [OpenWeatherMap documentation](https://openweathermap.org/api/one-call-3#multi) for all supported languages.

### 📝 Usage Examples

#### Testing with cURL
```bash
# Health check
curl http://localhost:3000/health

# Istanbul weather
curl "http://localhost:3000/api/weather/current?city=Istanbul&units=metric&lang=en"

# Weather by coordinates
curl "http://localhost:3000/api/weather/current/coordinates?lat=41.0082&lon=28.9784"

# 5-day forecast
curl "http://localhost:3000/api/weather/forecast?city=Istanbul&lang=en"
```

#### JavaScript/Fetch
```javascript
// Current weather
fetch('http://localhost:3000/api/weather/current?city=Istanbul&lang=en')
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error('Error:', err));

// Forecast
fetch('http://localhost:3000/api/weather/forecast?city=Istanbul&lang=en')
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error('Error:', err));
```

### 🔒 Security

- Store your API key in `.env` file and never commit it
- `.env` file should be in `.gitignore`
- You can add rate limiting in production environment

### 🛠️ Technologies

- **Express.js** - Web framework
- **Axios** - HTTP client
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables
- **OpenWeatherMap API** - Weather data

### 📄 License

ISC

### 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first.

### ⚠️ Troubleshooting

- Make sure your API key is correct
- Check that `.env` file is in the project root directory
- Ensure the port is not being used by another application
- Check your network connection
