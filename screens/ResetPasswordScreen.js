// screens/ResetPasswordScreen.js
import React, { useState } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

const ResetPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleResetPassword = () => {
    setEmailError(!email);
    
    if (email) {

      setIsProcessing(true);
      
      console.log('Sending reset password email to:', email);
      

      setTimeout(() => {
        setIsProcessing(false);
        alert('Hướng dẫn đặt lại mật khẩu đã được gửi đến email của bạn');
        navigation.navigate('Login');
      }, 2000);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image

          source={require('../assets/firebase.png')}
          style={styles.logo}
        />
        <Text style={styles.headerText}>Reset Password</Text>
      </View>

      <Text style={styles.instructionText}>
        Enter your email address and we'll send you instructions to reset your password.
      </Text>

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
        disabled={isProcessing}
      />
      {emailError && <Text style={styles.errorText}>Email is required</Text>}

      <Button
        mode="contained"
        onPress={handleResetPassword}
        style={styles.button}
        labelStyle={styles.buttonLabel}
        loading={isProcessing}
        disabled={isProcessing}
      >
        {isProcessing ? 'Sending...' : 'Send Reset Instructions'}
      </Button>

      <TouchableOpacity 
        onPress={() => navigation.navigate('Login')}
        style={styles.linkContainer}
        disabled={isProcessing}
      >
        <Text style={styles.linkText}>Back to Login</Text>
      </TouchableOpacity>
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
    marginBottom: 20,
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
    marginBottom: 10,
  },
  instructionText: {
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
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

export default ResetPasswordScreen;