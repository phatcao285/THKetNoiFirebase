import React from 'react';
import { View, StyleSheet } from 'react-native';
import { 
  DrawerContentScrollView
} from '@react-navigation/drawer';
import { 
  Text,
  List,
  Divider
} from 'react-native-paper';

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerHeader}>
        <Text style={styles.drawerHeaderText}>Admin</Text>
      </View>
      
      <List.Item
        title="Home"
        left={props => <List.Icon {...props} icon="home" />}
        style={styles.activeItem}
        titleStyle={styles.activeItemText}
        onPress={() => props.navigation.navigate('MainStack')}
      />
      
      <List.Item
        title="Profile"
        left={props => <List.Icon {...props} icon="account" />}
        onPress={() => props.navigation.navigate('Profile')}
      />
      
      <Divider style={styles.divider} />
      
      <List.Item
        title="Logout"
        left={props => <List.Icon {...props} icon="logout" />}
        onPress={() => console.log('Đăng xuất')}
      />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  drawerHeader: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  drawerHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  activeItem: {
    backgroundColor: '#EDE7F6',
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
  },
  activeItemText: {
    color: '#673AB7',
    fontWeight: 'bold',
  },
  divider: {
    marginVertical: 8,
  },
});

export default CustomDrawerContent;