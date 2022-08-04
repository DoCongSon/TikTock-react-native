import { StyleSheet, Text, View } from 'react-native';
import React, { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { Dimensions } from 'react-native';
const BOTTOM_TAB_BAR_HEIGHT = 58;
import { Video, ResizeMode } from 'expo-av';
import { useUser } from '../../hooks/useUser';
import PostOverlay from './PostOverlay';

export const PostItem = forwardRef(({ item }, parentRef) => {
  const user = useUser(item.creator);
  const videoRef = useRef();
  useImperativeHandle(parentRef, () => ({
    play,
    stop,
    unload,
  }));

  useEffect(() => {
    return () => {
      unload();
    };
  }, []);

  const play = async () => {
    if (videoRef.current) {
      try {
        const status = await videoRef.current.getStatusAsync();
        if (!status.isPlaying) {
          await videoRef.current.playAsync();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const stop = async () => {
    if (videoRef.current) {
      try {
        const status = await videoRef.current.getStatusAsync();
        if (status.isPlaying) {
          await videoRef.current.stopAsync();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const unload = async () => {
    if (videoRef.current) {
      try {
        await videoRef.current.unloadAsync();
      } catch (error) {}
    }
  };

  return (
    <View style={styles.container}>
      <PostOverlay user={user.data} post={item} />
      <Video
        ref={videoRef}
        source={{ uri: item.source.mediaUrl }}
        style={styles.video}
        usePoster
        posterSource={{ uri: item.source.thumbnailUrl }}
        posterStyle={{ resizeMode: 'contain', flex: 1 }}
        resizeMode={ResizeMode.CONTAIN}
        isLooping
      />
    </View>
  );
});

export default PostItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: Dimensions.get('window').height - BOTTOM_TAB_BAR_HEIGHT,
  },
  video: {
    flex: 1,
  },
});
