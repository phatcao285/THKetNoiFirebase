import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export default function CustomerHome() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chào mừng đến với ứng dụng Khách hàng!</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Services')}>
        <Text style={styles.buttonText}>Quản lý Dịch vụ</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Appointments')}>
        <Text style={styles.buttonText}>Quản lý Lịch hẹn</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Profile')}>
        <Text style={styles.buttonText}>Quản lý Hồ sơ</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 32,
    color: '#f06277',
    textAlign: 'center',
  },
  button: {
    width: '80%',
    backgroundColor: '#f06277',
    padding: 16,
    borderRadius: 10,
    marginVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
}); 