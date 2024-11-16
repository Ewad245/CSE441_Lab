import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {Styles} from '../../style';

const EditServiceScreen = ({route, navigation}) => {
  const {service} = route.params;
  const [name, setName] = useState(service.name);
  const [price, setPrice] = useState(service.price.toString());

  const handleEdit = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      await axios.put(
        `https://kami-backend-5rs0.onrender.com/services/${service._id}`,
        {name, price: Number(price)},
        {headers: {Authorization: `Bearer ${token}`}},
      );
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to update service');
    }
  };

  return (
    <SafeAreaView style={Styles.container}>
      <Text style={Styles.title}>Edit Service</Text>
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
      <TouchableOpacity style={Styles.button} onPress={handleEdit}>
        <Text style={Styles.buttonText}>Update</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default EditServiceScreen;
