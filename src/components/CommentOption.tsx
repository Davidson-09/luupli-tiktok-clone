import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import CommentIcon from '../../assets/icons/Comment.svg';

interface CommentOptionProps {
  comments: number;
}

const CommentOption: React.FC<CommentOptionProps> = ({comments}) => {
  return (
    <View style={styles.container}>
      <CommentIcon />
      <Text style={styles.text}>{comments}</Text>
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

export default CommentOption;
