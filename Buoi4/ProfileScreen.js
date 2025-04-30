import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text, Avatar, Card, Divider } from 'react-native-paper';
import CustomNavigationBar from './CustomNavigationBar';

function ProfileScreen({ navigation }) {
  return (
    <>
      <CustomNavigationBar navigation={navigation} route={{name: 'Profile'}} options={{title: 'Profile'}} />
      <View style={styles.container}>
        <Text style={styles.title}>Profile Screen</Text>
        <Card style={styles.card}>
          <Card.Content>
            <Avatar.Icon size={80} icon="account" style={styles.avatar} />
            <Text style={styles.userName}>User Name</Text>
            <Divider style={styles.divider} />
            <Text style={styles.info}>Email: user@example.com</Text>
            <Text style={styles.info}>Phone: +1234567890</Text>
          </Card.Content>
        </Card>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    marginVertical: 20,
    fontWeight: 'bold',
  },
  card: {
    width: '90%',
    padding: 10,
  },
  avatar: {
    marginBottom: 10,
    backgroundColor: '#673AB7',
    alignSelf: 'center',
  },
  userName: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 5,
  },
  divider: {
    marginVertical: 10,
  },
  info: {
    fontSize: 16,
    marginVertical: 5,
  },
});

export default ProfileScreen;