import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { Button } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';

const UpdateCustomer = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { customerId } = route.params;

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const doc = await firestore().collection('customers').doc(customerId).get();
        if (doc.exists) {
          const data = doc.data();
          setName(data.name || '');
          setPhone(data.phone || '');
          setEmail(data.email || '');
        } else {
          Alert.alert('Lỗi', 'Không tìm thấy khách hàng!');
          navigation.goBack();
        }
      } catch (e) {
        Alert.alert('Lỗi', 'Không thể tải dữ liệu!');
        navigation.goBack();
      } finally {
        setLoading(false);
      }
    };
    fetchCustomer();
  }, [customerId]);

  const handleUpdate = async () => {
    if (!name || !phone) {
      Alert.alert('Lỗi', 'Vui lòng nhập tên và số điện thoại!');
      return;
    }
    setSaving(true);
    try {
      await firestore().collection('customers').doc(customerId).update({
        name,
        phone,
        email,
        updatedAt: firestore.FieldValue.serverTimestamp(),
      });
      Alert.alert('Thành công', 'Đã cập nhật khách hàng!');
      navigation.goBack();
    } catch (e) {
      Alert.alert('Lỗi', 'Không thể cập nhật khách hàng!');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Đang tải dữ liệu...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cập nhật khách hàng</Text>
      <Text style={styles.label}>Tên khách hàng *</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />
      <Text style={styles.label}>Số điện thoại *</Text>
      <TextInput style={styles.input} value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" />
      <Button mode="contained" onPress={handleUpdate} loading={saving} style={styles.addButton}>
        Cập nhật khách hàng
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

export default UpdateCustomer; 