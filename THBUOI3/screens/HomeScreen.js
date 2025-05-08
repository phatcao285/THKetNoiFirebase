import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { getFirestore, collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { getApp } from 'firebase/app';

export default function HomeScreen() {
  const navigation = useNavigation();
  const [services, setServices] = useState([]);
  const db = getFirestore(getApp());

  useEffect(() => {
    const q = query(collection(db, 'services'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setServices(data);
    });
    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>HUYỀN TRINH</Text>
        <Icon name="account-circle" size={32} color="#fff" />
      </View>

      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/logolab3.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Service List Title */}
      <View style={styles.serviceHeader}>
        <Text style={styles.serviceTitle}>Danh sách dịch vụ</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddNewService')}>
          <Icon name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Service List */}
      <FlatList
        data={services}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('ServiceDetail', { serviceId: item.id })}
          >
            <View style={styles.serviceItem}>
              <Text style={styles.serviceName} numberOfLines={1}>{item.name}</Text>
              <Text style={styles.servicePrice}>{item.price} ₫</Text>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingBottom: 80 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fafafa' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f06277',
    paddingTop: 40,
    paddingBottom: 16,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  headerText: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  logoContainer: { alignItems: 'center', marginVertical: 10 },
  logo: { width: 180, height: 60 },
  serviceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 8,
    justifyContent: 'space-between',
  },
  serviceTitle: { fontSize: 16, fontWeight: 'bold', color: '#222' },
  addButton: {
    backgroundColor: '#f06277',
    borderRadius: 16,
    padding: 4,
  },
  serviceItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eee',
  },
  serviceName: { fontSize: 15, color: '#222', flex: 1, marginRight: 10 },
  servicePrice: { fontSize: 15, color: '#888', fontWeight: 'bold' },
});