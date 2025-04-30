import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import HomeScreen from './Buoi4/HomeScreen';
import DetailsScreen from './Buoi4/DetailsScreen';
import ProfileScreen from './Buoi4/ProfileScreen';
import CustomNavigationBar from './Buoi4/CustomNavigationBar';
import CustomDrawerContent from './Buoi4/CustomDrawerContent';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// Tùy chỉnh theme
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#673AB7',
    accent: '#9C27B0',
  },
};

// Stack Navigator cho phần chính
function MainStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        header: (props) => <CustomNavigationBar {...props} />,
      }}>
      <Stack.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ title: 'Home' }}
      />
      <Stack.Screen 
        name="Details" 
        component={DetailsScreen}
        options={{ title: 'Details' }}
      />
    </Stack.Navigator>
  );
}

// App component với Drawer Navigator
function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="MainStack"
          drawerContent={(props) => <CustomDrawerContent {...props} />}
          screenOptions={{
            headerShown: false,
            drawerStyle: {
              width: 240,
            },
          }}
        >
          <Drawer.Screen 
            name="MainStack" 
            component={MainStackNavigator} 
            options={{ title: 'Home' }}
          />
          <Drawer.Screen 
            name="Profile" 
            component={ProfileScreen} 
            options={{ title: 'Profile' }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;