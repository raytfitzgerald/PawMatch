import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function MatchScreen() {
  return (
    <View style={styles.container}>
      <Text>It's a Match!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MatchScreen;
