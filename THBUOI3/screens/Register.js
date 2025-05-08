import React, { useState } from "react";
import { Alert, View } from "react-native";
import { Button, HelperText, Text, TextInput } from "react-native-paper";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

const RegisterScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [hiddenPassword, setHiddenPassword] = useState(true);
  const [hiddenPasswordConfirm, setHiddenPasswordConfirm] = useState(true);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const hasErrorFullName = () => fullName === "";
  const hasErrorEmail = () => !email.includes("@");
  const hasErrorPassword = () => password.length < 6;
  const hasErrorPasswordConfirm = () => passwordConfirm !== password;

  const USERS = firestore().collection("USERS");

  const handleCreateAccount = () => {
    if (
      hasErrorFullName() ||
      hasErrorEmail() ||
      hasErrorPassword() ||
      hasErrorPasswordConfirm()
    ) {
      Alert.alert("Lỗi", "Vui lòng nhập đúng và đầy đủ thông tin!");
      return;
    }
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        USERS.doc(response.user.uid).set({
          fullName,
          email,
          phone,
          address,
          role: "customer",
          createdAt: firestore.FieldValue.serverTimestamp(),
        });
        Alert.alert("Thành công", "Đăng ký thành công!");
        navigation.navigate("Login");
      })
      .catch((e) => Alert.alert("Tài khoản đã tồn tại hoặc lỗi khác!"));
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Text
        style={{
          fontSize: 30,
          fontWeight: "bold",
          alignSelf: "center",
          color: "pink",
          marginTop: 50,
          marginBottom: 50,
        }}
      >
        Register New Account
      </Text>
      <TextInput
        label="Full Name"
        value={fullName}
        onChangeText={setFullName}
      />
      <HelperText type="error" visible={hasErrorFullName()}>
        Full name không được phép để trống
      </HelperText>
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <HelperText type="error" visible={hasErrorEmail()}>
        Địa chỉ email không hợp lệ
      </HelperText>
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={hiddenPassword}
        right={
          <TextInput.Icon
            icon="eye"
            onPress={() => setHiddenPassword(!hiddenPassword)}
          />
        }
      />
      <HelperText type="error" visible={hasErrorPassword()}>
        Password ít nhất 6 kí tự
      </HelperText>
      <TextInput
        label="Confirm Password"
        value={passwordConfirm}
        onChangeText={setPasswordConfirm}
        secureTextEntry={hiddenPasswordConfirm}
        right={
          <TextInput.Icon
            icon="eye"
            onPress={() => setHiddenPasswordConfirm(!hiddenPasswordConfirm)}
          />
        }
      />
      <HelperText type="error" visible={hasErrorPasswordConfirm()}>
        Confirm Password phải so khớp với password
      </HelperText>
      <TextInput
        label="Address"
        value={address}
        onChangeText={setAddress}
        style={{ marginBottom: 20 }}
      />
      <TextInput
        label="Phone"
        value={phone}
        onChangeText={setPhone}
        style={{ marginBottom: 20 }}
      />
      <Button mode="contained" onPress={handleCreateAccount}>
        Create New Account
      </Button>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <Text>Do you have an account? </Text>
        <Button onPress={() => navigation.navigate("Login")}>
          Login Account
        </Button>
      </View>
    </View>
  );
};

export default RegisterScreen;