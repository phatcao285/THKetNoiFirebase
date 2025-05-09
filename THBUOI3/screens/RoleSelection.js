import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const RoleSelection = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Chào mừng đến với Salon</Text>
        <Text style={styles.subtitle}>Vui lòng chọn vai trò của bạn</Text>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('CustomerLogin')}
          style={[styles.button, styles.customerButton]}
          labelStyle={styles.buttonLabel}
        >
          Đăng nhập với tư cách Khách hàng
        </Button>

        <Button
          mode="contained"
          onPress={() => navigation.navigate('AdminLogin')}
          style={[styles.button, styles.adminButton]}
          labelStyle={styles.buttonLabel}
        >
          Đăng nhập với tư cách Admin
        </Button>

        <Button
          mode="outlined"
          onPress={() => navigation.navigate('CustomerRegister')}
          style={[styles.button, styles.registerButton]}
          labelStyle={[styles.buttonLabel, styles.registerButtonLabel]}
        >
          Đăng ký tài khoản mới
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  buttonContainer: {
    paddingBottom: 40,
  },
  button: {
    marginVertical: 10,
    paddingVertical: 8,
    borderRadius: 8,
  },
  buttonLabel: {
    fontSize: 16,
    paddingVertical: 4,
  },
  customerButton: {
    backgroundColor: '#f06277',
  },
  adminButton: {
    backgroundColor: '#2196F3',
  },
  registerButton: {
    borderColor: '#f06277',
  },
  registerButtonLabel: {
    color: '#f06277',
  },
});

export default RoleSelection; 