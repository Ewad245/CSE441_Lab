import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {Styles} from '../../style';

export const AddServiceScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const handleAdd = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      await axios.post(
        'https://kami-backend-5rs0.onrender.com/services',
        {name, price: Number(price)},
        {headers: {Authorization: `Bearer ${token}`}},
      );
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to add service');
    }
  };

  return (
    <SafeAreaView style={Styles.container}>
      <Text style={Styles.title}>Add Service</Text>
      <TextInput
        style={Styles.input}
        placeholder="Service name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={Styles.input}
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <TouchableOpacity style={Styles.button} onPress={handleAdd}>
        <Text style={Styles.buttonText}>Add</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
