import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

export function saveMessagesToCache() {
    axios.get('https://worm-factual-fish.ngrok-free.app/api/EmergencyMessage/')
    .then((response) => {
        if(response.data.length > 0) {
            response.data.forEach((element) => {
                AsyncStorage.setItem(element.emergencyId + 'eng', element.eng);
                AsyncStorage.setItem(element.emergencyId + 'srb', element.srb);
                AsyncStorage.setItem(element.emergencyId + 'ger', element.ger);
                AsyncStorage.setItem(element.emergencyId + 'ita', element.ita);
                AsyncStorage.setItem(element.emergencyId + 'fra', element.fra);
            });
        }
    })
    .catch((error) => {
        console.log(error);
    });
}

export async function getMessageFromCache(messageId, languageCode) {
    let message = await AsyncStorage.getItem(messageId + languageCode);
    return message;
}