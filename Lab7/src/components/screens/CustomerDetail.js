import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import {Styles} from '../../style';

const CustomerDetailScreen = ({route, navigation}) => {
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const {customerId} = route.params;

  const fetchCustomerDetail = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      const response = await fetch(
        `https://kami-backend-5rs0.onrender.com/customers/${customerId}`,
        {
          method: 'GET',
        },
      );

      if (!response.ok) {
        throw new Error('Failed to fetch customer details');
      }

      const data = await response.json();
      setCustomer(data);
      setLoading(false);
    } catch (error) {
      Alert.alert('Error', error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomerDetail();
  }, []);

  const handleEditCustomer = () => {
    navigation.navigate('EditCustomer', {customer});
  };

  const handleDeleteCustomer = async () => {
    try {
      const token = await AsyncStorage.getItem('loginToken');
      const {customerId} = route.params;

      const response = await fetch(
        `https://kami-backend-5rs0.onrender.com/Customers/${customerId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error('Failed to delete customer');
      }

      Alert.alert('Success', 'Customer deleted successfully');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  if (loading) {
    return (
      <View style={Styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={Styles.container}>
      <View style={Styles.detailHeader}>
        <Text style={Styles.title}>Customer Details</Text>
        <Menu>
          <MenuTrigger>
            <Text style={Styles.menuTrigger}>⋮</Text>
          </MenuTrigger>
          <MenuOptions>
            <MenuOption
              onSelect={() => navigation.navigate('EditCustomer', {customer})}>
              <Text>Edit</Text>
            </MenuOption>
            <MenuOption
              onSelect={() => {
                Alert.alert(
                  'Warning',
                  'Are you sure you want to remove this customer? This operation cannot be returned',
                  [
                    {text: 'CANCEL', style: 'cancel'},
                    {text: 'DELETE', onPress: handleDeleteCustomer},
                  ],
                );
              }}>
              <Text style={{color: 'red'}}>Delete</Text>
            </MenuOption>
          </MenuOptions>
        </Menu>
      </View>

      <View style={Styles.detailContainer}>
        <Text style={Styles.infoLabel}>Name:</Text>
        <Text style={Styles.infoValue}>{customer.name}</Text>

        <Text style={Styles.infoLabel}>Phone:</Text>
        <Text style={Styles.infoValue}>{customer.phone}</Text>

        <Text style={Styles.infoLabel}>Total spent:</Text>
        <Text style={Styles.infoValue}>
          {customer.totalSpent.toLocaleString()} đ
        </Text>
      </View>

      <Text style={Styles.sectionTitle}>Transaction History</Text>
      <View style={Styles.transactionContainer}>
        {customer.transactions.map((transaction, index) => (
          <View key={index} style={Styles.transactionCard}>
            <View style={Styles.transactionContent}>
              <Text style={Styles.transactionId}>{transaction.id}</Text>
              {transaction.services &&
                transaction.services.map((service, index) => (
                  <Text key={index} style={Styles.serviceText}>
                    - {service.name}
                  </Text>
                ))}
            </View>
            <Text style={Styles.priceText}>
              {transaction.price?.toLocaleString()} đ
            </Text>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default CustomerDetailScreen;
