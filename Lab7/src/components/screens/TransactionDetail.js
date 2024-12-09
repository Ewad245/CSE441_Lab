import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, SafeAreaView, Alert} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Styles} from '../../style';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import AsyncStorage from '@react-native-async-storage/async-storage';
const TransactionDetailScreen = ({route, navigation}) => {
  const [transaction, setTransaction] = useState(null);
  const {transactionId} = route.params;

  const handleDeleteTracsaction = async () => {
    try {
      const token = await AsyncStorage.getItem('loginToken');
      const {customerId} = route.params;

      const response = await fetch(
        `https://kami-backend-5rs0.onrender.com/transactions/${transactionId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error('Failed to delete transaction');
      }

      Alert.alert('Success', 'Customer deleted successfully');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  useEffect(() => {
    fetchTransactionDetail();
  }, [transactionId]);

  const fetchTransactionDetail = async () => {
    try {
      const response = await axios.get(
        `https://kami-backend-5rs0.onrender.com/transactions/${transactionId}`,
      );
      setTransaction(response.data);
    } catch (error) {
      console.error('Error fetching transaction detail:', error);
    }
  };

  if (!transaction) return null;

  return (
    <SafeAreaView style={Styles.container}>
      <View style={Styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={Styles.backButton}>
          <Icon name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={Styles.headerTitle}>Transaction detail</Text>
        <TouchableOpacity style={Styles.menuButton}>
          <Icon name="more-vert" size={24} color="white" />
        </TouchableOpacity>
        <Menu>
          <MenuTrigger>
            <Text style={Styles.menuTrigger}>⋮</Text>
          </MenuTrigger>
          <MenuOptions>
            <MenuOption>
              <Text>See more detail</Text>
            </MenuOption>
            <MenuOption
              onSelect={() => {
                Alert.alert(
                  'Warning',
                  'Are you sure you want to cancel this tracsaction? This operation cannot be returned',
                  [
                    {text: 'CANCEL', style: 'cancel'},
                    {text: 'DELETE', onPress: handleDeleteTracsaction},
                  ],
                );
              }}>
              <Text style={{color: 'red'}}>Delete</Text>
            </MenuOption>
          </MenuOptions>
        </Menu>
      </View>

      <View style={Styles.detailContainer}>
        <View style={Styles.section}>
          <Text style={Styles.sectionTitle}>General information</Text>
          <View style={Styles.infoRow}>
            <Text style={Styles.infoLabel}>Transaction code</Text>
            <Text style={Styles.infoValue}>{transaction._id}</Text>
          </View>
          <View style={Styles.infoRow}>
            <Text style={Styles.infoLabel}>Customer</Text>
            <Text style={Styles.infoValue}>
              {transaction.customer?.name} - {transaction.customer?.phone}
            </Text>
          </View>
          <View style={Styles.infoRow}>
            <Text style={Styles.infoLabel}>Creation time</Text>
            <Text style={Styles.infoValue}>{transaction.createdAt}</Text>
          </View>
        </View>

        <View style={Styles.section}>
          <Text style={Styles.sectionTitle}>Services list</Text>
          {transaction.services?.map((service, index) => (
            <View key={index} style={Styles.serviceRow}>
              <View style={Styles.serviceInfo}>
                <Text style={Styles.serviceName}>{service.name}</Text>
                <Text style={Styles.serviceQuantity}>x{service.quantity}</Text>
              </View>
              <Text style={Styles.servicePrice}>
                {(service.price * service.quantity).toLocaleString()} đ
              </Text>
            </View>
          ))}
          <View style={Styles.totalRow}>
            <Text style={Styles.totalLabel}>Total</Text>
            <Text style={Styles.totalAmount}>
              {transaction.price?.toLocaleString()} đ
            </Text>
          </View>
        </View>

        <View style={Styles.section}>
          <Text style={Styles.sectionTitle}>Cost</Text>
          <View style={Styles.infoRow}>
            <Text style={Styles.infoLabel}>Amount of money</Text>
            <Text style={Styles.infoValue}>
              {transaction.price?.toLocaleString()} đ
            </Text>
          </View>
          <View style={Styles.infoRow}>
            <Text style={Styles.infoLabel}>Discount</Text>
            <Text style={Styles.infoValue}>
              -{transaction.discount?.toLocaleString()} đ
            </Text>
          </View>
          <View style={Styles.totalPaymentRow}>
            <Text style={Styles.totalPaymentLabel}>Total payment</Text>
            <Text style={Styles.totalPaymentAmount}>
              {(
                transaction.price - (transaction.discount || 0)
              ).toLocaleString()}{' '}
              đ
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default TransactionDetailScreen;
