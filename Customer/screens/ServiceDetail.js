import React from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { Text, Card, Button, Divider } from 'react-native-paper';
import { useRoute, useNavigation } from '@react-navigation/native';

export default function ServiceDetail() {
  const route = useRoute();
  const navigation = useNavigation();
  const { service } = route.params;

  return (
    <ScrollView style={styles.container}>
      {service.image && (
        <Image
          source={{ uri: service.image }}
          style={styles.image}
          resizeMode="cover"
        />
      )}

      <View style={styles.content}>
        <Text style={styles.title}>{service.name}</Text>
        <Text style={styles.price}>{service.price.toLocaleString('vi-VN')}đ</Text>

        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Mô tả dịch vụ</Text>
            <Divider style={styles.divider} />
            <Text style={styles.description}>{service.description}</Text>
          </Card.Content>
        </Card>

        {service.duration && (
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.sectionTitle}>Thời gian thực hiện</Text>
              <Divider style={styles.divider} />
              <Text style={styles.duration}>{service.duration} phút</Text>
            </Card.Content>
          </Card>
        )}

        {service.notes && (
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.sectionTitle}>Lưu ý</Text>
              <Divider style={styles.divider} />
              <Text style={styles.notes}>{service.notes}</Text>
            </Card.Content>
          </Card>
        )}

        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('BookAppointment', { service })}
            style={styles.bookButton}
          >
            Đặt lịch ngay
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  image: {
    width: '100%',
    height: 200,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    color: '#f06277',
    fontWeight: 'bold',
    marginBottom: 24,
  },
  card: {
    marginBottom: 16,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  divider: {
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  duration: {
    fontSize: 16,
    color: '#666',
  },
  notes: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  buttonContainer: {
    marginTop: 8,
    marginBottom: 24,
  },
  bookButton: {
    backgroundColor: '#f06277',
    paddingVertical: 8,
  },
}); 