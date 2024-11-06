import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import ContactThumb from '../components/ContactThumb';
import {useDispatch, useSelector} from 'react-redux';
import {toggleFavorite} from '../store/Store';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ProfileContact = ({route}) => {
  const {contact} = route.params;
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.contacts.favorites);
  const isFavorite = favorites.some(
    fav => fav.login.uuid === contact.login.uuid,
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <ContactThumb image={contact.picture.large} size={150} />
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => dispatch(toggleFavorite(contact))}>
          <Icon
            name={isFavorite ? 'star' : 'star-border'}
            size={32}
            color={isFavorite ? '#FFD700' : '#999'}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>
          {contact.name.first} {contact.name.last}
        </Text>
        <Text style={styles.info}>Email: {contact.email}</Text>
        <Text style={styles.info}>Phone: {contact.phone}</Text>
        <Text style={styles.info}>Cell: {contact.cell}</Text>
        <Text style={styles.info}>
          Location: {contact.location.city}, {contact.location.country}
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    alignItems: 'center',
    padding: 20,
    position: 'relative',
    backgroundColor: '#f5f5f5',
  },
  favoriteButton: {
    position: 'absolute',
    right: 20,
    top: 20,
    padding: 10,
  },
  infoContainer: {
    padding: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  info: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
});

export default ProfileContact;
