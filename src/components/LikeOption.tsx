import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import LikeHeart from '../../assets/icons/Like.svg';

interface LikeOptionProps {
  numOfLikes: number;
}

const LikeOption: React.FC<LikeOptionProps> = ({numOfLikes}) => {
  return (
    <View style={styles.container}>
      <LikeHeart />
      <Text style={styles.text}>{numOfLikes}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  text: {
    color: 'white',
  },
});

export default LikeOption;
