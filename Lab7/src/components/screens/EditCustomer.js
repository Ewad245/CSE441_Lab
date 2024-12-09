import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Styles} from '../../style';
const EditCustomerScreen = ({route, navigation}) => {
  const {customer} = route.params;
  const [name, setName] = useState(customer.name);
  const [phone, setPhone] = useState(customer.phone);

  const handleUpdateCustomer = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      const response = await fetch(
        `https://kami-backend-5rs0.onrender.com/Customers/${customer._id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name,
            phone,
            login_token: token,
          }),
        },
      );

      if (!response.ok) {
        throw new Error('Failed to update customer');
      }

      const updatedCustomer = await response.json();
      Alert.alert('Success', 'Customer updated successfully');
      navigation.navigate('CustomerDetail', {
        customerId: customer._id,
      });
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <ScrollView style={Styles.container}>
      <Text style={Styles.title}>Edit Customer</Text>

      <View style={Styles.inputContainer}>
        <Text style={Styles.label}>Name</Text>
        <TextInput
          style={Styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Enter customer name"
        />

        <Text style={Styles.label}>Phone</Text>
        <TextInput
          style={Styles.input}
          value={phone}
          onChangeText={setPhone}
          placeholder="Enter phone number"
          keyboardType="phone-pad"
        />
      </View>

      <TouchableOpacity style={Styles.button} onPress={handleUpdateCustomer}>
        <Text style={Styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
export default EditCustomerScreen;
