import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

export default function UpdateProfile() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const user = auth().currentUser;
    if (!user) return;

    const unsubscribe = firestore()
      .collection('users')
      .doc(user.uid)
      .onSnapshot(
        (doc) => {
          if (doc.exists) {
            const data = doc.data();
            setName(data.name || '');
            setPhone(data.phone || '');
            setAddress(data.address || '');
          }
          setLoading(false);
        },
        (error) => {
          console.error(error);
          setLoading(false);
        }
      );

    return () => unsubscribe();
  }, []);

  const handleUpdate = async () => {
    if (!name.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập họ tên!');
      return;
    }

    setSaving(true);
    try {
      const user = auth().currentUser;
      await firestore().collection('users').doc(user.uid).update({
        name: name.trim(),
        phone: phone.trim(),
        address: address.trim(),
        updatedAt: firestore.FieldValue.serverTimestamp(),
      });
      Alert.alert('Thành công', 'Cập nhật thông tin thành công!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể cập nhật thông tin!');
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <Text>Đang tải...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Cập nhật thông tin</Text>
        
        <TextInput
          label="Họ và tên"
          value={name}
          onChangeText={setName}
          style={styles.input}
          mode="outlined"
        />
        
        <TextInput
          label="Số điện thoại"
          value={phone}
          onChangeText={setPhone}
          style={styles.input}
          mode="outlined"
          keyboardType="phone-pad"
        />
        
        <TextInput
          label="Địa chỉ"
          value={address}
          onChangeText={setAddress}
          style={styles.input}
          mode="outlined"
          multiline
          numberOfLines={3}
        />

        <View style={styles.buttonContainer}>
          <Button
            mode="outlined"
            onPress={() => navigation.goBack()}
            style={[styles.button, styles.cancelButton]}
          >
            Huỷ
          </Button>
          
          <Button
            mode="contained"
            onPress={handleUpdate}
            loading={saving}
            disabled={saving}
            style={[styles.button, styles.saveButton]}
          >
            Lưu thay đổi
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f06277',
    marginBottom: 24,
  },
  input: {
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
  },
  cancelButton: {
    borderColor: '#f06277',
  },
  saveButton: {
    backgroundColor: '#f06277',
  },
}); 