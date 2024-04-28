import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Image, Button, Pressable, TextInput } from 'react-native';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useState } from 'react';
import Toast from 'react-native-toast-message';
import { saveMessagesToCache } from '../services/CachingService';
import { useEffect } from 'react';

const logo = require('./../assets/logo.png');

export default function LoginScreen({ navigation }) {
  const[userName, setUserName] = useState("");
  const[password, setPassword] = useState("");
  const[errors, setErrors] = useState({});


  useEffect(() => {
    console.log('LoginScreen mounted');
    saveMessagesToCache();
  }, []);

  const validateForm = () => {
    let errors = {};

    if(!userName) errors.userName = "Username is required";
    if(!password) errors.password = "Password is required";

    setErrors(errors);

    return Object.keys(errors).length === 0;
  }

  const { login } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <View style={styles.scrollView}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Image source={logo} style={styles.logo}/>
      </View>
    
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'start'}}>
        <Text style={styles.fieldText}>Username</Text>
        <TextInput style={styles.inputField} placeholder='example@mail.com' value={userName} onChangeText={text => setUserName(text)}/>
        {
          errors.username && <Text style={{color: 'red'}}>{errors.username}</Text>
        }
      </View>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'start', marginTop:10}}>
        <Text style={styles.fieldText}>Password</Text>
        <TextInput style={styles.inputField} placeholder='********' secureTextEntry={true} value={password} onChangeText={text => setPassword(text)}/>
        {
          errors.password && <Text style={{color: 'red'}}>{errors.password}</Text>
        }
      </View>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Pressable style={styles.loginBtn} onPress={() => login(userName, password)}>
          <Text style={styles.loginBtnText}>Log in</Text>
        </Pressable>
      </View>
        <StatusBar style="auto" />
      </View>
      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView:{
    width: '100%',
    height:400,
  },
  root: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText:{
    fontSize: 34,
    fontWeight: '700',
  },
  fieldText:{
    fontSize: 15,
    fontWeight: '400',
    color: '#8F8F8F',
  },
  loginBtn:{
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 32,
    width: '100%',
    borderRadius: 6,
    elevation: 4,
    backgroundColor: '#00B4DB',
  },
  loginBtnText:{
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
  },
  inputField:{
    height: 60,
    marginTop: 10,
    paddingLeft:10,
    backgroundColor: '#EDEEEC',
    borderRadius: 6,
  },
  logo:{
    width: 300,
    height: 73,
    marginBottom: 50,
  }
});
