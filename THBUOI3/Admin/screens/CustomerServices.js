import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { useTheme } from './ThemeContext';

const CustomerServices = () => {
  const navigation = useNavigation();
  const { themeColor } = useTheme();
  const [services, setServices] = useState([]);
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('services')
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot => {
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setServices(data);
        setFiltered(data);
      });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!search) setFiltered(services);
    else setFiltered(services.filter(s => s.name.toLowerCase().includes(search.toLowerCase())));
  }, [search, services]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Dịch vụ</Text>
      </View>
      <Image source={require('../assets/logolab3.png')} style={styles.logo} />
      <TextInput
        style={styles.search}
        placeholder="Tìm kiếm dịch vụ..."
        value={search}
        onChangeText={setSearch}
      />
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('CustomerServiceDetail', { serviceId: item.id })}>
            <View style={styles.serviceItem}>
              <Text style={styles.serviceName}>{item.name}</Text>
              <Text style={styles.servicePrice}>{item.price} ₫</Text>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingBottom: 80 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fafafa' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f06277',
    paddingTop: 40,
    paddingBottom: 16,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  headerText: { color: '#fff', fontSize: 22, fontWeight: 'bold', textAlign: 'center' },
  logo: { alignSelf: 'center', marginVertical: 20, width: 180, height: 60, resizeMode: 'contain' },
  search: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, margin: 16, backgroundColor: '#fff',
  },
  serviceItem: {
    backgroundColor: '#fff', borderRadius: 10, padding: 16, marginHorizontal: 16, marginBottom: 10,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderWidth: 1, borderColor: '#eee',
  },
  serviceName: { fontSize: 15, color: '#222', flex: 1, marginRight: 10 },
  servicePrice: { fontSize: 15, color: '#888', fontWeight: 'bold' },
});

export default CustomerServices; 