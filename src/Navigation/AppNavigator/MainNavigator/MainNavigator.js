/* eslint-disable prettier/prettier */
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Home} from '../../../Features/Home';
import {WatchList} from '../../../Features/WatchList';
import {Payment} from '../../../Features/Payment';
import {MoviePlan} from '../../../Features/MoviePlan';
import {Profile} from '../../../Features/Profile';

import React from 'react';

const Tab = createBottomTabNavigator();

export const MainNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'movie-open-plus';
            color = focused ? '#3f37c9' : '#BABBC3';
          } else if (route.name === 'WatchList') {
            iconName = 'filmstrip-box-multiple';
            color = focused ? '#3f37c9' : '#BABBC3';
          } else if (route.name === 'Payment') {
            iconName = 'credit-card-multiple';
            color = focused ? '#3f37c9' : '#BABBC3';
          } else if (route.name === 'Movie Plan') {
            iconName = 'cookie-clock';
            color = focused ? '#3f37c9' : '#BABBC3';
          } else if (route.name === 'Profile') {
            iconName = 'account-circle';
            color = focused ? '#3f37c9' : '#BABBC3';
          }

          return (
            <MaterialCommunityIcons name={iconName} size={size} color={color} />
          );
        },
        tabBarActiveTintColor: '#3f37c9',
        tabBarInactiveTintColor: '#BABBC3',
        tabBarStyle: {backgroundColor: '#fff'},
      })}>
      <Tab.Screen name="Home" component={Home} options={{headerShown: false}} />
      <Tab.Screen
        name="WatchList"
        component={WatchList}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Payment"
        component={Payment}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Movie Plan"
        component={MoviePlan}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
        }}
      />
     
    </Tab.Navigator>
  );
};
