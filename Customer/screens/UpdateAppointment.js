import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Text, Button, TextInput } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import firestore from '@react-native-firebase/firestore';
import { useRoute, useNavigation } from '@react-navigation/native';

export default function UpdateAppointment() {
  const route = useRoute();
  const navigation = useNavigation();
  const { appointment } = route.params;
  const [date, setDate] = useState(new Date(appointment.date));
  const [showDate, setShowDate] = useState(false);
  const [note, setNote] = useState(appointment.note || '');
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    if (date < new Date()) {
      Alert.alert('Lỗi', 'Không thể đặt lịch trong quá khứ!');
      return;
    }

    setLoading(true);
    try {
      await firestore().collection('appointments').doc(appointment.id).update({
        date: date.toISOString(),
        note,
        updatedAt: firestore.FieldValue.serverTimestamp(),
      });
      Alert.alert('Thành công', 'Cập nhật lịch hẹn thành công!');
      navigation.goBack();
    } catch (e) {
      Alert.alert('Lỗi', e.message || 'Cập nhật thất bại!');
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cập nhật lịch hẹn</Text>
      <Text style={styles.serviceName}>Dịch vụ: {appointment.serviceName}</Text>
      <Text style={styles.price}>Giá: {appointment.servicePrice.toLocaleString('vi-VN')}đ</Text>
      
      <Button 
        mode="outlined" 
        onPress={() => setShowDate(true)} 
        style={styles.dateButton}
      >
        Chọn ngày mới: {date.toLocaleString('vi-VN')}
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
        style={styles.input}
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
          loading={loading}
          disabled={loading}
          style={[styles.button, styles.updateButton]}
        >
          Cập nhật
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f06277',
    marginBottom: 16,
  },
  serviceName: {
    fontSize: 18,
    color: '#333',
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    color: '#f06277',
    fontWeight: 'bold',
    marginBottom: 24,
  },
  dateButton: {
    marginBottom: 16,
  },
  input: {
    marginBottom: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
  },
  cancelButton: {
    borderColor: '#f06277',
  },
  updateButton: {
    backgroundColor: '#f06277',
  },
}); 