export interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  condition: 'sunny' | 'cloudy' | 'rainy' | 'stormy';
  city: string;
}

type CityWeatherData = {
  [key: string]: {
    temperature: number;
    humidity: number;
    windSpeed: number;
    condition: WeatherData['condition']; 
  };
};

const cityData: CityWeatherData = {
  "São Paulo": {
    temperature: 22,
    humidity: 80,
    windSpeed: 10,
    condition: 'cloudy'
  },
  "Rio de Janeiro": {
    temperature: 28,
    humidity: 75,
    windSpeed: 15,
    condition: 'sunny'
  },
  "Belo Horizonte": {
    temperature: 20,
    humidity: 70,
    windSpeed: 8,
    condition: 'rainy'
  },
  "Brasília": {
    temperature: 25,
    humidity: 60,
    windSpeed: 12,
    condition: 'sunny'
  },
  "Salvador": {
    temperature: 30,
    humidity: 85,
    windSpeed: 20,
    condition: 'stormy'
  }
};

export const getWeatherData = (city: string): Promise<WeatherData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = cityData[city];
      if (data) {
        resolve({
          ...data,
          city
        });
      } else {
        const firstCity = Object.keys(cityData)[0];
        resolve({
          ...cityData[firstCity],
          city: firstCity
        });
      }
    }, 500);
  });
};

export const cities = Object.keys(cityData) as string[];