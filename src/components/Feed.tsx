import {View, StyleSheet, ActivityIndicator, ViewToken} from 'react-native';
import React, {useCallback, useState} from 'react';
import {FlashList} from '@shopify/flash-list';
import FeedItem from './FeedItem';
import useLoadPosts from '../hooks/useLoadPosts';
import {following, forYou} from '../constants/feedLinks';
import {Dimensions} from 'react-native';
import {Post} from '../types';
import {VideoRef} from 'react-native-video';
import {useRef} from 'react';
import {useFocusEffect} from '@react-navigation/native';

const screenHeight = Dimensions.get('screen').height;

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
  const [currentVideoRef, setCurrentVideoRef] = useState<VideoPostRef | null>();

  const listRef = useRef<FlashList<any>>(null);

  const rendertItem = ({item, index}: {item: Post; index: number}) => {
    return (
      <FeedItem
        post={item}
        setVideoRefs={setVideoRefs}
        videoRefs={videoRefs}
        listRef={listRef}
        currentIndex={index}
        contentLength={posts.length}
      />
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
    // pause prev video
    if (
      prevVideoRef &&
      !callback.changed[0].isViewable &&
      callback.changed[0].index !== 0
    ) {
      prevVideoRef?.videoRef.seek(0);
      prevVideoRef?.videoRef.pause();
    }

    if (!callback.viewableItems[0]) {
      return;
    }
    const currentVideoKey = callback.viewableItems[0].key;
    // find video ref corresponding to the id
    const videoRef = videoRefs.find(videoRefItem => {
      return currentVideoKey === videoRefItem.postId;
    });
    if (!videoRef && listRef.current && callback.viewableItems[0].isViewable) {
      setCurrentVideoRef(null);
      const index: number = callback.viewableItems[0].index as number;
      setTimeout(() => {
        try {
          listRef.current?.scrollToIndex({
            index: index + 1,
            animated: true,
          });
        } catch (e) {
          throw new Error(e as string);
        }
      }, 10000);
      return;
    }
    if (callback.viewableItems[0].isViewable) {
      setCurrentVideoRef(videoRef);
      videoRef?.videoRef.resume();
    }
  };

  useFocusEffect(
    useCallback(() => {
      currentVideoRef && currentVideoRef?.videoRef.resume();
      return () => {
        currentVideoRef && currentVideoRef?.videoRef.pause();
      };
    }, [currentVideoRef]),
  );

  return (
    <View style={styles.container}>
      {isLoading && (
        <View style={styles.loader}>
          <ActivityIndicator size="large" />
        </View>
      )}
      <FlashList
        ref={listRef}
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
