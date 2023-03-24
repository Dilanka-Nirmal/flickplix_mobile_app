/* eslint-disable prettier/prettier */
import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Loader from './src/Components/Animation/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LoginScreen from './src/Components/Account/LoginScreen';
import RegistrationScreen from './src/Components/Account/RegistrationScreen';
import ResetPasswordScreen from './src/Components/Account/ResetPasswordScreen';
import {MainNavigator} from './src/Navigation/AppNavigator/MainNavigator/MainNavigator';
import {TrendingDetails} from './src/Components/Home/Trending/Screen/TrendingDetails';
import {TvShowDetails} from './src/Components/Home/Discover/Component/TvShowDetails';
import { Booking } from './src/Components/Booking';

const Stack = createNativeStackNavigator();

export default function App() {
  const [initialRouteName, setInitialRouteName] = React.useState('');

  // Hide splash screen
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  // Check if user is logged in
  React.useEffect(() => {
    setTimeout(async () => {
      await authUser();
    }, 2000);
  }, []);

  // Authenticate user
  const authUser = async () => {
    try {
      let userData = await AsyncStorage.getItem('userData');
      if (userData) {
        userData = JSON.parse(userData);
        if (userData.loggedIn) {
          setInitialRouteName('MainNavigator');
        } else {
          setInitialRouteName('LoginScreen');
        }
      } else {
        setInitialRouteName('LoginScreen');
      }
    } catch (error) {
      setInitialRouteName('RegistrationScreen');
    }
  };

  return (
    <NavigationContainer>
      {!initialRouteName ? (
        <Loader visible={true} />
      ) : (
        <>
          <Stack.Navigator
            initialRouteName={initialRouteName}
            screenOptions={{headerShown: false}}>
            <Stack.Screen
              name="RegistrationScreen"
              component={RegistrationScreen}
            />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen
              name="ResetPasswordScreen"
              component={ResetPasswordScreen}
            />
            <Stack.Screen name="MainNavigator" component={MainNavigator} />
            <Stack.Screen name="TrendingDetails" component={TrendingDetails} />
            <Stack.Screen name="TvShowDetails" component={TvShowDetails} />
            <Stack.Screen name="Booking" component={Booking}/>
          </Stack.Navigator>
        </>
      )}
    </NavigationContainer>
  );
}
