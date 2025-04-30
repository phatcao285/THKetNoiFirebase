// screens/CreateAccountScreen.js
import React, { useState } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, ScrollView } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

const CreateAccountScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  
  const [securePassword, setSecurePassword] = useState(true);
  const [secureConfirmPassword, setSecureConfirmPassword] = useState(true);

  const handleSignup = () => {
    // Reset errors
    setNameError(!fullName);
    setEmailError(!email);
    setPasswordError(!password);
    setConfirmPasswordError(!confirmPassword);
    
    // Check if passwords match
    if (password !== confirmPassword && password && confirmPassword) {
      setPasswordMatchError(true);
      return;
    } else {
      setPasswordMatchError(false);
    }

    if (fullName && email && password && confirmPassword && password === confirmPassword) {
      // Demo signup logic
      console.log('Creating account for:', fullName, email);
      // Thông báo đăng ký thành công và quay về Login
      alert('Đăng ký tài khoản thành công!');
      navigation.navigate('Login');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          // Trong thực tế, hãy thay đường dẫn này bằng đường dẫn thực của bạn
          source={require('../assets/firebase.png')}
          style={styles.logo}
        />
        <Text style={styles.headerText}>Create Account</Text>
      </View>

      <TextInput
        label="Full Name"
        value={fullName}
        onChangeText={text => {
          setFullName(text);
          setNameError(false);
        }}
        style={styles.input}
        mode="outlined"
        left={<TextInput.Icon icon="account" />}
        error={nameError}
      />
      {nameError && <Text style={styles.errorText}>Full Name is required</Text>}

      <TextInput
        label="Email"
        value={email}
        onChangeText={text => {
          setEmail(text);
          setEmailError(false);
        }}
        style={styles.input}
        mode="outlined"
        keyboardType="email-address"
        autoCapitalize="none"
        left={<TextInput.Icon icon="email" />}
        error={emailError}
      />
      {emailError && <Text style={styles.errorText}>Email is required</Text>}

      <TextInput
        label="Password"
        value={password}
        onChangeText={text => {
          setPassword(text);
          setPasswordError(false);
          if (confirmPassword) {
            setPasswordMatchError(text !== confirmPassword);
          }
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
        error={passwordError || passwordMatchError}
      />
      {passwordError && <Text style={styles.errorText}>Password is required</Text>}

      <TextInput
        label="Confirm Password"
        value={confirmPassword}
        onChangeText={text => {
          setConfirmPassword(text);
          setConfirmPasswordError(false);
          if (password) {
            setPasswordMatchError(password !== text);
          }
        }}
        secureTextEntry={secureConfirmPassword}
        style={styles.input}
        mode="outlined"
        left={<TextInput.Icon icon="lock-check" />}
        right={
          <TextInput.Icon
            icon={secureConfirmPassword ? 'eye' : 'eye-off'}
            onPress={() => setSecureConfirmPassword(!secureConfirmPassword)}
          />
        }
        error={confirmPasswordError || passwordMatchError}
      />
      {confirmPasswordError && <Text style={styles.errorText}>Confirm Password is required</Text>}
      {passwordMatchError && <Text style={styles.errorText}>Passwords do not match</Text>}

      <Button
        mode="contained"
        onPress={handleSignup}
        style={styles.button}
        labelStyle={styles.buttonLabel}
      >
        Sign Up
      </Button>

      <TouchableOpacity 
        onPress={() => navigation.navigate('Login')}
        style={styles.linkContainer}
      >
        <Text style={styles.linkText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
  headerText: {
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
});

export default CreateAccountScreen;