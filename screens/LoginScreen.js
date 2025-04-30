// screens/LoginScreen.js
import React, { useContext, useState } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { StoreContext } from '../App';

const LoginScreen = ({ navigation }) => {
  const [currentUser] = useContext(StoreContext);
  const [userLogin, setUserLogin] = currentUser;
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [securePassword, setSecurePassword] = useState(true);

  const handleLogin = () => {
    setEmailError(!email);
    setPasswordError(!password);
    
    if (email && password) {
      // Demo login logic
      console.log('Login with:', email, password);
      // Thực tế sẽ kết nối API
      if (email === 'user@example.com' && password === 'password') {
        setUserLogin({ email });
        navigation.navigate('Home');
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          // Trong thực tế, hãy thay đường dẫn này bằng đường dẫn thực của bạn
          source={require('../assets/firebase.png')}
          style={styles.logo}
        />
        <Text style={styles.welcomeText}>Welcome back!</Text>
      </View>

      <TextInput
        label="Enter email"
        value={email}
        onChangeText={text => {
          setEmail(text);
          setEmailError(false);
        }}
        style={styles.input}
        mode="outlined"
        left={<TextInput.Icon icon="email" />}
        error={emailError}
      />
      {emailError && <Text style={styles.errorText}>Email is a required field</Text>}

      <TextInput
        label="Enter password"
        value={password}
        onChangeText={text => {
          setPassword(text);
          setPasswordError(false);
        }}
        secureTextEntry={securePassword}
        style={styles.input}
        mode="outlined"
        left={<TextInput.Icon icon="lock" />}
        right={
          <TextInput.Icon
            icon={securePassword ? 'eye' : 'eye-off'}
            onPress={() => setSecurePassword(!securePassword)}
          />
        }
        error={passwordError}
      />
      {passwordError && <Text style={styles.errorText}>Password is a required field</Text>}

      <Button
        mode="contained"
        onPress={handleLogin}
        style={styles.button}
        labelStyle={styles.buttonLabel}
      >
        Login
      </Button>

      <TouchableOpacity 
        onPress={() => navigation.navigate('Signup')}
        style={styles.linkContainer}
      >
        <Text style={styles.linkText}>Create a new account</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        onPress={() => navigation.navigate('ResetPassword')}
        style={styles.linkContainer}
      >
        <Text style={styles.linkText}>Forgot Password</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>
        Đây là trang đăng nhập của chúng ta (Firebase BackGround)
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 10,
    backgroundColor: '#FF5722',
    borderRadius: 40,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    marginLeft: 5,
  },
  button: {
    marginTop: 20,
    paddingVertical: 8,
    backgroundColor: '#FF8C00',
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  linkText: {
    color: '#1976D2',
    fontSize: 16,
  },
  footerText: {
    color: '#FF8C00',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 40,
  },
});

export default LoginScreen;