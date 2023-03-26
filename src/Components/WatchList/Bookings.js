/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {collection, db, getDocs} from './../../firebase';
import {SafeAreaView} from 'react-native';
import {FlatList} from 'react-native';
import BookingItem from './BookingItem';
import {query, onSnapshot} from 'firebase/firestore';

export const Booking = () => {
  const [bookList, setBookList] = useState([]);

  // const getbookingList = async () => {
  //   const querySnapshot = await getDocs(collection(db, 'Bookings'));
  //   querySnapshot.forEach(doc => {
  //     //console.log(doc.id,doc.data());
  //     //setBookList({...doc.data()});
  //     setBookList({
  //       ...doc.data(),
  //       id: doc.id,
  //     });

  //     console.log(bookList);
  //   });
  // };

  const loadMoviePlanList = () => {
    const q = query(collection(db, 'Bookings'));

    const unsubscribe = onSnapshot(q, querySnapshot => {
      const lists = [];

      querySnapshot.forEach(doc => {
        lists.push({id: doc.id, ...doc.data()});
      });

      setBookList(lists);
    });
  };

  useEffect(() => {
    setTimeout(() => {
      loadMoviePlanList();
    }, 5000);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>My Bookings</Text>
      </View>

      {/* <BookingItem/> */}
      {/* {
  bookList.length > 0 ? ( */}
      <FlatList
        data={bookList}
        renderItem={({item}) => (
          <BookingItem
            theatreName={item.theatreName}
            time={item.time}
            qty={item.qty}
            id={item.id}
            loadMoviePlanList={loadMoviePlanList}
          />
        )}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#323232',
  },
  heading: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
    padding: 20,
  },
  infoContainer: {
    flex: 1,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 200,
    opacity: 0.5,
  },
  buttonContainer: {},
  input: {
    backgroundColor: '#fff',
    padding: 10,
    fontSize: 15,
    width: '100%',
    alignSelf: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#D8E9A8',
    padding: 10,
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 17,
    color: '#000',
  },
});
