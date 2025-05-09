import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getFirestore, doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { getApp } from 'firebase/app';

const UpdateService = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { serviceId } = route.params;
  const db = getFirestore(getApp());

  const [serviceName, setServiceName] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    // Lấy dữ liệu dịch vụ hiện tại
    const fetchService = async () => {
      try {
        const docRef = doc(db, 'services', serviceId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setServiceName(data.name);
          setPrice(data.price);
        }
      } catch (e) {
        Alert.alert('Lỗi', 'Không thể tải dữ liệu!');
        navigation.goBack();
      }
    };
    fetchService();
  }, [serviceId]);

  const handleUpdate = async () => {
    if (!serviceName || !price) {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin!');
      return;
    }
    try {
      const docRef = doc(db, 'services', serviceId);
      await updateDoc(docRef, {
        name: serviceName,
        price: price,
        updatedAt: serverTimestamp(),
      });
      Alert.alert('Thành công', 'Đã cập nhật dịch vụ!');
      navigation.goBack();
    } catch (e) {
      Alert.alert('Lỗi', 'Không thể cập nhật dịch vụ!');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Service</Text>
        <View style={{ width: 40 }} />
      </View>
      {/* Form */}
      <View style={styles.form}>
        <Text style={styles.label}>Service name *</Text>
        <TextInput
          style={styles.input}
          placeholder="Input a service name"
          placeholderTextColor="#bdbdbd"
          value={serviceName}
          onChangeText={setServiceName}
        />
        <Text style={styles.label}>Price *</Text>
        <TextInput
          style={styles.input}
          placeholder="0"
          placeholderTextColor="#bdbdbd"
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.button} onPress={handleUpdate}>
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f06277',
    paddingTop: 40,
    paddingBottom: 16,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  backButton: {
    width: 40,
    alignItems: 'flex-start',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  form: {
    marginTop: 32,
    paddingHorizontal: 20,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
    color: '#222',
  },
  input: {
    width: '100%',
    height: 48,
    backgroundColor: '#f7f7fa',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#eee',
    fontSize: 16,
    color: '#222',
  },
  button: {
    width: '100%',
    height: 48,
    backgroundColor: '#f06277',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default UpdateService;
