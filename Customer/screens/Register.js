import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, TextInput, Button, HelperText } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default function Register() {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Vui lòng nhập họ tên';
    if (!email.trim()) newErrors.email = 'Vui lòng nhập email';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email không hợp lệ';
    if (!phone.trim()) newErrors.phone = 'Vui lòng nhập số điện thoại';
    else if (!/^[0-9]{10}$/.test(phone)) newErrors.phone = 'Số điện thoại không hợp lệ';
    if (!address.trim()) newErrors.address = 'Vui lòng nhập địa chỉ';
    if (!password) newErrors.password = 'Vui lòng nhập mật khẩu';
    else if (password.length < 6) newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    if (password !== confirmPassword) newErrors.confirmPassword = 'Mật khẩu không khớp';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Kiểm tra xem email có phải là admin không
      if (email === 'phatc246@gmail.com') {
        setErrors({ email: 'Email này không được phép đăng ký tài khoản khách hàng' });
        setLoading(false);
        return;
      }

      // Tạo tài khoản với Firebase Auth
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      
      // Lưu thông tin người dùng vào Firestore
      await firestore().collection('users').doc(userCredential.user.uid).set({
        name,
        email,
        phone,
        address,
        role: 'customer',
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

      // Chuyển đến màn hình Customer
      navigation.reset({
        index: 0,
        routes: [{ name: 'CustomerMainTab' }],
      });
    } catch (error) {
      let errorMessage = 'Đã xảy ra lỗi khi đăng ký';
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'Email đã được sử dụng';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Email không hợp lệ';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Mật khẩu quá yếu';
      }
      setErrors({ submit: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Đăng ký tài khoản</Text>
        
        <TextInput
          label="Họ tên"
          value={name}
          onChangeText={setName}
          style={styles.input}
          error={!!errors.name}
        />
        <HelperText type="error" visible={!!errors.name}>
          {errors.name}
        </HelperText>

        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
          error={!!errors.email}
        />
        <HelperText type="error" visible={!!errors.email}>
          {errors.email}
        </HelperText>

        <TextInput
          label="Số điện thoại"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          style={styles.input}
          error={!!errors.phone}
        />
        <HelperText type="error" visible={!!errors.phone}>
          {errors.phone}
        </HelperText>

        <TextInput
          label="Địa chỉ"
          value={address}
          onChangeText={setAddress}
          style={styles.input}
          error={!!errors.address}
        />
        <HelperText type="error" visible={!!errors.address}>
          {errors.address}
        </HelperText>

        <TextInput
          label="Mật khẩu"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
          error={!!errors.password}
        />
        <HelperText type="error" visible={!!errors.password}>
          {errors.password}
        </HelperText>

        <TextInput
          label="Xác nhận mật khẩu"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          style={styles.input}
          error={!!errors.confirmPassword}
        />
        <HelperText type="error" visible={!!errors.confirmPassword}>
          {errors.confirmPassword}
        </HelperText>

        {errors.submit && (
          <HelperText type="error" visible={true}>
            {errors.submit}
          </HelperText>
        )}

        <Button
          mode="contained"
          onPress={handleRegister}
          loading={loading}
          disabled={loading}
          style={styles.button}
        >
          Đăng ký
        </Button>

        <Button
          mode="text"
          onPress={() => navigation.navigate('CustomerLogin')}
          style={styles.linkButton}
        >
          Đã có tài khoản? Đăng nhập
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    marginBottom: 4,
    backgroundColor: '#fff',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#f06277',
  },
  linkButton: {
    marginTop: 10,
  },
}); 