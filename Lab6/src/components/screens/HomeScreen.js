import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import axios from 'axios';
import {Styles} from '../../style';
import {useFocusEffect} from '@react-navigation/native';

export const HomeScreen = ({navigation}) => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get(
        'https://kami-backend-5rs0.onrender.com/services',
      );
      setServices(response.data);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch services');
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      fetchServices();
      return () => {
        // Optional cleanup if needed
      };
    }, []),
  );

  return (
    <SafeAreaView style={Styles.container}>
      <View style={Styles.header}>
        <Text style={Styles.headerTitle}>HUYỀN TRINH</Text>
        <Image
          source={require('../../../assets/kami-spa-logo.jpg')}
          style={Styles.logo}
        />
      </View>
      <Text style={Styles.sectionTitle}>Danh sách dịch vụ</Text>
      <ScrollView>
        {services.map(service => (
          <TouchableOpacity
            key={service._id}
            style={Styles.serviceItem}
            onPress={() => navigation.navigate('ServiceDetail', {service})}>
            <Text style={Styles.serviceName}>{service.name}</Text>
            <Text style={Styles.servicePrice}>
              {service.price.toLocaleString()} đ
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity
        style={Styles.addButton}
        onPress={() => navigation.navigate('AddService')}>
        <Text style={Styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
