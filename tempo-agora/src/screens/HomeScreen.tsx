import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Linking, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import WeatherCard from '../components/WeatherCard';
import WeatherCondition from '../components/WeatherCondition';
import ShadowView from '../components/ShadowView';
import { getWeatherData, WeatherData, cities } from '../utils/weatherData';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

const HomeScreen: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState(cities[0]);

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      const data = await getWeatherData(selectedCity);
      setWeather(data);
      setLoading(false);
    };

    fetchWeather();
  }, [selectedCity]);

  const handleMoreInfo = () => {
    Linking.openURL('https://www.climatempo.com.br');
  };

  const handleCityChange = (city: typeof cities[number]) => {
    setSelectedCity(city);
  };

  if (loading && !weather) {
    return (
      <LinearGradient
        colors={['#4c669f', '#3b5998', '#192f6a']}
        style={styles.container}
      >
        <ActivityIndicator size="large" color="#FFFFFF" />
        <Text style={styles.loadingText}>Carregando dados climáticos...</Text>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.appTitle}>Tempo Agora</Text>
          <Text style={styles.cityText}>{selectedCity}</Text>
        </View>

        <ShadowView style={styles.mainCard}>
          <WeatherCondition condition={weather?.condition || 'sunny'} />
          <Text style={styles.temperatureText}>
            {weather?.temperature}°C
          </Text>
        </ShadowView>

        <View style={styles.cardsContainer}>
          <WeatherCard
            title="Umidade"
            value={weather?.humidity || 0}
            unit="%"
            icon={<FontAwesome5 name="water" size={24} color="#42A5F5" />}
          />
          <WeatherCard
            title="Vento"
            value={weather?.windSpeed || 0}
            unit="km/h"
            icon={<FontAwesome5 name="wind" size={24} color="#78909C" />}
          />
        </View>

        <View style={styles.citySelector}>
          <Text style={styles.selectorTitle}>Selecione uma cidade:</Text>
          <View style={styles.cityButtonsContainer}>
            {cities.map((city) => (
              <TouchableOpacity
                key={city}
                style={[
                  styles.cityButton,
                  selectedCity === city && styles.selectedCityButton
                ]}
                onPress={() => handleCityChange(city)}
              >
                <Text style={[
                  styles.cityButtonText,
                  selectedCity === city && styles.selectedCityButtonText
                ]}>
                  {city}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <ShadowView style={styles.infoButton} onTouchEnd={handleMoreInfo}>
          <Text style={styles.infoButtonText}>Mais Informações</Text>
          <MaterialIcons name="arrow-forward" size={24} color="#3b5998" />
        </ShadowView>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 50,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  appTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  cityText: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.8)',
  },
  mainCard: {
    width: '100%',
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  temperatureText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  cardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  infoButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    marginTop: 20,
  },
  infoButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3b5998',
  },
  loadingText: {
    color: 'white',
    marginTop: 20,
    fontSize: 16,
  },
  citySelector: {
    marginTop: 20,
    width: '100%',
  },
  selectorTitle: {
    color: 'white',
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  cityButtonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },
  cityButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  selectedCityButton: {
    backgroundColor: '#FFFFFF',
    borderColor: '#4c669f',
  },
  cityButtonText: {
    color: 'white',
    fontSize: 14,
  },
  selectedCityButtonText: {
    color: '#3b5998',
    fontWeight: 'bold',
  },
});

export default HomeScreen;