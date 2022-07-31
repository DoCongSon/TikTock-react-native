import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { Avatar } from 'react-native-paper';
import IconButton from '../../components/button/IconButton';
import Divider from '../../components/other/Divider';
import TextIconButton from '../../components/button/TextIconButton';

const ProfileScreen = ({ navigation }) => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const posts = useSelector((state) => state.post.currentUserPosts);

  console.log(posts);

  return (
    <View style={styles.container}>
      <View style={styles.navBarContainer}>
        <IconButton icon='search' size={24} color='black' />
        <Text style={styles.displayName}>Đỗ Công Sơn</Text>
        <IconButton icon='menu' size={24} color='black' />
      </View>
      <Divider color='gray' size={1} horizontal={20} vertical={10} />
      <View style={styles.profileHeaderContainer}>
        <Avatar.Text label='Sơn' size={80} />
        <Text style={styles.profileEmail}>{currentUser.email}</Text>
        <View style={styles.counterContainer}>
          <View style={styles.counterItem}>
            <Text style={styles.counterNumber}>4</Text>
            <Text style={styles.counterText}>Follower</Text>
          </View>
          <View style={styles.counterItem}>
            <Text style={styles.counterNumber}>4</Text>
            <Text style={styles.counterText}>Follower</Text>
          </View>
          <View style={styles.counterItem}>
            <Text style={styles.counterNumber}>4</Text>
            <Text style={styles.counterText}>Follower</Text>
          </View>
        </View>
        <View style={styles.editButtonContainer}>
          <TextIconButton
            title='Sửa hồ sơ'
            onPress={() => navigation.navigate('EditProfileScreen')}
          />
        </View>
      </View>
      <Divider color='gray' size={1} />
      <View style={styles.postsContainer}>
        <FlatList
          numColumns={3}
          removeClippedSubviews
          data={posts}
          keyExtractor={(post) => post.id}
          renderItem={({ item }) => <PostItem item={item} />}
        />
      </View>
    </View>
  );
};

const PostItem = ({ item }) => {
  return (
    <View style={{ flex: 1 / 3, margin: 1 }}>
      <Image source={{ uri: item.source.thumbnailUrl }} style={{ aspectRatio: 9 / 16 }} />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
  },
  navBarContainer: {
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  displayName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  profileHeaderContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginHorizontal: 50,
  },
  profileEmail: {
    fontSize: 16,
    marginTop: 10,
  },
  counterContainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterItem: {
    flex: 1,
    alignItems: 'center',
  },
  counterNumber: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  counterText: {
    fontSize: 16,
    color: 'gray',
  },
  editButtonContainer: {
    marginVertical: 20,
  },
  postsContainer: {
    flex: 1,
  },
});
