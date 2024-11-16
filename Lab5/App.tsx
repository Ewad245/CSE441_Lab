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
            <Stack.Screen name="EditService" component={EditServiceScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </MenuProvider>
    </SafeAreaProvider>
  );
}
