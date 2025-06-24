import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ShadowView from './ShadowView';

type WeatherCardProps = {
  title: string;
  value: string | number;
  unit?: string;
  icon?: React.ReactNode;
};

const WeatherCard: React.FC<WeatherCardProps> = ({ title, value, unit, icon }) => {
  return (
    <ShadowView style={styles.card}>
      <View style={styles.iconContainer}>
        {icon}
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>
        {value}
        {unit && <Text style={styles.unit}> {unit}</Text>}
      </Text>
    </ShadowView>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '48%',
    padding: 16,
    marginVertical: 8,
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  value: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 4,
  },
  unit: {
    fontSize: 16,
    fontWeight: 'normal',
  }
});

export default WeatherCard;