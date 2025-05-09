import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { Button } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { useNavigation, useRoute } from '@react-navigation/native';

const UpdateAppointment = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { appointmentId } = route.params;

  const [customerName, setCustomerName] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [serviceId, setServiceId] = useState('');
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Lấy danh sách dịch vụ
        const serviceSnap = await firestore().collection('services').get();
        const serviceList = serviceSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setServices(serviceList);
        // Lấy thông tin lịch hẹn
        const doc = await firestore().collection('appointments').doc(appointmentId).get();
        if (doc.exists) {
          const data = doc.data();
          setCustomerName(data.customerName || '');
          setAppointmentDate(data.appointmentDate || '');
          // Tìm id dịch vụ theo tên dịch vụ
          const foundService = serviceList.find(s => s.name === data.serviceName);
          setServiceId(foundService ? foundService.id : '');
        } else {
          Alert.alert('Lỗi', 'Không tìm thấy lịch hẹn!');
          navigation.goBack();
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch appointment details');
        navigation.goBack();
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [appointmentId]);

  const handleUpdate = async () => {
    if (!customerName || !appointmentDate || !serviceId) {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin!');
      return;
    }
    try {
      const service = services.find(s => s.id === serviceId);
      await firestore().collection('appointments').doc(appointmentId).update({
        customerName,
        appointmentDate,
        serviceName: service.name,
        status: 'updated',
        updatedAt: firestore.FieldValue.serverTimestamp(),
      });
      Alert.alert('Thành công', 'Đã cập nhật lịch hẹn!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể cập nhật lịch hẹn!');
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
      <Text style={styles.title}>Cập nhật lịch hẹn</Text>
      <Text style={styles.label}>Tên khách hàng</Text>
      <TextInput
        style={styles.input}
        value={customerName}
        onChangeText={setCustomerName}
      />
      <Text style={styles.label}>Ngày hẹn</Text>
      <TextInput
        style={styles.input}
        value={appointmentDate}
        onChangeText={setAppointmentDate}
        placeholder="YYYY-MM-DD"
      />
      <Text style={styles.label}>Dịch vụ</Text>
      <Picker selectedValue={serviceId} onValueChange={setServiceId} style={styles.input}>
        <Picker.Item label="Chọn dịch vụ" value="" />
        {services.map(service => (
          <Picker.Item key={service.id} label={service.name} value={service.id} />
        ))}
      </Picker>
      <Button mode="contained" onPress={handleUpdate} style={styles.updateButton}>
        Cập nhật lịch hẹn
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f5f5f5' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginTop: 40, marginBottom: 20 },
  label: { marginTop: 12, fontWeight: 'bold' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 4, padding: 8, marginTop: 4, backgroundColor: '#fff' },
  updateButton: { marginTop: 24 },
});

export default UpdateAppointment; 