import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);
  const navigation = useNavigation();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ email và mật khẩu!');
      return;
    }
    try {
      const userCredential = await auth().signInWithEmailAndPassword(email, password);
      const user = userCredential.user;

      // Kiểm tra role của user
      const userDoc = await firestore().collection('users').doc(user.uid).get();
      
      if (!userDoc.exists) {
        // Nếu chưa có document trong collection users, tạo mới với role là customer
        await firestore().collection('users').doc(user.uid).set({
          email: user.email,
          role: 'customer',
          createdAt: firestore.FieldValue.serverTimestamp(),
        });
        navigation.reset({
          index: 0,
          routes: [{ name: 'CustomerHome' }],
        });
        return;
      }

      const userData = userDoc.data();
      console.log('User data:', userData); // Debug log

      if (userData.role === 'admin') {
        // Nếu là admin, chuyển đến MainTab
        navigation.reset({
          index: 0,
          routes: [{ name: 'MainTab' }],
        });
      } else {
        // Nếu là customer hoặc không có role, chuyển đến CustomerHome
        navigation.reset({
          index: 0,
          routes: [{ name: 'CustomerHome' }],
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      switch (error.code) {
        case 'auth/invalid-email':
          Alert.alert('Lỗi', 'Email không hợp lệ');
          break;
        case 'auth/user-disabled':
          Alert.alert('Lỗi', 'Tài khoản đã bị vô hiệu hóa');
          break;
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          Alert.alert('Lỗi', 'Email hoặc mật khẩu không đúng');
          break;
        default:
          Alert.alert('Lỗi', 'Đã xảy ra lỗi khi đăng nhập');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#bdbdbd"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          placeholderTextColor="#bdbdbd"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={secureText}
        />
        <TouchableOpacity onPress={() => setSecureText(!secureText)}>
          <Icon name={secureText ? "visibility" : "visibility-off"} size={24} color="#bdbdbd" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <View style={styles.registerContainer}>
        <TouchableOpacity style={styles.buttonRegister} onPress={() => navigation.navigate('Register')}>
          <Text style={styles.buttonRegisterText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#f06277',
    marginBottom: 48,
  },
  input: {
    width: '100%',
    height: 56,
    backgroundColor: '#fafafd',
    borderRadius: 12,
    paddingHorizontal: 18,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    fontSize: 16,
    color: '#222',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 56,
    backgroundColor: '#fafafd',
    borderRadius: 12,
    paddingHorizontal: 18,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
    color: '#222',
  },
  button: {
    width: '100%',
    height: 56,
    backgroundColor: '#f06277',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  registerContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 16,
  },
  buttonRegister: {
    width: '100%',
    height: 56,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#f06277',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  buttonRegisterText: {
    color: '#f06277',
    fontWeight: 'bold',
    fontSize: 18,
  },
}); 