import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { Text, Card, Searchbar, Button } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';

export default function Services() {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('services')
      .orderBy('name')
      .onSnapshot(
        (snapshot) => {
          const servicesList = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setServices(servicesList);
          setFilteredServices(servicesList);
          setLoading(false);
        },
        (error) => {
          console.error(error);
          setLoading(false);
        }
      );

    return () => unsubscribe();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      const filtered = services.filter(service =>
        service.name.toLowerCase().includes(query.toLowerCase()) ||
        service.description.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredServices(filtered);
    } else {
      setFilteredServices(services);
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#f06277" />
      </View>
    );
  }

  if (services.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.emptyText}>Chưa có dịch vụ nào</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Tìm kiếm dịch vụ..."
        onChangeText={handleSearch}
        value={searchQuery}
        style={styles.searchBar}
      />

      <FlatList
        data={filteredServices}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={styles.card} onPress={() => navigation.navigate('ServiceDetail', { service: item })}>
            <Card.Content>
              <Text style={styles.serviceName}>{item.name}</Text>
              <Text style={styles.price}>{item.price.toLocaleString('vi-VN')}đ</Text>
              <Text style={styles.description} numberOfLines={2}>
                {item.description}
              </Text>
            </Card.Content>
            <Card.Actions>
              <Button
                mode="contained"
                onPress={() => navigation.navigate('ServiceDetail', { service: item })}
                style={styles.detailButton}
              >
                Chi tiết
              </Button>
              <Button
                mode="outlined"
                onPress={() => navigation.navigate('BookAppointment', { service: item })}
                style={styles.bookButton}
              >
                Đặt lịch
              </Button>
            </Card.Actions>
          </Card>
        )}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.centered}>
            <Text style={styles.emptyText}>Không tìm thấy dịch vụ phù hợp</Text>
          </View>
        }
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
  searchBar: {
    margin: 16,
    elevation: 2,
  },
  list: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
    elevation: 2,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    color: '#f06277',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  detailButton: {
    backgroundColor: '#f06277',
  },
  bookButton: {
    borderColor: '#f06277',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
}); 