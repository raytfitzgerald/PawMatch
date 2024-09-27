import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';

const BackgroundWrapper = ({ children }) => {
  return (
    <ImageBackground
      source={{ uri: 'https://img.freepik.com/premium-photo/cute-dog-wallpaper_965126-16.jpg' }}
      style={styles.backgroundImage}
    >
      {children}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
});

export default BackgroundWrapper;
