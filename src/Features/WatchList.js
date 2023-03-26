import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {collection, db} from './../../firebase';
import {SafeAreaView} from 'react-native';
import {FlatList} from 'react-native';
import {WatchItem} from '../Components/WatchList/WatchItem';
import {query, onSnapshot} from 'firebase/firestore';
import COLORS from '../Components/Animation/Colors';

export const WatchList = () => {
  const [watchList, setWatchList] = useState([]);

  useEffect(() => {
    getWatchList();
  }, []);

  const getWatchList = () => {
    const q = query(collection(db, 'WatchList'));

    const unsubscribe = onSnapshot(q, querySnapshot => {
      const lists = [];

      querySnapshot.forEach(doc => {
        lists.push({id: doc.id, ...doc.data()});
      });

      setWatchList(lists);
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>To be Watch List</Text>
      </View>
      <FlatList
        data={watchList}
        renderItem={({item}) => (
          <WatchItem
            poster={item.poster}
            title={item.title}
            releasedIn={item.releasedIn}
            id={item.id}
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
    backgroundColor: COLORS.blue,
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
});
