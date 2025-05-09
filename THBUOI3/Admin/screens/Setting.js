import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from './ThemeContext';

const SETTINGS = [
  {
    key: 'profile',
    title: 'Thông tin cá nhân',
    icon: 'person',
    action: 'profile',
  },
  {
    key: 'theme',
    title: 'Đổi màu giao diện',
    icon: 'color-lens',
    action: 'theme',
  },
  {
    key: 'logout',
    title: 'Đăng xuất',
    icon: 'logout',
    action: 'logout',
  },
];

const themes = [
  { key: 'pink', name: 'Hồng', color: '#f06277' },
  { key: 'purple', name: 'Tím', color: '#7c4dff' },
  { key: 'blue', name: 'Xanh', color: '#2196f3' },
];

const Setting = () => {
  const navigation = useNavigation();
  const { themeColor, setThemeColor } = useTheme();
  const [showTheme, setShowTheme] = useState(false);

  const handlePress = (action) => {
    if (action === 'logout') {
      Alert.alert('Xác nhận', 'Bạn có chắc muốn đăng xuất?', [
        { text: 'Huỷ', style: 'cancel' },
        {
          text: 'Đăng xuất',
          style: 'destructive',
          onPress: async () => {
            await auth().signOut();
            navigation.replace('Login');
          },
        },
      ]);
    } else if (action === 'profile') {
      navigation.navigate('Profile');
    } else if (action === 'theme') {
      setShowTheme(!showTheme);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: '#f5f5f5' }]}>
      <FlatList
        data={SETTINGS}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={() => handlePress(item.action)}>
            <Icon name={item.icon} size={28} color={themeColor} style={{ marginRight: 16 }} />
            <Text style={styles.title}>{item.title}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.key}
        ListFooterComponent={
          showTheme && (
            <View style={styles.themeContainer}>
              <Text style={styles.themeTitle}>Chọn màu giao diện:</Text>
              <View style={styles.themeRow}>
                {themes.map(t => (
                  <TouchableOpacity
                    key={t.key}
                    style={[styles.themeCircle, { backgroundColor: t.color, borderWidth: themeColor === t.color ? 2 : 0 }]}
                    onPress={() => setThemeColor(t.color)}
                  />
                ))}
              </View>
              <Text style={{marginTop:10, color:'#888', fontSize:13}}>
                Áp dụng theme
              </Text>
            </View>
          )
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 40 },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  title: { fontSize: 18, color: '#222' },
  themeContainer: { padding: 20, backgroundColor: '#fff' },
  themeTitle: { fontWeight: 'bold', marginBottom: 10 },
  themeRow: { flexDirection: 'row', marginTop: 10 },
  themeCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 16,
    borderColor: '#222',
  },
});

export default Setting; 