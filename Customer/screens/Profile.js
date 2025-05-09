import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Text, Card, Button, Avatar, Divider } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const user = auth().currentUser;
    if (!user) return;

    const unsubscribe = firestore()
      .collection('users')
      .doc(user.uid)
      .onSnapshot(
        (doc) => {
          if (doc.exists) {
            setUserData({ id: doc.id, ...doc.data() });
          }
          setLoading(false);
        },
        (error) => {
          console.error(error);
          setLoading(false);
        }
      );

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await auth().signOut();
      navigation.reset({
        index: 0,
        routes: [{ name: 'RoleSelection' }],
      });
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể đăng xuất!');
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <Text>Đang tải...</Text>
      </View>
    );
  }

  if (!userData) {
    return (
      <View style={styles.centered}>
        <Text>Không tìm thấy thông tin người dùng</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Avatar.Text 
          size={80} 
          label={userData.name?.substring(0, 2).toUpperCase() || 'U'} 
          style={styles.avatar}
        />
        <Text style={styles.name}>{userData.name}</Text>
        <Text style={styles.email}>{userData.email}</Text>
      </View>

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.sectionTitle}>Thông tin cá nhân</Text>
          <Divider style={styles.divider} />
          
          <View style={styles.infoRow}>
            <Text style={styles.label}>Họ và tên:</Text>
            <Text style={styles.value}>{userData.name}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{userData.email}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.label}>Số điện thoại:</Text>
            <Text style={styles.value}>{userData.phone || 'Chưa cập nhật'}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.label}>Địa chỉ:</Text>
            <Text style={styles.value}>{userData.address || 'Chưa cập nhật'}</Text>
          </View>
        </Card.Content>
      </Card>

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('UpdateProfile')}
          style={styles.button}
        >
          Cập nhật thông tin
        </Button>
        
        <Button
          mode="outlined"
          onPress={() => navigation.navigate('ChangePassword')}
          style={styles.button}
        >
          Đổi mật khẩu
        </Button>
        
        <Button
          mode="outlined"
          onPress={handleLogout}
          style={[styles.button, styles.logoutButton]}
          textColor="#F44336"
        >
          Đăng xuất
        </Button>
      </View>
    </ScrollView>
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
  },
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  avatar: {
    backgroundColor: '#f06277',
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: '#666',
  },
  card: {
    margin: 16,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  divider: {
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  label: {
    flex: 1,
    fontSize: 16,
    color: '#666',
  },
  value: {
    flex: 2,
    fontSize: 16,
    color: '#333',
  },
  buttonContainer: {
    padding: 16,
  },
  button: {
    marginBottom: 12,
  },
  logoutButton: {
    borderColor: '#F44336',
  },
}); 