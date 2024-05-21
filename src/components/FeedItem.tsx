import {View, Text, StyleSheet, Image, ActivityIndicator} from 'react-native';
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import {Dimensions} from 'react-native';
import Video, {VideoRef} from 'react-native-video';
import {Post} from '../types';
import Thumbnail from './Thumbnail';
import LikeOption from './LikeOption';
import CommentOption from './CommentOption';
import ShareOption from './ShareOption';
import {gray} from '../constants/colors';
import {convertToCustomTimeString} from '../utils';
import {VideoPostRef} from './Feed';

const screenHeight = Dimensions.get('window').height;

interface FeedItemProps {
  post: Post;
  setVideoRefs: Dispatch<SetStateAction<VideoPostRef[]>>;
  videoRefs: VideoPostRef[];
}

const FeedItem: React.FC<FeedItemProps> = ({post, setVideoRefs, videoRefs}) => {
  const [loading, setLoading] = useState(false);
  const videoRef = useRef<VideoRef>(null);
  const {
    thumbnailUrl,
    likes,
    comments,
    username,
    timestamp,
    caption,
    type,
    imageUrl,
    id,
    videoUrl,
  } = post;

  useEffect(() => {
    if (type === 'video') {
      const newVideoRefs = videoRefs;
      newVideoRefs.push({
        postId: id,
        videoRef: videoRef.current as VideoRef,
      });
      setVideoRefs(newVideoRefs);
    }
  }, [id, setVideoRefs, type, videoRefs]);

  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.loader}>
          <ActivityIndicator size="large" />
        </View>
      )}
      {type === 'video' ? (
        <Video
          source={{
            uri: videoUrl,
          }}
          ref={videoRef}
          style={styles.backgroundMedia}
          resizeMode="cover"
          paused
          onEnd={() => console.log('video has ended')}
          onError={error => console.log('video error', error)}
          onLoad={() => setLoading(false)}
          onLoadStart={() => setLoading(true)}
        />
      ) : (
        <Image source={{uri: imageUrl}} style={styles.backgroundMedia} />
      )}

      <View style={styles.rightOptions}>
        <Thumbnail url={thumbnailUrl} />
        <LikeOption numOfLikes={likes} />
        <CommentOption comments={comments} />
        <ShareOption />
      </View>

      <View style={styles.leftSide}>
        <Text style={styles.username}>
          {`@${username}`}{' '}
          <Text style={styles.timestamp}>{`. ${convertToCustomTimeString(
            timestamp,
          )}`}</Text>
        </Text>
        <Text style={styles.caption}>{caption}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: screenHeight - 100,
  },
  backgroundMedia: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: '#444444',
  },
  rightOptions: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    padding: 20,
    rowGap: 20,
    alignItems: 'center',
  },
  leftSide: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    padding: 20,
    rowGap: 20,
  },
  username: {
    color: 'white',
    fontWeight: '600',
  },
  timestamp: {
    color: gray,
    fontWeight: 'normal',
  },
  caption: {
    width: Dimensions.get('screen').width * 0.7,
    color: 'white',
  },
  loader: {
    width: '100%',
    position: 'absolute',
    top: 0,
    opacity: 50,
    height: Dimensions.get('screen').height,
    zIndex: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FeedItem;
