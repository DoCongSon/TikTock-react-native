import { getAuth } from 'firebase/auth';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useUser } from '../../hooks/useUser';
import Avatar from '../other/Avatar';

const MessageItem = ({ data }) => {
  const { data: userData, isLoading } = useUser(data.creator);
  const isCurrentUser = data.creator === getAuth().currentUser.uid;
  if (isLoading) {
    return <View />;
  }

  return (
    <View style={[styles.container, isCurrentUser && styles.currentUserContainer]}>
      <Avatar size={40} uri={userData.photoURL} />
      <View style={isCurrentUser ? styles.infoContainer : styles.infoCurrentContainer}>
        <Text>{data.message}</Text>
      </View>
    </View>
  );
};

export default MessageItem;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    marginVertical: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  currentUserContainer: {
    flexDirection: 'row-reverse',
  },
  infoContainer: {
    marginLeft: 10,
  },
});
