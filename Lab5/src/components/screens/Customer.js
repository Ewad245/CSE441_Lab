import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {Crown} from 'lucide-react-native';
import axios from 'axios';

const CustomerCard = ({customer}) => (
  <View style={styles.card}>
    <View>
      <Text>Customer: {customer.name}</Text>
      <Text>Phone: {customer.phone}</Text>
      <Text>Total money: {customer.totalSpent} đ</Text>
    </View>
    <Crown size={24} color="#FF4081" style={styles.loyaltyIcon} />
  </View>
);

export const Customer = ({navigation}) => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get(
        'https://kami-backend-5rs0.onrender.com/customers',
      );
      setCustomers(response.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={customers}
        renderItem={({item}) => <CustomerCard customer={item} />}
        keyExtractor={item => item._id}
      />
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddCustomer')}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};
