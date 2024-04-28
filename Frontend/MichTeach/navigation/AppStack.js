import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import NewCourseScreen from '../screens/NewCourseScreen';
import QuestionsScreen from '../screens/QuestionsScreen';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="NewCourse" component={NewCourseScreen} 
        options={{ 
          title: 'New Course',
          headerStyle: {
              backgroundColor: '#00B4DB',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold'
          } 
          }}/>
        <Stack.Screen name="Questions" component={QuestionsScreen} 
        options={{ 
          title: '',
          headerStyle: {
              backgroundColor: '#00B4DB',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold'
          } 
          }}/>
    </Stack.Navigator>
  );
};

export default AppStack;