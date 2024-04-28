import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Image, Button, Pressable, Dimensions, TextInput } from 'react-native';
import { useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';
import { useState } from 'react';
import { Linking } from 'react-native';
import { Menu, MenuOptions, MenuOption, MenuTrigger} from 'react-native-popup-menu';


// const userIcon = require('./../assets/userIcon.png');
// const logoImg = require('./../assets/logo.png');
const logoIcon = require('./../assets/logoWhite.png');
const menuIcon = require('./../assets/menu.png');


export default function HomeScreen({ route, navigation }) {
  const { userId } = useContext(AuthContext);
  const[customMessage, setCustomMessage] = useState("");

  latitude = 44.7723685;
  longitude = 20.4752970;
  countryCode = 'srb';
  firstName = 'John Smith';
  country = 'USA';
  messageReceiver = '+381611849518';

  useEffect(() => {
    getLocation();
  }, []);

  const { logout } = useContext(AuthContext);


  const sendSms = async (number, message) => {
    const isAvailable = await SMS.isAvailableAsync();
    if (isAvailable) {
      const { result } = await SMS.sendSMSAsync([number], message);
    } else {
      // misfortune... there's no SMS available on this device
    }
  }

  const sendCustomSms = async (message, longitude, latitude) => {
    console.log('Sending custom message...' + message + longitude + latitude);
    msg = await translateCustomMessage(message, longitude, latitude);
    console.log(msg.data.broj + ' ' + msg.data.poruka + ' ' + getGoogleLink(latitude, longitude));
    await SMS.sendSMSAsync(msg.data.broj, msg.data.poruka + ' ' + getGoogleLink(latitude, longitude));
  }

  const getGoogleLink = (latitude, longitude) => {
    return 'https://www.google.com/maps/search/?api=1&query=' + latitude + ',' + longitude;
  }

  const getLocation = () => {
    console.log('Getting location...');
    // GetLocation.getCurrentPosition({
    //   enableHighAccuracy: true,
    //   timeout: 15000,
    // })
    // .then(location => {
    //   console.log(location);
    // })
    // .catch(error => {
    //   const { code, message } = error;
    //   console.warn(code, message);
    // });
  }

  return (
    <View style={styles.root}>
      <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} style={styles.scrollView}>

      <View style={styles.container}>


        <View style={styles.row}>
          <Text style={styles.title}>{route.params.course} questions</Text>
        </View>
        
        <View style={styles.customMessageRow}>
          <Pressable style={styles.courseButton} onPress={() => sendCustomSms(customMessage, longitude, latitude)}>
            <View style={styles.verticalButtonLine}></View>
            <Text style={styles.courseButtonText}>1. What is the name of the tallest mountain in the world?</Text>
          </Pressable>
        </View>
        <View style={styles.customMessageRow}>
          <Pressable style={styles.courseButton} onPress={() => sendCustomSms(customMessage, longitude, latitude)}>
            <View style={styles.verticalButtonLine}></View>
            <Text style={styles.courseButtonText}>2. What are the names of the seven continents of the world?</Text>
          </Pressable>
        </View>
        <View style={styles.customMessageRow}>
          <Pressable style={styles.courseButton} onPress={() => sendCustomSms(customMessage, longitude, latitude)}>
            <View style={styles.verticalButtonLine}></View>
            <Text style={styles.courseButtonText}>3. What is the name of the river that flows through the Brazilian rainforest?</Text>
          </Pressable>
        </View>
        <View style={styles.customMessageRow}>
          <Pressable style={styles.courseButton} onPress={() => sendCustomSms(customMessage, longitude, latitude)}>
            <View style={styles.verticalButtonLine}></View>
            <Text style={styles.courseButtonText}>3. What is the name of the river that flows through the Brazilian rainforest?</Text>
          </Pressable>
        </View>
        <View style={styles.customMessageRow}>
          <Pressable style={styles.courseButton} onPress={() => sendCustomSms(customMessage, longitude, latitude)}>
            <View style={styles.verticalButtonLine}></View>
            <Text style={styles.courseButtonText}>3. What is the name of the river that flows through the Brazilian rainforest?</Text>
          </Pressable>
        </View>
        <View style={styles.customMessageRow}>
          <Pressable style={styles.courseButton} onPress={() => sendCustomSms(customMessage, longitude, latitude)}>
            <View style={styles.verticalButtonLine}></View>
            <Text style={styles.courseButtonText}>3. What is the name of the river that flows through the Brazilian rainforest?</Text>
          </Pressable>
        </View>
      </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#EEECEA',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 0,
    alignItems: 'left',
    justifyContent: 'center',
  },
  scrollView:{
    width: '100%',
    height: Dimensions.get('window').height,
    backgroundColor: '#EEECEA'
  },
  root: {
    width: '100%'
  },
  row: {
    flexDirection: 'row',
  },
  customButton: {
    width: 200,
    height: 60,
    margin: 10,
    marginBottom: 5,
    borderRadius: 10,
    backgroundColor: '#00B4DB',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
    width: '100%',
    marginLeft: 20,
  },
  courseButton:{
    width: 200,
    height: 120,
    margin: 10,
    marginBottom: 5,
    justifyContent: 'center',
    borderRadius: 25,
    backgroundColor: '#fff',
    paddingLeft: 30,
    paddingRight: 10,
    marginBottom: 10,
    width: '100%',
    marginLeft: 20,
  },
  courseButtonText: {
    color: "#00B4DB",
    fontSize: 18,
    fontWeight: '700',
  },
  customButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: '700',
  },
  courseSubtitle: {
    fontSize: 14,
    fontWeight: '400',
    color: '#8F8F8F'
  },
  verticalButtonLine: {
    width: 5,
    marginTop: 20,
    height: 80,
    backgroundColor: '#00B4DB',
    position: 'absolute',
    left: 10,
    top: 0,
    borderRadius: 25,
  },
  button: {
    width: 100,
    height: 100,
    margin: 10,
    marginBottom: 5,
    borderRadius: 10,
    backgroundColor: '#00B4DB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    margin: 10,
    fontSize: 40,
    fontWeight: '700',
    marginBottom: 20,
    color: '#00B4DB',
  },
  buttonWrapper: {
    alignItems: 'center',
  },
  icon: {
    width: 70,
    height: 70,
  },
  header:{
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    backgroundColor: '#00B4DB',
    color: 'white',
    paddingLeft: 25,
    paddingRight: 25,
    paddingBottom: 20,
    paddingTop: 20,
  },
  headerText:{
    color: 'white',
    fontSize: 24,
  },
  logoIcon: {
    width: 200,
    height: 40
  },
  menuIcon: {
    width: 30,
    height: 30
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '700',
  },
  inputField: {
    height: 60,
    width: '100%',
    marginLeft:10,
    marginTop: 30,
    marginBottom: 10,
    paddingLeft:10,
    backgroundColor: '#EDEEEC',
    borderRadius: 6,
  },
  customMessageRow: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
