import React from 'react';
import { View, ViewProps, StyleSheet } from 'react-native';

const ShadowView: React.FC<ViewProps> = ({ children, style, ...props }) => {
  return (
    <View 
      style={[styles.shadow, style]}
      {...props}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: 'white',
    borderRadius: 16,
  }
});

export default ShadowView;