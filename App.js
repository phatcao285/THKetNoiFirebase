import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as PaperProvider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Customer Screens
import Services from './Customer/screens/Services';
import ServiceDetail from './Customer/screens/ServiceDetail';
import BookAppointment from './Customer/screens/BookAppointment';
import Appointments from './Customer/screens/Appointments';
import UpdateAppointment from './Customer/screens/UpdateAppointment';
import Profile from './Customer/screens/Profile';
import UpdateProfile from './Customer/screens/UpdateProfile';
import ChangePassword from './Customer/screens/ChangePassword';
import LoginScreen from './Customer/screens/LoginScreen';
import Register from './Customer/screens/Register';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Customer Tab Navigator
function CustomerMainTab() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#f06277',
        tabBarInactiveTintColor: '#666',
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Services"
        component={Services}
        options={{
          tabBarLabel: 'Dịch vụ',
          tabBarIcon: ({ color, size }) => (
            <Icon name="format-list-bulleted" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Appointments"
        component={Appointments}
        options={{
          tabBarLabel: 'Lịch hẹn',
          tabBarIcon: ({ color, size }) => (
            <Icon name="calendar" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Cá nhân',
          tabBarIcon: ({ color, size }) => (
            <Icon name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// Customer Stack Navigator
function CustomerStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f06277',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ title: 'Đăng ký' }}
      />
      <Stack.Screen
        name="CustomerMainTab"
        component={CustomerMainTab}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ServiceDetail"
        component={ServiceDetail}
        options={{ title: 'Chi tiết dịch vụ' }}
      />
      <Stack.Screen
        name="BookAppointment"
        component={BookAppointment}
        options={{ title: 'Đặt lịch' }}
      />
      <Stack.Screen
        name="UpdateAppointment"
        component={UpdateAppointment}
        options={{ title: 'Cập nhật lịch hẹn' }}
      />
      <Stack.Screen
        name="UpdateProfile"
        component={UpdateProfile}
        options={{ title: 'Cập nhật thông tin' }}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{ title: 'Đổi mật khẩu' }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <CustomerStackNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
} 