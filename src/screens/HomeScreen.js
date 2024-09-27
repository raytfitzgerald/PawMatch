import React, { useState, useRef } from 'react';
import { View, StyleSheet, PanResponder, Animated } from 'react-native';
import DogCard from '../components/DogCard';
import BackgroundWrapper from '../components/BackgroundWrapper';

const SWIPE_THRESHOLD = 120;

function HomeScreen() {
  const [dogs, setDogs] = useState([
    {
      id: 1,
      name: 'Buddy',
      breed: 'Golden Retriever',
      age: 3,
      imageUrl: 'https://www.thesprucepets.com/thmb/BdxJ2rJwBq63fCX__v-vfASRci8=/1080x0/filters:no_upscale():strip_icc()/31170124_355309831644176_4994517524629422080_n-5b3a4d0ec9e77c003771e6a6.jpg',
    },
    {
      id: 2,
      name: 'Luna',
      breed: 'Husky',
      age: 2,
      imageUrl: 'https://images.dog.ceo/breeds/husky/n02110185_10047.jpg',
    },
    {
      id: 3,
      name: 'Max',
      breed: 'German Shepherd',
      age: 4,
      imageUrl: 'https://www.thesprucepets.com/thmb/aAFX2lUtag-3Rq11_Pxrim6ZLlg=/1080x0/filters:no_upscale():strip_icc()/16_Love-5bb4c12bc9e77c00263933b3.jpg',
    },
    {
      id: 4,
      name: 'Bella',
      breed: 'Poodle',
      age: 1,
      imageUrl: 'https://images.dog.ceo/breeds/poodle-miniature/n02113712_919.jpg',
    },
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const position = useRef(new Animated.ValueXY()).current;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gesture) => {
      position.setValue({ x: gesture.dx, y: gesture.dy });
    },
    onPanResponderRelease: (event, gesture) => {
      if (gesture.dx > SWIPE_THRESHOLD) {
        swipeRight();
      } else if (gesture.dx < -SWIPE_THRESHOLD) {
        swipeLeft();
      } else {
        resetPosition();
      }
    },
  });

  const swipeLeft = () => {
    Animated.timing(position, {
      toValue: { x: -SWIPE_THRESHOLD * 2, y: 0 },
      duration: 250,
      useNativeDriver: true,
    }).start(() => nextDog());
  };

  const swipeRight = () => {
    Animated.timing(position, {
      toValue: { x: SWIPE_THRESHOLD * 2, y: 0 },
      duration: 250,
      useNativeDriver: true,
    }).start(() => nextDog());
  };

  const resetPosition = () => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: true,
    }).start();
  };

  const nextDog = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
    position.setValue({ x: 0, y: 0 });
  };

  const renderCurrentDog = () => {
    if (currentIndex >= dogs.length) {
      return null; // No more dogs to show
    }

    const currentDog = dogs[currentIndex];

    return (
      <Animated.View
        key={currentDog.id}
        style={[styles.animatedCard, {
          transform: [
            { translateX: position.x },
            { rotate: position.x.interpolate({
                inputRange: [-200, 0, 200],
                outputRange: ['-30deg', '0deg', '30deg'],
              })
            },
          ],
        }]}
        {...panResponder.panHandlers}
      >
        <DogCard dog={currentDog} />
      </Animated.View>
    );
  };

  return (
    <BackgroundWrapper>
      <View style={styles.container}>{renderCurrentDog()}</View>
    </BackgroundWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animatedCard: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;