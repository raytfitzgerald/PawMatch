import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

function DogCard({ dog }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: dog.imageUrl }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{dog.name}</Text>
        <Text style={styles.breed}>{dog.breed}</Text>
        <Text style={styles.age}>{dog.age} years old</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
    margin: 10,
  },
  image: {
    width: 300,
    height: 300,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  info: {
    padding: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  breed: {
    fontSize: 18,
    color: '#666',
  },
  age: {
    fontSize: 16,
    color: '#999',
  },
});

export default DogCard;