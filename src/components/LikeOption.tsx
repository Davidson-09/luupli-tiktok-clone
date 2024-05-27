import {Text, StyleSheet, Pressable} from 'react-native';
import React, {Dispatch, SetStateAction, useState} from 'react';
import LikeHeart from '../../assets/icons/Like.svg';
import RedHeart from '../../assets/icons/RedHeart.svg';

interface LikeOptionProps {
  numOfLikes: number;
  setShowLikeAnimation: Dispatch<SetStateAction<boolean>>;
}

const LikeOption: React.FC<LikeOptionProps> = ({
  numOfLikes,
  setShowLikeAnimation,
}) => {
  const [liked, setLiked] = useState(false);
  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        setLiked(true);
        setShowLikeAnimation(true);
        setTimeout(() => {
          setShowLikeAnimation(false);
        }, 1000);
      }}>
      {liked ? <RedHeart /> : <LikeHeart />}
      <Text style={styles.text}>{numOfLikes}</Text>
    </Pressable>
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
