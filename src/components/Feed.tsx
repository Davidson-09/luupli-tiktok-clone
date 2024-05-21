import {View, StyleSheet, ActivityIndicator, ViewToken} from 'react-native';
import React, {useState} from 'react';
import {FlashList} from '@shopify/flash-list';
import FeedItem from './FeedItem';
import useLoadPosts from '../hooks/useLoadPosts';
import {following, forYou} from '../constants/feedLinks';
import {Dimensions} from 'react-native';
import {Post} from '../types';
import {VideoRef} from 'react-native-video';

const screenHeight = Dimensions.get('window').height;

interface FeedProps {
  feedType: string;
}

export type VideoPostRef = {
  postId: string;
  videoRef: VideoRef;
};

const Feed: React.FC<FeedProps> = ({feedType}) => {
  const feedUrl = feedType === 'following' ? following : forYou;
  const {posts, isLoading} = useLoadPosts(feedUrl);
  const [videoRefs, setVideoRefs] = useState<VideoPostRef[]>([]);

  const rendertItem = ({item}: {item: Post; index: number}) => {
    return (
      <FeedItem post={item} setVideoRefs={setVideoRefs} videoRefs={videoRefs} />
    );
  };

  const onViewableItemsChanged = (callback: {
    changed: ViewToken[];
    viewableItems: ViewToken[];
  }) => {
    const prevVideoKey = callback.changed[0].key;
    // find video ref corresponding to the id
    const prevVideoRef = videoRefs.find(videoRef => {
      return prevVideoKey === videoRef.postId;
    });
    console.log(prevVideoRef, 'the previous video');
    // pause prev video
    if (!callback.changed[0].isViewable) {
      prevVideoRef?.videoRef.pause();
    }

    const currentVideoKey = callback.viewableItems[0].key;
    // find video ref corresponding to the id
    const currentVideoRef = videoRefs.find(videoRef => {
      return currentVideoKey === videoRef.postId;
    });
    console.log(currentVideoRef, 'the current video');
    if (callback.viewableItems[0].isViewable) {
      currentVideoRef?.videoRef.resume();
    }
  };

  return (
    <View style={styles.container}>
      {isLoading && (
        <View style={styles.loader}>
          <ActivityIndicator size="large" />
        </View>
      )}
      <FlashList
        data={posts}
        renderItem={rendertItem}
        estimatedItemSize={200}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        keyExtractor={item => `${item.id}`}
        bounces={false}
        onViewableItemsChanged={onViewableItemsChanged}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loader: {
    position: 'absolute',
    flex: 1,
    zIndex: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    height: screenHeight,
    width: '100%',
  },
});

export default Feed;
