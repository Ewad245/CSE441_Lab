import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {toggleFavorite} from '../store/Store';
import ContactThumb from './ContactThumb';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ContactListItem = ({contact, onPress}) => {
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.contacts.favorites);
  const isFavorite = favorites.some(
    fav => fav.login.uuid === contact.login.uuid,
  );

  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(contact)}>
      <ContactThumb image={contact.picture.thumbnail} size={50} />
      <View style={styles.contentContainer}>
        <Text style={styles.name}>
          {contact.name.first} {contact.name.last}
        </Text>
        <Text style={styles.phone}>{contact.phone}</Text>
      </View>
      <TouchableOpacity
        style={styles.favoriteButton}
        onPress={() => dispatch(toggleFavorite(contact))}>
        <Icon
          name={isFavorite ? 'star' : 'star-border'}
          size={24}
          color={isFavorite ? '#FFD700' : '#999'}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: 'white',
  },
  contentContainer: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  phone: {
    color: '#666',
    marginTop: 2,
  },
  favoriteButton: {
    padding: 5,
  },
});

export default ContactListItem;
