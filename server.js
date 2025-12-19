const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// OpenWeatherMap API configuration
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const WEATHER_API_BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Weather API is running',
    timestamp: new Date().toISOString()
  });
});

// Get current weather by city name
app.get('/api/weather/current', async (req, res) => {
  try {
    const { city, units = 'metric', lang = 'en' } = req.query;

    if (!city) {
      return res.status(400).json({ 
        error: 'City parameter is required',
        example: '/api/weather/current?city=Istanbul'
      });
    }

    if (!WEATHER_API_KEY) {
      return res.status(500).json({ 
        error: 'Weather API key is not configured. Please set WEATHER_API_KEY in .env file'
      });
    }

    const response = await axios.get(`${WEATHER_API_BASE_URL}/weather`, {
      params: {
        q: city,
        appid: WEATHER_API_KEY,
        units: units,
        lang: lang
      }
    });

    const weatherData = {
      city: response.data.name,
      country: response.data.sys.country,
      temperature: response.data.main.temp,
      feelsLike: response.data.main.feels_like,
      description: response.data.weather[0].description,
      main: response.data.weather[0].main,
      humidity: response.data.main.humidity,
      pressure: response.data.main.pressure,
      windSpeed: response.data.wind?.speed || 0,
      windDirection: response.data.wind?.deg || 0,
      visibility: response.data.visibility ? response.data.visibility / 1000 : null,
      cloudiness: response.data.clouds?.all || 0,
      sunrise: new Date(response.data.sys.sunrise * 1000).toISOString(),
      sunset: new Date(response.data.sys.sunset * 1000).toISOString(),
      coordinates: {
        lat: response.data.coord.lat,
        lon: response.data.coord.lon
      },
      timestamp: new Date().toISOString()
    };

    res.json(weatherData);
  } catch (error) {
    if (error.response) {
      // API error response
      if (error.response.status === 404) {
        return res.status(404).json({ 
          error: 'City not found',
          message: 'Please check the city name and try again'
        });
      }
      if (error.response.status === 401) {
        return res.status(401).json({ 
          error: 'Invalid API key',
          message: 'Please check your WEATHER_API_KEY in .env file'
        });
      }
      return res.status(error.response.status).json({ 
        error: 'Weather API error',
        message: error.response.data?.message || 'Failed to fetch weather data'
      });
    }
    
    console.error('Error fetching weather:', error.message);
    res.status(500).json({ 
      error: 'Internal server error',
      message: 'Failed to fetch weather data'
    });
  }
});

// Get current weather by coordinates
app.get('/api/weather/current/coordinates', async (req, res) => {
  try {
    const { lat, lon, units = 'metric', lang = 'en' } = req.query;

    if (!lat || !lon) {
      return res.status(400).json({ 
        error: 'Latitude and longitude parameters are required',
        example: '/api/weather/current/coordinates?lat=41.0082&lon=28.9784'
      });
    }

    if (!WEATHER_API_KEY) {
      return res.status(500).json({ 
        error: 'Weather API key is not configured. Please set WEATHER_API_KEY in .env file'
      });
    }

    const response = await axios.get(`${WEATHER_API_BASE_URL}/weather`, {
      params: {
        lat: lat,
        lon: lon,
        appid: WEATHER_API_KEY,
        units: units,
        lang: lang
      }
    });

    const weatherData = {
      city: response.data.name,
      country: response.data.sys.country,
      temperature: response.data.main.temp,
      feelsLike: response.data.main.feels_like,
      description: response.data.weather[0].description,
      main: response.data.weather[0].main,
      humidity: response.data.main.humidity,
      pressure: response.data.main.pressure,
      windSpeed: response.data.wind?.speed || 0,
      windDirection: response.data.wind?.deg || 0,
      visibility: response.data.visibility ? response.data.visibility / 1000 : null,
      cloudiness: response.data.clouds?.all || 0,
      sunrise: new Date(response.data.sys.sunrise * 1000).toISOString(),
      sunset: new Date(response.data.sys.sunset * 1000).toISOString(),
      coordinates: {
        lat: response.data.coord.lat,
        lon: response.data.coord.lon
      },
      timestamp: new Date().toISOString()
    };

    res.json(weatherData);
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) {
        return res.status(401).json({ 
          error: 'Invalid API key',
          message: 'Please check your WEATHER_API_KEY in .env file'
        });
      }
      return res.status(error.response.status).json({ 
        error: 'Weather API error',
        message: error.response.data?.message || 'Failed to fetch weather data'
      });
    }
    
    console.error('Error fetching weather:', error.message);
    res.status(500).json({ 
      error: 'Internal server error',
      message: 'Failed to fetch weather data'
    });
  }
});

