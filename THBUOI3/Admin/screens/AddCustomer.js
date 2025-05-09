import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const AddCustomer = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    if (!name || !phone) {
      Alert.alert('Lỗi', 'Vui lòng nhập tên và số điện thoại!');
      return;
    }
    setLoading(true);
    try {
      await firestore().collection('customers').add({
        name,
        phone,
        email,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
      Alert.alert('Thành công', 'Đã thêm khách hàng!');
      navigation.goBack();
    } catch (e) {
      Alert.alert('Lỗi', 'Không thể thêm khách hàng!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thêm khách hàng</Text>
      <Text style={styles.label}>Tên khách hàng *</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />
      <Text style={styles.label}>Số điện thoại *</Text>
      <TextInput style={styles.input} value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" />
      <Button mode="contained" onPress={handleAdd} loading={loading} style={styles.addButton}>
        Thêm khách hàng
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f5f5f5' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginTop: 40, marginBottom: 20 },
  label: { marginTop: 12, fontWeight: 'bold' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 4, padding: 8, marginTop: 4, backgroundColor: '#fff' },
  addButton: { marginTop: 24 },
});

export default AddCustomer; 