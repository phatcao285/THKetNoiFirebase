import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Text, Button, Surface } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export default function RoleSelection() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Chào mừng đến với Beauty Salon</Text>
        <Text style={styles.subtitle}>Vui lòng chọn vai trò của bạn</Text>
      </View>

      <View style={styles.buttonContainer}>
        <Surface style={styles.card}>
          <Text style={styles.cardTitle}>Quản trị viên</Text>
          <Text style={styles.cardDescription}>
            Đăng nhập với tư cách quản trị viên để quản lý dịch vụ, lịch hẹn và khách hàng
          </Text>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('Login')}
            style={styles.button}
          >
            Đăng nhập
          </Button>
        </Surface>

        <Surface style={styles.card}>
          <Text style={styles.cardTitle}>Khách hàng</Text>
          <Text style={styles.cardDescription}>
            Đăng nhập với tư cách khách hàng để đặt lịch và quản lý lịch hẹn của bạn
          </Text>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('CustomerLogin')}
            style={styles.button}
          >
            Đăng nhập
          </Button>
        </Surface>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 40,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  buttonContainer: {
    gap: 20,
  },
  card: {
    padding: 20,
    borderRadius: 10,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    lineHeight: 20,
  },
  button: {
    backgroundColor: '#f06277',
  },
}); 