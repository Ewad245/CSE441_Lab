import React from 'react';
import {View, FlatList, StyleSheet, Text} from 'react-native';
import {useSelector} from 'react-redux';
import ContactListItem from '../components/ContactListItem';

const Favorites = ({navigation}) => {
  const favorites = useSelector(state => state.contacts.favorites);

  return (
    <View style={styles.container}>
      {favorites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No favorites yet</Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={item => item.login.uuid}
          renderItem={({item}) => (
            <ContactListItem
              contact={item}
              onPress={contact => navigation.navigate('Profile', {contact})}
            />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
});

export default Favorites;
