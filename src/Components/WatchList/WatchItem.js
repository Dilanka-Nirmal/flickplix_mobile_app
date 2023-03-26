import React from 'react';
import {View, Image, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {deleteDoc, doc} from 'firebase/firestore';
import {db} from '../../../firebase';
import COLORS from '../Animation/Colors';

// const removeFromWatchList = id => {
//   const docRef = doc(db, 'WatchList', id);
//   deleteDoc(docRef)
//     .then(() => {
//       console.log('Document successfully deleted!');
//     })
//     .catch(error => {
//       console.error('Error removing document: ', error);
//     });
// };

export const WatchItem = props => {
  return (
    <View style={styles.container}>
      <View style={styles.ImageView}>
        <Image
          style={styles.ImageStyle}
          source={{uri: `https://simkl.in/posters/${props.poster}_m.jpg`}}
        />
      </View>
      <View style={styles.titleView}>
        <Text style={styles.titleStyle}>{props.title}</Text>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => removeFromWatchList(props.id)}>
            <Text style={styles.buttonText}>Remove</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginLeft: 35,
  },
  ImageView: {
    marginVertical: 10,
    marginHorizontal: 10,
    height: 300,
    width: 300,
    alignItems: 'center',
    justifyContents: 'center',
  },
  ImageStyle: {
    width: 300,
    height: 300,
  },
  titleView: {
    marginVertical: 10,
    maxWidth: 300,
    alignContent: 'center',
  },
  titleStyle: {
    fontFamily: 'Oswald_400Regular',
    marginLeft: 15,
    fontSize: 20,
    fontWeight: '500',
    color: '#000',
  },
  button: {
    backgroundColor: COLORS.red,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
