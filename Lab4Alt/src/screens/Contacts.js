import React, {useEffect} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setContacts} from '../store/Store';
import ContactListItem from '../components/ContactListItem';

const Contacts = ({navigation}) => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.contacts);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch('https://randomuser.me/api/?results=50');
      const data = await response.json();
      dispatch(setContacts(data.results));
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        keyExtractor={item => item.login.uuid}
        renderItem={({item}) => (
          <ContactListItem
            contact={item}
            onPress={contact => navigation.navigate('Profile', {contact})}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});

export default Contacts;
