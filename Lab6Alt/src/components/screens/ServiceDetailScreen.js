import React from 'react';
import {SafeAreaView, View, Text, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import axios from 'axios';
import {Styles} from '../../style';

export const ServiceDetailScreen = ({route, navigation}) => {
  const {service} = route.params;

  const handleDelete = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      await axios.delete(
        `https://kami-backend-5rs0.onrender.com/services/${service._id}`,
        {headers: {Authorization: `Bearer ${token}`}},
      );
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to delete service');
    }
  };

  return (
    <SafeAreaView style={Styles.container}>
      <View style={Styles.detailHeader}>
        <Text style={Styles.detailTitle}>Service Detail</Text>
        <Menu>
          <MenuTrigger>
            <Text style={Styles.menuTrigger}>⋮</Text>
          </MenuTrigger>
          <MenuOptions>
            <MenuOption
              onSelect={() => navigation.navigate('EditService', {service})}>
              <Text>Edit</Text>
            </MenuOption>
            <MenuOption
              onSelect={() => {
                Alert.alert(
                  'Warning',
                  'Are you sure you want to remove this service? This operation cannot be returned',
                  [
                    {text: 'CANCEL', style: 'cancel'},
                    {text: 'DELETE', onPress: handleDelete},
                  ],
                );
              }}>
              <Text style={{color: 'red'}}>Delete</Text>
            </MenuOption>
          </MenuOptions>
        </Menu>
      </View>
      <View style={Styles.detailContent}>
        <Text>Service name: {service.name}</Text>
        <Text>Price: {service.price.toLocaleString()} đ</Text>
        <Text>Creator: {service.createdBy}</Text>
        <Text>Time: {new Date(service.createdAt).toLocaleString()}</Text>
        <Text>
          Final update: {new Date(service.updatedAt).toLocaleString()}
        </Text>
      </View>
    </SafeAreaView>
  );
};
