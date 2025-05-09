import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import { Text, Card, Button, ActivityIndicator, IconButton } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const user = auth().currentUser;
    if (!user) return;

    const unsubscribe = firestore()
      .collection('appointments')
      .where('userId', '==', user.uid)
      .orderBy('date', 'desc')
      .onSnapshot(
        (snapshot) => {
          const appointmentsList = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            date: doc.data().date?.toDate?.() || new Date(doc.data().date)
          }));
          setAppointments(appointmentsList);
          setLoading(false);
        },
        (error) => {
          console.error(error);
          setLoading(false);
        }
      );

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id) => {
    Alert.alert(
      'Xác nhận',
      'Bạn có chắc muốn huỷ lịch hẹn này?',
      [
        { text: 'Không', style: 'cancel' },
        {
          text: 'Có',
          onPress: async () => {
            try {
              await firestore().collection('appointments').doc(id).delete();
              Alert.alert('Thành công', 'Đã huỷ lịch hẹn!');
            } catch (error) {
              Alert.alert('Lỗi', 'Không thể huỷ lịch hẹn!');
            }
          }
        }
      ]
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#FFA500';
      case 'confirmed': return '#4CAF50';
      case 'cancelled': return '#F44336';
      default: return '#757575';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending': return 'Chờ xác nhận';
      case 'confirmed': return 'Đã xác nhận';
      case 'cancelled': return 'Đã huỷ';
      default: return status;
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#f06277" />
      </View>
    );
  }

  if (appointments.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.emptyText}>Bạn chưa có lịch hẹn nào</Text>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('Services')}
          style={styles.button}
        >
          Đặt lịch ngay
        </Button>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={appointments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Content>
              <View style={styles.headerRow}>
                <Text style={styles.serviceName}>{item.serviceName}</Text>
                <Text style={[styles.status, { color: getStatusColor(item.status) }]}>
                  {getStatusText(item.status)}
                </Text>
              </View>
              <Text style={styles.date}>
                {item.date.toLocaleString('vi-VN', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </Text>
              <Text style={styles.price}>{item.servicePrice.toLocaleString('vi-VN')}đ</Text>
              {item.note && <Text style={styles.note}>Ghi chú: {item.note}</Text>}
            </Card.Content>
            <Card.Actions>
              {item.status === 'pending' && (
                <>
                  <Button
                    mode="outlined"
                    onPress={() => navigation.navigate('UpdateAppointment', { appointment: item })}
                  >
                    Sửa
                  </Button>
                  <Button
                    mode="outlined"
                    textColor="#F44336"
                    onPress={() => handleDelete(item.id)}
                  >
                    Huỷ
                  </Button>
                </>
              )}
            </Card.Actions>
          </Card>
        )}
        contentContainerStyle={styles.list}
      />
    </View>
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
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
    textAlign: 'center',
  },
  button: {
    marginTop: 16,
  },
  list: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  status: {
    fontSize: 14,
    fontWeight: '500',
  },
  date: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    color: '#f06277',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  note: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
}); 