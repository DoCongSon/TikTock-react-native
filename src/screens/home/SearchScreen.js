import { FlatList, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import SearchUserItem from '../../components/search/SearchUserItem';
import { queryUsersByName } from '../../services/search';

const SearchScreen = () => {
  const [searchValue, setSearchValue] = useState('');
  const [searchUsers, setSearchUsers] = useState([]);

  useEffect(() => {
    (async () => {
      const users = await queryUsersByName(searchValue);
      setSearchUsers(users);
    })();
  }, [searchValue]);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder='Tìm bạn bè'
        style={styles.inputSearch}
        selectionColor='red'
        value={searchValue}
        onChangeText={(value) => setSearchValue(value)}
      />
      <FlatList
        style={styles.searchUserList}
        data={searchUsers}
        keyExtractor={(user) => user.id}
        renderItem={({ item }) => <SearchUserItem user={item} />}
      />
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    paddingHorizontal: 20,
  },
  inputSearch: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    color: 'black',
    fontSize: 18,
  },
});
