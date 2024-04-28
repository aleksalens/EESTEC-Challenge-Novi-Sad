import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Image, Button, Pressable, Dimensions, TextInput } from 'react-native';
import { useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';
import { useState } from 'react';
import { Linking } from 'react-native';
import { Menu, MenuOptions, MenuOption, MenuTrigger} from 'react-native-popup-menu';
import DocumentPicker from 'react-native-document-picker';
import axios from "axios";
import RNFS from 'react-native-fs';

export default function HomeScreen({ navigation }) {
  const { userId } = useContext(AuthContext);
  const[courseName, setcourseName] = useState("");
  const [fileUri, setFileUri] = useState(null); // State to store the file URI
  const [fileName, setfileName] = useState(null); // State to store the file URI
  const [fileType, setfileType] = useState(null); // State to store the file URI

  const addCourse = async () => {
    console.log('File URI:', fileUri); // Log the file URI
    const body = new FormData()
    const file = {
      uri: fileUri,
      name: fileName,
      type: fileType
    }
    body.append('file', file)
    const pdfBase64 = await RNFS.readFile(fileUri, 'base64');

    axios.post('https://worm-factual-fish.ngrok-free.app/PostPDF/2/Medicina')
    navigation.navigate("Home")
  }

  const pickFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });
      console.log(
        res[0].uri,
        res[0].type, // mime type
        res[0].name,
        res[0].size
      );
      setFileUri(res[0].uri); // Set the file URI in the state
      setfileName(res[0].name); // Set the file name in the state
      setfileType(res[0].type); // Set the file type in the state
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker
      } else {
        throw err;
      }
    }
  }

  return (
    <View style={styles.root}>
      <ScrollView style={styles.scrollView}  contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>

      <View style={styles.container}>

      <View style={styles.row}>
          <Text style={styles.title}>New course</Text>
      </View>

      <View style={{flex: 1, justifyContent: 'center', alignItems: 'start'}}>
        <Text style={styles.fieldText}>Course name</Text>
        <TextInput style={styles.inputField} placeholder='ex. History' value={courseName} onChangeText={text => setcourseName(text)}/>
      </View>
      
      <View style={styles.customMessageRow}>
        <Pressable style={styles.fileButton} onPress={pickFile}>
          <Text style={styles.fileButtonText}>Attach File</Text>
        </Pressable>
        <Text style={styles.fileNameText}>{fileName}</Text>
      </View>

        <View style={styles.customMessageRow}>
            <Pressable style={styles.customButton} onPress={() => 
                addCourse()}>
              <Text style={styles.customButtonText}>Add course</Text>   
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
    backgroundColor: '#fff',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 0,
    alignItems: 'left',
    justifyContent: 'center',
  },
  scrollView:{
    height: Dimensions.get('window').height,
    backgroundColor: 'white'
  },
  root: {
    flex: 1 
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
  fileButton: {
    width: 200,
    height: 60,
    margin: 10,
    marginBottom: 15,
    borderRadius: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
    marginLeft: 20,
    borderColor: '#00B4DB',
    borderWidth: 2,
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
    marginBottom: 10,
    width: '100%',
    marginLeft: 20,
  },
  courseButtonText: {
    color: "#00B4DB",
    fontSize: 30,
    fontWeight: '700',
  },
  customButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: '700',
  },
  fileButtonText: {
    color: "#00B4DB",
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
    marginTop: 10,
    marginBottom: 20
  },
  inputField:{
    height: 60,
    marginTop: 10,
    paddingLeft:10,
    backgroundColor: '#EDEEEC',
    borderRadius: 6,
  },
  fieldText:{
    marginTop: 30,
    fontSize: 15,
    fontWeight: '400',
    color: '#8F8F8F',
  },
  fileNameText:{
    fontSize: 15,
    fontWeight: '400',
    color: '#8F8F8F',
  }
});
