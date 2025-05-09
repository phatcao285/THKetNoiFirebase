import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import Transaction from './Transaction';
import Customer from './Customer';
import Setting from './Setting';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'Transaction') iconName = 'attach-money';
          else if (route.name === 'Customer') iconName = 'people';
          else if (route.name === 'Setting') iconName = 'settings';
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#f06277',
        tabBarInactiveTintColor: '#aaa',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Transaction" component={Transaction} />
      <Tab.Screen name="Customer" component={Customer} />
      <Tab.Screen name="Setting" component={Setting} />
    </Tab.Navigator>
  );
}