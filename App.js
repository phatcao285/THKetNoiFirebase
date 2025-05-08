import './firebaseConfig'; 
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './THBUOI3/screens/LoginScreen';
import RegisterScreen from './THBUOI3/screens/Register';
import MainTabNavigator from './THBUOI3/screens/MainTabNavigator';
import AddNewService from './THBUOI3/screens/AddNewService';
import ServiceDetail from './THBUOI3/screens/ServiceDetail';
import UpdateService from './THBUOI3/screens/UpdateService';
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="MainTab" component={MainTabNavigator} />
        <Stack.Screen name="AddNewService" component={AddNewService} />
        <Stack.Screen name="ServiceDetail" component={ServiceDetail} />
        <Stack.Screen name="UpdateService" component={UpdateService} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}