import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getFirestore, doc, getDoc, deleteDoc } from 'firebase/firestore';
import { getApp } from 'firebase/app';
import { Menu, Provider } from 'react-native-paper';

function formatDateTime(timestamp) {
  if (!timestamp) return '';
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp.seconds * 1000);
  return date.toLocaleString('en-GB'); // dd/mm/yyyy hh:mm:ss
}

const ServiceDetail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { serviceId } = route.params;
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const db = getFirestore(getApp());
  const [menuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const docRef = doc(db, 'services', serviceId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setService(docSnap.data());
        } else {
          Alert.alert('Lỗi', 'Không tìm thấy dịch vụ!');
          navigation.goBack();
        }
      } catch (e) {
        Alert.alert('Lỗi', 'Không thể tải dữ liệu!');
        navigation.goBack();
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [serviceId]);

  const handleDelete = async () => {
    setMenuVisible(false);
    Alert.alert(
      'Warning',
      'Are you sure you want to remove this service? This operation cannot be returned',
      [
        {
          text: 'DELETE',
          onPress: async () => {
            try {
              await deleteDoc(doc(db, 'services', serviceId));
              Alert.alert('Thành công', 'Đã xóa dịch vụ!');
              navigation.goBack();
            } catch (e) {
              Alert.alert('Lỗi', 'Không thể xóa dịch vụ!');
            }
          },
          style: 'destructive',
        },
        {
          text: 'CANCEL',
          style: 'cancel',
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#f06277" />
      </View>
    );
  }

  if (!service) return null;

  return (
    <Provider>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="arrow-back" size={28} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Service detail</Text>
          <Menu
            visible={menuVisible}
            onDismiss={() => setMenuVisible(false)}
            anchor={
              <TouchableOpacity onPress={() => setMenuVisible(true)}>
                <Icon name="more-vert" size={28} color="#fff" />
              </TouchableOpacity>
            }
          >
            <Menu.Item
              onPress={() => {
                setMenuVisible(false);
                navigation.navigate('UpdateService', { serviceId });
              }}
              title="Update"
              leadingIcon="pencil"
            />
            <Menu.Item
              onPress={handleDelete}
              title="Delete"
              leadingIcon="delete"
              titleStyle={{ color: 'red' }}
            />
          </Menu>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <Text>
            <Text style={styles.bold}>Service name: </Text>
            {service.name}
          </Text>
          <Text style={{ marginTop: 10 }}>
            <Text style={styles.bold}>Price: </Text>
            {service.price} ₫
          </Text>
          <Text style={{ marginTop: 10 }}>
            <Text style={styles.bold}>Creator: </Text>
            {service.creator || 'Unknown'}
          </Text>
          <Text style={{ marginTop: 10 }}>
            <Text style={styles.bold}>Time: </Text>
            {formatDateTime(service.createdAt)}
          </Text>
          <Text style={{ marginTop: 10 }}>
            <Text style={styles.bold}>Final update: </Text>
            {formatDateTime(service.updatedAt || service.createdAt)}
          </Text>
        </View>
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f06277',
    paddingTop: 40,
    paddingBottom: 16,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  backButton: {
    width: 40,
    alignItems: 'flex-start',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  content: {
    padding: 20,
  },
  bold: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ServiceDetail; 