// Get weather forecast (5 days / 3 hours)
app.get('/api/weather/forecast', async (req, res) => {
  try {
    const { city, units = 'metric', lang = 'en', cnt = 40 } = req.query;

    if (!city) {
      return res.status(400).json({ 
        error: 'City parameter is required',
        example: '/api/weather/forecast?city=Istanbul'
      });
    }

    if (!WEATHER_API_KEY) {
      return res.status(500).json({ 
        error: 'Weather API key is not configured. Please set WEATHER_API_KEY in .env file'
      });
    }

    const response = await axios.get(`${WEATHER_API_BASE_URL}/forecast`, {
      params: {
        q: city,
        appid: WEATHER_API_KEY,
        units: units,
        lang: lang,
        cnt: Math.min(parseInt(cnt), 40) // Max 40 (5 days * 8 forecasts per day)
      }
    });

    const forecastData = {
      city: response.data.city.name,
      country: response.data.city.country,
      coordinates: {
        lat: response.data.city.coord.lat,
        lon: response.data.city.coord.lon
      },
      forecast: response.data.list.map(item => ({
        dateTime: new Date(item.dt * 1000).toISOString(),
        temperature: item.main.temp,
        feelsLike: item.main.feels_like,
        description: item.weather[0].description,
        main: item.weather[0].main,
        humidity: item.main.humidity,
        pressure: item.main.pressure,
        windSpeed: item.wind?.speed || 0,
        windDirection: item.wind?.deg || 0,
        cloudiness: item.clouds?.all || 0,
        visibility: item.visibility ? item.visibility / 1000 : null,
        pop: item.pop || 0 // Probability of precipitation
      })),
      timestamp: new Date().toISOString()
    };

    res.json(forecastData);
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        return res.status(404).json({ 
          error: 'City not found',
          message: 'Please check the city name and try again'
        });
      }
      if (error.response.status === 401) {
        return res.status(401).json({ 
          error: 'Invalid API key',
          message: 'Please check your WEATHER_API_KEY in .env file'
        });
      }
      return res.status(error.response.status).json({ 
        error: 'Weather API error',
        message: error.response.data?.message || 'Failed to fetch forecast data'
      });
    }
    
    console.error('Error fetching forecast:', error.message);
    res.status(500).json({ 
      error: 'Internal server error',
      message: 'Failed to fetch forecast data'
    });
  }
});

// Get weather forecast by coordinates
app.get('/api/weather/forecast/coordinates', async (req, res) => {
  try {
    const { lat, lon, units = 'metric', lang = 'en', cnt = 40 } = req.query;

    if (!lat || !lon) {
      return res.status(400).json({ 
        error: 'Latitude and longitude parameters are required',
        example: '/api/weather/forecast/coordinates?lat=41.0082&lon=28.9784'
      });
    }

    if (!WEATHER_API_KEY) {
      return res.status(500).json({ 
        error: 'Weather API key is not configured. Please set WEATHER_API_KEY in .env file'
      });
    }

    const response = await axios.get(`${WEATHER_API_BASE_URL}/forecast`, {
      params: {
        lat: lat,
        lon: lon,
        appid: WEATHER_API_KEY,
        units: units,
        lang: lang,
        cnt: Math.min(parseInt(cnt), 40)
      }
    });

    const forecastData = {
      city: response.data.city.name,
      country: response.data.city.country,
      coordinates: {
        lat: response.data.city.coord.lat,
        lon: response.data.city.coord.lon
      },
      forecast: response.data.list.map(item => ({
        dateTime: new Date(item.dt * 1000).toISOString(),
        temperature: item.main.temp,
        feelsLike: item.main.feels_like,
        description: item.weather[0].description,
        main: item.weather[0].main,
        humidity: item.main.humidity,
        pressure: item.main.pressure,
        windSpeed: item.wind?.speed || 0,
        windDirection: item.wind?.deg || 0,
        cloudiness: item.clouds?.all || 0,
        visibility: item.visibility ? item.visibility / 1000 : null,
        pop: item.pop || 0
      })),
      timestamp: new Date().toISOString()
    };

    res.json(forecastData);
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) {
        return res.status(401).json({ 
          error: 'Invalid API key',
          message: 'Please check your WEATHER_API_KEY in .env file'
        });
      }
      return res.status(error.response.status).json({ 
        error: 'Weather API error',
        message: error.response.data?.message || 'Failed to fetch forecast data'
      });
    }
    
    console.error('Error fetching forecast:', error.message);
    res.status(500).json({ 
      error: 'Internal server error',
      message: 'Failed to fetch forecast data'
    });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Not found',
    message: `Route ${req.method} ${req.path} not found`,
    availableEndpoints: [
      'GET /health',
      'GET /api/weather/current?city=<city_name>',
      'GET /api/weather/current/coordinates?lat=<latitude>&lon=<longitude>',
      'GET /api/weather/forecast?city=<city_name>',
      'GET /api/weather/forecast/coordinates?lat=<latitude>&lon=<longitude>'
    ]
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: 'An unexpected error occurred'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🌤️  Weather API server is running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
  if (!WEATHER_API_KEY) {
    console.warn('⚠️  WARNING: WEATHER_API_KEY is not set in .env file');
  }
});

module.exports = app;

