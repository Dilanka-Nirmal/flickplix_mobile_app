/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, Button, ScrollView} from 'react-native';
import {db, collection, addDoc} from './../../../../../firebase';

export const ShowDetails = ({data}) => {
  const addTOWatchlist = async () => {
    try {
      const docRef = await addDoc(collection(db, 'WatchList'), {
        title: data.title,
        releasedIn: data.country,
        poster: data.poster,
      });
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  return (
    <ScrollView style={{height: 800}}>
      <View style={{marginVertical: 10, flexDirection: 'row'}}>
        <Text
          style={{
            color: '#A020F0',
            fontSize: 20,
            fontFamily: 'Lato_400Regular',
          }}>
          Title:{' '}
        </Text>
        <Text
          style={{
            color: 'white',
            fontSize: 20,
            fontFamily: 'Griffy_400Regular',
          }}>
          {data.title}
        </Text>
      </View>
      <View style={{marginVertical: 10, flexDirection: 'row'}}>
        <Text
          style={{
            color: '#A020F0',
            fontSize: 20,
            fontFamily: 'Lato_400Regular',
          }}>
          Released in:{' '}
        </Text>
        <Text
          style={{
            color: 'white',
            fontSize: 20,
            fontFamily: 'Griffy_400Regular',
          }}>
          {data.country}
        </Text>
      </View>
      <View style={{marginVertical: 10, flexDirection: 'row'}}>
        <Text
          style={{
            color: '#A020F0',
            fontSize: 20,
            fontFamily: 'Lato_400Regular',
          }}>
          Plot:{' '}
        </Text>
        <Text
          style={{
            color: 'white',
            fontSize: 20,
            fontFamily: 'Griffy_400Regular',
          }}>
          {data.overview}
        </Text>
      </View>
      <Button
        onPress={() => {
          addTOWatchlist();
        }}
        title="Add to watchList"
      />
    </ScrollView>
  );
};
