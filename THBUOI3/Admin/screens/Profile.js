import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import auth from '@react-native-firebase/auth';

const Profile = ({ navigation }) => {
  const user = auth().currentUser;
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [saving, setSaving] = useState(false);

  const handleUpdateProfile = async () => {
    setSaving(true);
    try {
      await user.updateProfile({ displayName });
      await auth().currentUser.reload();
      const updatedUser = auth().currentUser;
      setDisplayName(updatedUser.displayName || '');
      Alert.alert('Thành công', 'Đã cập nhật thông tin!');
    } catch (e) {
      Alert.alert('Lỗi', 'Không thể cập nhật thông tin!');
    }
    setSaving(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thông tin cá nhân</Text>
      <Text style={styles.label}>Tên hiển thị</Text>
      <TextInput style={styles.input} value={displayName} onChangeText={setDisplayName} />
      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} value={email} editable={false} />
      <Button mode="contained" onPress={handleUpdateProfile} loading={saving} style={styles.button}>
        Cập nhật thông tin
      </Button>
      <Button mode="outlined" onPress={() => navigation.navigate('ChangePassword')} style={styles.button}>
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

export default Profile;
