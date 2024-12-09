import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import {Styles} from '../../style';
import axios from 'axios';
export const AddCustomer = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      await axios.post(
        'https://kami-backend-5rs0.onrender.com/customers',
        {name, phone},
        {headers: {Authorization: `Bearer ${token}`}},
      );
      navigation.goBack();
    } catch (error) {
      console.error('Error adding customer:', error);
    }
  };

  return (
    <View style={Styles.container}>
      <TextInput
        style={Styles.input}
        placeholder="Customer name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={Styles.input}
        placeholder="Phone number"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <TouchableOpacity style={Styles.button} onPress={handleSubmit}>
        <Text style={Styles.buttonText}>Add</Text>
      </TouchableOpacity>
    </View>
  );
};
