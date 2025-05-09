import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { Button, Card, Title, Paragraph } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Transaction = () => {
  const navigation = useNavigation();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('appointments')
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot => {
        const appointmentList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setAppointments(appointmentList);
        setLoading(false);
      }, error => {
        console.error('Error fetching appointments:', error);
        setLoading(false);
      });

    return () => unsubscribe();
  }, []);

  const handleAcceptAppointment = async (appointmentId) => {
    try {
      await firestore()
        .collection('appointments')
        .doc(appointmentId)
        .update({
          status: 'accepted',
          updatedAt: firestore.FieldValue.serverTimestamp()
        });
      Alert.alert('Success', 'Appointment accepted successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to accept appointment');
    }
  };

  const handleUpdateAppointment = async (appointmentId, newDate) => {
    try {
      await firestore()
        .collection('appointments')
        .doc(appointmentId)
        .update({
          appointmentDate: newDate,
          status: 'updated',
          updatedAt: firestore.FieldValue.serverTimestamp()
        });
      Alert.alert('Success', 'Appointment updated successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to update appointment');
    }
  };

  const handleDeleteAppointment = (appointmentId) => {
    Alert.alert(
      'Xác nhận',
      'Bạn có chắc muốn xoá lịch hẹn này?',
      [
        { text: 'Huỷ', style: 'cancel' },
        {
          text: 'Xoá', style: 'destructive', onPress: async () => {
            try {
              await firestore().collection('appointments').doc(appointmentId).delete();
            } catch (e) {
              Alert.alert('Lỗi', 'Không thể xoá lịch hẹn!');
            }
          }
        }
      ]
    );
  };

  const renderAppointment = ({ item }) => (
    <View style={styles.appointmentCard}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
        <Icon name="event" size={22} color="#f06277" style={{ marginRight: 8 }} />
        <Text style={styles.serviceName}>{item.serviceName}</Text>
      </View>
      <Text style={styles.infoText}>Khách: {item.customerName}</Text>
      <Text style={styles.infoText}>
        Ngày: {
          typeof item.appointmentDate === 'object' && item.appointmentDate !== null && item.appointmentDate.seconds
            ? new Date(item.appointmentDate.seconds * 1000).toISOString().slice(0, 10)
            : item.appointmentDate
        }
      </Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6 }}>
        <TouchableOpacity onPress={() => handleDeleteAppointment(item.id)}>
          <Icon name="delete" size={22} color="#f06277" style={{ marginRight: 16 }} />
        </TouchableOpacity>
        <Text style={[styles.status, { color: item.status === 'pending' ? '#f06277' : '#4caf50' }]}>
          {item.status === 'pending' ? 'Chờ xác nhận' : 'Đã xác nhận'}
        </Text>
        <View style={{ flex: 1 }} />
        <TouchableOpacity onPress={() => navigation.navigate('UpdateAppointment', { appointmentId: item.id })}>
          <Icon name="edit" size={22} color="#888" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>QUẢN LÝ LỊCH HẸN</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddAppointment')}>
          <Icon name="add" size={28} color="#fff" />
        </TouchableOpacity>
      </View>
      <Image
        source={require('../../assets/logolab3.png')}
        style={styles.logo}
      />
      {loading ? (
        <Text style={styles.loadingText}>Đang tải lịch hẹn...</Text>
      ) : appointments.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Chưa có lịch hẹn nào</Text>
        </View>
      ) : (
        <FlatList
          data={appointments}
          renderItem={renderAppointment}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f06277',
    paddingTop: 40,
    paddingBottom: 16,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  headerText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  addButton: {
    backgroundColor: '#f06277',
    borderRadius: 20,
    padding: 6,
    marginLeft: 10,
  },
  appointmentCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  serviceName: { fontWeight: 'bold', fontSize: 16, color: '#222' },
  infoText: { color: '#444', marginBottom: 2 },
  status: { fontWeight: 'bold', fontSize: 14 },
  listContainer: {
    padding: 16,
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    color: '#888',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60,
  },
  emptyText: {
    fontSize: 18,
    color: '#bbb',
    marginTop: 10,
  },
  logo: {
    alignSelf: 'center',
    marginVertical: 20,
    width: 180,
    height: 60,
    resizeMode: 'contain',
  },
});

export default Transaction;