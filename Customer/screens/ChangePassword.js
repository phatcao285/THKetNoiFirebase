import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigation = useNavigation();

  const validatePassword = (password) => {
    if (password.length < 6) {
      return 'Mật khẩu phải có ít nhất 6 ký tự';
    }
    return null;
  };

  const handleChangePassword = async () => {
    // Validate inputs
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin!');
      return;
    }

    const newPasswordError = validatePassword(newPassword);
    if (newPasswordError) {
      Alert.alert('Lỗi', newPasswordError);
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Lỗi', 'Mật khẩu mới không khớp!');
      return;
    }

    setLoading(true);
    try {
      const user = auth().currentUser;
      const credential = auth.EmailAuthProvider.credential(
        user.email,
        currentPassword
      );

      // Reauthenticate user
      await user.reauthenticateWithCredential(credential);
      
      // Change password
      await user.updatePassword(newPassword);
      
      Alert.alert(
        'Thành công',
        'Mật khẩu đã được thay đổi!',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack()
          }
        ]
      );
    } catch (error) {
      let errorMessage = 'Không thể thay đổi mật khẩu!';
      if (error.code === 'auth/wrong-password') {
        errorMessage = 'Mật khẩu hiện tại không đúng!';
      } else if (error.code === 'auth/requires-recent-login') {
        errorMessage = 'Vui lòng đăng nhập lại để thay đổi mật khẩu!';
      }
      Alert.alert('Lỗi', errorMessage);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đổi mật khẩu</Text>
      
      <TextInput
        label="Mật khẩu hiện tại"
        value={currentPassword}
        onChangeText={setCurrentPassword}
        secureTextEntry={!showCurrentPassword}
        style={styles.input}
        mode="outlined"
        right={
          <TextInput.Icon
            icon={showCurrentPassword ? 'eye-off' : 'eye'}
            onPress={() => setShowCurrentPassword(!showCurrentPassword)}
          />
        }
      />
      
      <TextInput
        label="Mật khẩu mới"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry={!showNewPassword}
        style={styles.input}
        mode="outlined"
        right={
          <TextInput.Icon
            icon={showNewPassword ? 'eye-off' : 'eye'}
            onPress={() => setShowNewPassword(!showNewPassword)}
          />
        }
      />
      
      <TextInput
        label="Xác nhận mật khẩu mới"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry={!showConfirmPassword}
        style={styles.input}
        mode="outlined"
        right={
          <TextInput.Icon
            icon={showConfirmPassword ? 'eye-off' : 'eye'}
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          />
        }
      />

      <View style={styles.buttonContainer}>
        <Button
          mode="outlined"
          onPress={() => navigation.goBack()}
          style={[styles.button, styles.cancelButton]}
        >
          Huỷ
        </Button>
        
        <Button
          mode="contained"
          onPress={handleChangePassword}
          loading={loading}
          disabled={loading}
          style={[styles.button, styles.saveButton]}
        >
          Đổi mật khẩu
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f06277',
    marginBottom: 24,
  },
  input: {
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
  },
  cancelButton: {
    borderColor: '#f06277',
  },
  saveButton: {
    backgroundColor: '#f06277',
  },
}); 