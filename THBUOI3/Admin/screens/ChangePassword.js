import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import auth from '@react-native-firebase/auth';

const ChangePassword = ({ navigation }) => {
  const [password, setPassword] = useState('');
  const [saving, setSaving] = useState(false);

  const handleChangePassword = async () => {
    if (!password || password.length < 6) {
      Alert.alert('Lỗi', 'Mật khẩu phải từ 6 ký tự!');
      return;
    }
    setSaving(true);
    try {
      await auth().currentUser.updatePassword(password);
      Alert.alert('Thành công', 'Đã đổi mật khẩu!');
      navigation.goBack();
    } catch (e) {
      Alert.alert('Lỗi', 'Không thể đổi mật khẩu!');
    }
    setSaving(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đổi mật khẩu</Text>
      <Text style={styles.label}>Mật khẩu mới</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholder="Nhập mật khẩu mới"
      />
      <Button mode="contained" onPress={handleChangePassword} loading={saving} style={styles.button}>
        Đổi mật khẩu
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f5f5f5' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginTop: 40, marginBottom: 20 },
  label: { marginTop: 12, fontWeight: 'bold' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 4, padding: 8, marginTop: 4, backgroundColor: '#fff' },
  button: { marginTop: 24 },
});

export default ChangePassword;
