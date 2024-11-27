import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  SafeAreaView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Styles} from '../../style';

const SettingsScreen = ({navigation}) => {
  const handleLogout = async () => {
    try {
      // Clear stored token
      await AsyncStorage.removeItem('token');

      // Navigate back to login screen
      navigation.reset({
        index: 0,
        routes: [{name: 'Login'}],
      });
    } catch (error) {
      Alert.alert('Logout Error', 'Unable to logout. Please try again.');
    }
  };

  return (
    <SafeAreaView style={Styles.container}>
      <Text style={Styles.title}>Settings</Text>
      <TouchableOpacity style={Styles.logoutButton} onPress={handleLogout}>
        <Text style={Styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
export default SettingsScreen;
