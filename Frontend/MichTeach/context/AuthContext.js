import React, { createContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Toast from 'react-native-toast-message';

export const AuthContext = createContext();
const BASE_URL = 'https://fe9b-77-243-22-101.ngrok.io';


export const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [userToken, setUserToken] = React.useState(null);
    const [userId, setUserId] = React.useState(1);

    const showToast = () => {
        Toast.show({
          type: 'error',
          text1: 'Wrong username or password',
        })};

    const login = async (userName, password) => {
        setIsLoading(true);


        console.log(userName);
        axios.post('https://worm-factual-fish.ngrok-free.app/api/UserContoller/login', {
            Email: userName,
            Password: password
        })
        .then((response) => {
            if(userName == "aana"){
                setUserId(1);
            }
            else if(userName == "ppera"){
                setUserId(2);
            }
            else if(userName == "jsmith"){
                setUserId(3);
            }
            else if(userName == "mgarcia"){
                setUserId(5);
            }
            setUserToken(response.data);
            AsyncStorage.setItem('userToken', response.data);
            //AsyncStorage.setItem('userId', jwt_decode(response.data).Id);
        })
        .catch((error) => {
            console.log(error.message);
            showToast();
        });

        // setUserToken("asdasdasdasdfasdfasdfs");
        // AsyncStorage.setItem('userToken', "asdasdasdasdfasdfasdfs");

        setIsLoading(false);
    }

    const logout = async () => {
        setIsLoading(true);
        setUserToken(null);
        await AsyncStorage.removeItem('userToken');
        setIsLoading(false);
    }

    const getUserToken = async () => {
        try{
            setIsLoading(true);
            let token = await AsyncStorage.getItem('userToken');
            setUserToken(token);
            setIsLoading(false);
        }
        catch(e){
            console.log(e);
        }
    }
    
    const getUserId = async () => {
        return userId;
    }

    useEffect(() => {
        getUserToken();
    }, [])

    return (
        <AuthContext.Provider value={{login, logout, isLoading, userToken, userId, getUserId}}>
        {children}
        </AuthContext.Provider>
    );
}