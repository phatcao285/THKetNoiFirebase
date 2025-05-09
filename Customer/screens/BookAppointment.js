import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Text, Button, TextInput } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useRoute, useNavigation } from '@react-navigation/native';

export default function BookAppointment() {
  const route = useRoute();
  const navigation = useNavigation();
  const { service } = route.params;
  const [date, setDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);

  const handleBook = async () => {
    setLoading(true);
    try {
      const user = auth().currentUser;
      if (!user) throw new Error('Bạn chưa đăng nhập!');
      await firestore().collection('appointments').add({
        userId: user.uid,
        serviceId: service.id,
        serviceName: service.name,
        servicePrice: service.price,
        date: date.toISOString(),
        note,
        status: 'pending',
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
      Alert.alert('Thành công', 'Đặt lịch thành công!');
      navigation.goBack();
    } catch (e) {
      Alert.alert('Lỗi', e.message || 'Đặt lịch thất bại!');
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đặt lịch cho dịch vụ: {service.name}</Text>
      <Button mode="outlined" onPress={() => setShowDate(true)} style={{ marginBottom: 16 }}>
        Chọn ngày: {date.toLocaleString()}
      </Button>
      {showDate && (
        <DateTimePicker
          value={date}
          mode="datetime"
          display="default"
          onChange={(_, selected) => {
            setShowDate(false);
            if (selected) setDate(selected);
          }}
        />
      )}
      <TextInput
        label="Ghi chú (tuỳ chọn)"
        value={note}
        onChangeText={setNote}
        style={{ marginBottom: 16 }}
      />
      <Button mode="contained" onPress={handleBook} loading={loading} disabled={loading}>
        Xác nhận đặt lịch
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  title: { fontSize: 20, fontWeight: 'bold', color: '#f06277', marginBottom: 16 },
}); 