import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const Customer = () => {
  const navigation = useNavigation();
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('customers')
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot => {
        const customerList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setCustomers(customerList);
        setLoading(false);
      }, error => {
        setLoading(false);
      });
    return () => unsubscribe();
  }, []);

  const renderCustomer = ({ item }) => (
    <View style={styles.customerCard}>
      <Text style={styles.customerName}>{item.name}</Text>
      <Text style={styles.infoText}>SĐT: {item.phone}</Text>
      <Text style={styles.infoText}>Email: {item.email}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6 }}>
        <TouchableOpacity onPress={() => handleDeleteCustomer(item.id)}>
          <Icon name="delete" size={22} color="#f06277" style={{ marginRight: 16 }} />
        </TouchableOpacity>
        <View style={{ flex: 1 }} />
        <TouchableOpacity onPress={() => navigation.navigate('UpdateCustomer', { customerId: item.id })}>
          <Icon name="edit" size={22} color="#888" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const handleDeleteCustomer = (customerId) => {
    Alert.alert(
      'Xác nhận',
      'Bạn có chắc muốn xoá khách hàng này?',
      [
        { text: 'Huỷ', style: 'cancel' },
        {
          text: 'Xoá', style: 'destructive', onPress: async () => {
            try {
              await firestore().collection('customers').doc(customerId).delete();
            } catch (e) {
              Alert.alert('Lỗi', 'Không thể xoá khách hàng!');
            }
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>QUẢN LÝ KHÁCH HÀNG</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddCustomer')}>
          <Icon name="add" size={28} color="#fff" />
        </TouchableOpacity>
      </View>
      <Image source={require('../../assets/logolab3.png')} style={styles.logo} />
      {loading ? (
        <Text style={styles.loadingText}>Đang tải khách hàng...</Text>
      ) : customers.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Chưa có khách hàng nào</Text>
        </View>
      ) : (
        <FlatList
          data={customers}
          renderItem={renderCustomer}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
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
  logo: {
    alignSelf: 'center',
    marginVertical: 20,
    width: 180,
    height: 60,
    resizeMode: 'contain',
  },
  customerCard: {
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
  customerName: { fontWeight: 'bold', fontSize: 16, color: '#222' },
  infoText: { color: '#444', marginBottom: 2 },
  listContainer: { padding: 16 },
  loadingText: { textAlign: 'center', marginTop: 40, fontSize: 16, color: '#888' },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 60 },
  emptyText: { fontSize: 18, color: '#bbb', marginTop: 10 },
});

export default Customer; 