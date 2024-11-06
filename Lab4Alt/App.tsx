import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Provider} from 'react-redux';
import {store} from './src/store/Store';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Contacts from './src/screens/Contacts';
import Favorites from './src/screens/Favorites';
import ProfileContact from './src/screens/ProfileContact';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const ContactStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="ContactList"
      component={Contacts}
      options={{
        title: 'Contacts',
        headerStyle: {
          backgroundColor: '#f5f5f5',
        },
      }}
    />
    <Stack.Screen
      name="Profile"
      component={ProfileContact}
      options={{
        title: 'Contact Profile',
        headerStyle: {
          backgroundColor: '#f5f5f5',
        },
      }}
    />
  </Stack.Navigator>
);

const FavoriteStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="FavoriteList"
      component={Favorites}
      options={{
        title: 'Favorites',
        headerStyle: {
          backgroundColor: '#f5f5f5',
        },
      }}
    />
    <Stack.Screen
      name="Profile"
      component={ProfileContact}
      options={{
        title: 'Contact Profile',
        headerStyle: {
          backgroundColor: '#f5f5f5',
        },
      }}
    />
  </Stack.Navigator>
);

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              let iconName: string = '';
              if (route.name === 'Contacts') {
                iconName = 'contacts';
              } else if (route.name === 'Favorites') {
                iconName = focused ? 'star' : 'star-border';
              }
              return <Icon name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#007AFF',
            tabBarInactiveTintColor: 'gray',
            headerShown: false,
          })}>
          <Tab.Screen name="Contacts" component={ContactStack} />
          <Tab.Screen name="Favorites" component={FavoriteStack} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
