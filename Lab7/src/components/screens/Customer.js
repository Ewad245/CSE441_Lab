import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {Crown} from 'lucide-react-native';
import axios from 'axios';
import {Styles} from '../../style';

export const Customer = ({navigation}) => {
  const [customers, setCustomers] = useState([]);

  const CustomerCard = ({customer}) => (
    <TouchableOpacity
      style={Styles.card}
      onPress={() =>
        navigation.navigate('CustomerDetail', {customerId: customer._id})
      }>
      <View>
        <Text>Customer: {customer.name}</Text>
        <Text>Phone: {customer.phone}</Text>
        <Text>Total money: {customer.totalSpent} đ</Text>
      </View>
      <Crown size={24} color="#FF4081" style={Styles.loyaltyIcon} />
    </TouchableOpacity>
  );

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
    <SafeAreaView style={Styles.container}>
      <FlatList
        data={customers}
        renderItem={({item}) => <CustomerCard customer={item} />}
        keyExtractor={item => item._id}
      />
      <TouchableOpacity
        style={Styles.fab}
        onPress={() => navigation.navigate('AddCustomer')}>
        <Text style={Styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
