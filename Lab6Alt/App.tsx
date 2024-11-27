import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {MenuProvider} from 'react-native-popup-menu';
import {LoginScreen} from './src/components/screens/Login';
import {AddServiceScreen} from './src/components/screens/AddServiceScreen';
import {ServiceDetailScreen} from './src/components/screens/ServiceDetailScreen';
import EditServiceScreen from './src/components/screens/EditServiceScreen';
import {MainTabs} from './src/navigation/MainTabs';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {Customer} from './src/components/screens/Customer';
import {AddCustomer} from './src/components/screens/AddCustomer';
import TransactionScreen from './src/components/screens/Transaction';
import TransactionDetailScreen from './src/components/screens/TransactionDetail';
import SettingsScreen from './src/components/screens/Settings';

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <MenuProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{headerShown: true}}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="MainTabs" component={MainTabs} />
            <Stack.Screen name="AddService" component={AddServiceScreen} />
            <Stack.Screen
              name="ServiceDetail"
              component={ServiceDetailScreen}
            />
            <Stack.Screen name="Customer" component={Customer} />
            <Stack.Screen name="AddCustomer" component={AddCustomer} />
            <Stack.Screen name="EditService" component={EditServiceScreen} />
            <Stack.Screen name="Transaction" component={TransactionScreen} />
            <Stack.Screen
              name="TransactionDetail"
              component={TransactionDetailScreen}
            />
            <Stack.Screen name="Settings" component={SettingsScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </MenuProvider>
    </SafeAreaProvider>
  );
}
