// screens/HomeScreen.js
import React, { useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button, Card, Title, Paragraph } from 'react-native-paper';
import { StoreContext } from '../App';

const HomeScreen = ({ navigation }) => {
  const [currentUser] = useContext(StoreContext);
  const [userLogin, setUserLogin] = currentUser;

  const handleLogout = () => {
    // Xử lý đăng xuất
    setUserLogin(null);
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>Đăng nhập thành công!</Title>
          <Paragraph style={styles.paragraph}>
            Chào mừng bạn đã đăng nhập vào ứng dụng.
            {userLogin && userLogin.email ? `\nEmail: ${userLogin.email}` : ''}
          </Paragraph>
        </Card.Content>
      </Card>

      <Button
        mode="contained"
        onPress={handleLogout}
        style={styles.button}
        icon="logout"
      >
        Đăng xuất
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  card: {
    marginBottom: 20,
    elevation: 4,
  },
  title: {
    textAlign: 'center',
    marginBottom: 10,
  },
  paragraph: {
    textAlign: 'center',
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
    paddingVertical: 8,
    backgroundColor: '#FF3B30',
  },
});

export default HomeScreen;