import {View, StyleSheet, Text} from 'react-native';
import React from 'react';

const Post = () => {
  return (
    <View style={styles.constainer}>
      <Text>post</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    backgroundColor: 'black',
  },
});

export default Post;
