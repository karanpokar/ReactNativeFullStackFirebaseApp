import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
//import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from '../src/Screens/LoginScreen';
import {NavigationContainer} from '@react-navigation/native';
import {connect, useSelector} from 'react-redux';
import {login} from './store/ConfigureStore';
import SplashScreen from './Screens/SplashScreen'
import Dashboard from './Screens/Dashboard';
import ForgotPassword from './Screens/ForgotPassword';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
const Stack = createStackNavigator();


const Index = () => {

  const token = useSelector(state => state.token);
  const [firstLogin, setFirstLogin] = useState(token == null ? true : false);
  
  useEffect(() => {
    setFirstLogin(token == null ? true : false);
  }, [token]);

  const getData = async () => {
    try {
      //      console.log('InsideuseEffect');
      const value = await AsyncStorage.getItem('uid');
      console.log('Value', value);
      if (value == null) {
        setFirstLogin(true);
        console.log('Key Not found');
      } else {
        setFirstLogin(false);
      }
    } catch (e) {
      setKey(true);
      // error reading value
    }
  };
  useEffect(() => {
    getData();
    //setFirstLogin(token ? false : true);
  }, []);
  //let Token = false;

  return (
    <NavigationContainer>
      {firstLogin == true ? (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
          }}>
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
          }}>
          
          <Stack.Screen name='Dashboard' component={Dashboard}/>
          
          
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default Index;
