import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

type WeatherConditionProps = {
  condition: 'sunny' | 'cloudy' | 'rainy' | 'stormy';
};

const WeatherCondition: React.FC<WeatherConditionProps> = ({ condition }) => {
  const getConditionData = () => {
    switch (condition) {
      case 'sunny':
        return {
          icon: <MaterialIcons name="wb-sunny" size={48} color="#FFA726" />,
          text: 'Ensolarado'
        };
      case 'cloudy':
        return {
          icon: <MaterialIcons name="cloud" size={48} color="#78909C" />,
          text: 'Nublado'
        };
      case 'rainy':
        return {
          icon: <MaterialCommunityIcons name="weather-rainy" size={48} color="#42A5F5" />,
          text: 'Chuvoso'
        };
      case 'stormy':
        return {
          icon: <MaterialIcons name="flash-on" size={48} color="#FFCA28" />,
          text: 'Tempestade'
        };
      default:
        return {
          icon: <MaterialIcons name="wb-sunny" size={48} color="#FFA726" />,
          text: 'Ensolarado'
        };
    }
  };

  const { icon, text } = getConditionData();

  return (
    <View style={styles.container}>
      {icon}
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 8,
    color: '#333',
  }
});

export default WeatherCondition;