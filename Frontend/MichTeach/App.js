import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { AuthProvider } from './context/AuthContext';
import  AppNav from './navigation/AppNav';
import { MenuProvider } from 'react-native-popup-menu';


export default function App() {
  return (
    <AuthProvider>
        <MenuProvider>
          <AppNav/>
        </MenuProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
