import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Styles} from './../../style';

const TransactionScreen = ({navigation}) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(
        'https://kami-backend-5rs0.onrender.com/transactions',
      );
      setTransactions(response.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={Styles.transactionCard}
      onPress={() =>
        navigation.navigate('TransactionDetail', {transactionId: item._id})
      }>
      <View style={Styles.transactionContent}>
        <Text style={Styles.transactionId}>
          {item.id} - {item.createdAt}
        </Text>
        {item.services &&
          item.services.map((service, index) => (
            <Text key={index} style={Styles.serviceText}>
              - {service.name}
            </Text>
          ))}
        <Text style={Styles.customerText}>
          Customer: {item.customer?.name || 'N/A'}
        </Text>
        {item.status === 'Cancelled' && (
          <Text style={Styles.cancelledText}>• Cancelled</Text>
        )}
      </View>
      <Text style={Styles.priceText}>{item.price?.toLocaleString()} đ</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={Styles.container}>
      <View style={Styles.header}>
        <Text style={Styles.headerTitle}>Transaction</Text>
      </View>
      <FlatList
        data={transactions}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        contentContainerStyle={Styles.listContainer}
      />
      <TouchableOpacity style={Styles.fab}>
        <Text style={Styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
export default TransactionScreen;
