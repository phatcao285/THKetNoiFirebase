import { createContext, useContext, useMemo, useReducer } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native';

const MyContext = createContext();
MyContext.displayName = 'bvdbabv';

// Định nghĩa reducer
const reducer = (state, action) => {
  switch (action.type) {
    case 'USER_LOGIN':
      return { ...state, userLogin: action.value };
    case 'LOGOUT':
      return { ...state, userLogin: null };
    default:
      return new Error('Action not found');
  }
};

// Định nghĩa Provider
const MyContextControllerProvider = ({ children }) => {
  const initialState = {
    userLogin: null,
    services: [],
  };
  const [controller, dispatch] = useReducer(reducer, initialState);
  const value = useMemo(() => [controller, dispatch], [controller, dispatch]);
  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
};

// Hook sử dụng context
const useMyContextController = () => {
  const context = useContext(MyContext);
  if (!context) throw new Error('useMyContextController must be used within a MyContextControllerProvider');
  return context;
};

// Hàm logout
const logout = async (dispatch) => {
  try {
    await auth().signOut();
    dispatch({ type: 'LOGOUT' });
  } catch (e) {
    Alert.alert('Lỗi', 'Đăng xuất thất bại!');
  }
};

export {
  MyContextControllerProvider,
  useMyContextController,
  logout,
}; 