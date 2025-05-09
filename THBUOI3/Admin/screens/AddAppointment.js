import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { Button } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';

const AddAppointment = ({ navigation }) => {
  const [customerId, setCustomerId] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [serviceId, setServiceId] = useState('');
  const [services, setServices] = useState([]);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      const snapshot = await firestore().collection('services').get();
      setServices(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    const fetchCustomers = async () => {
      const snapshot = await firestore().collection('customers').get();
      setCustomers(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchServices();
    fetchCustomers();
  }, []);

  const handleAdd = async () => {
    if (!customerId || !appointmentDate || !serviceId) return;
    const service = services.find(s => s.id === serviceId);
    const customer = customers.find(c => c.id === customerId);
    await firestore().collection('appointments').add({
      customerId,
      customerName: customer.name,
      appointmentDate,
      serviceName: service.name,
      status: 'pending',
      createdAt: firestore.FieldValue.serverTimestamp(),
    });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Khách hàng</Text>
      <Picker selectedValue={customerId} onValueChange={setCustomerId} style={styles.input}>
        <Picker.Item label="Chọn khách hàng" value="" />
        {customers.map(customer => (
          <Picker.Item key={customer.id} label={customer.name} value={customer.id} />
        ))}
      </Picker>
      <Text style={styles.label}>Ngày hẹn</Text>
      <TextInput style={styles.input} value={appointmentDate} onChangeText={setAppointmentDate} placeholder="YYYY-MM-DD" />
      <Text style={styles.label}>Dịch vụ</Text>
      <Picker selectedValue={serviceId} onValueChange={setServiceId} style={styles.input}>
        <Picker.Item label="Chọn dịch vụ" value="" />
        {services.map(service => (
          <Picker.Item key={service.id} label={service.name} value={service.id} />
        ))}
      </Picker>
      <Button title="Thêm lịch hẹn" onPress={handleAdd} mode="contained" style={styles.addButton}>
        Thêm lịch hẹn
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f5f5f5' },
  label: { marginTop: 12, fontWeight: 'bold' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 4, padding: 8, marginTop: 4, backgroundColor: '#fff' },
  addButton: { marginTop: 24 },
});

export default AddAppointment;
