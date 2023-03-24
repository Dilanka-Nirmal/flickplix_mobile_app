/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import React from 'react';
import {TextInput} from 'react-native';
import {Button} from 'react-native';
import {View, StyleSheet,Image,Dimensions, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const WatchItem = props => {

    const navigation = useNavigation();

  return (
    <View>
      <View style={styles.ImageView}>
        {/* <TouchableOpacity
           onPress={() => navigation.navigate('TvShowDetails', {data: item})}> */}
        <Image
          style={styles.ImageStyle}
          source={{uri: `https://simkl.in/fanart/${props.fanart}_mobile.jpg`}}
        />
        {/* </TouchableOpacity> */}
      </View>
      <View style={styles.titleView}>
        <Text style={styles.titleStyle}>{props.title}</Text>
      </View>
    </View>
  );
};

export default WatchItem;

const styles = StyleSheet.create({
  container: {
    height: 700,
    maxHeight: 700,
    marginTop: 15,
  },
  headerView: {
    marginVertical: 10,
  },
  headerText: {
    fontFamily: 'Lato_400Regular',
    fontSize: 20,
    color: '#111',
    fontWeight: 'bold',
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  ImageView: {
    backgroundColor: '#fff',
    marginVertical: 10,
    marginHorizontal: 10,
    height: 400,
    width: 300,
    alignItems: 'center',
    justifyContents: 'center',
  },
  ImageStyle: {
    width: 300,
    height: 500,
  },
  titleView: {
    marginVertical: 10,
    maxWidth: 300,
  },
  titleStyle: {
    fontFamily: 'Oswald_400Regular',
    color: '#fff',
    marginLeft: 15,
  },
  lottie: {
    height: Dimensions.get('screen').width * 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lottieStyle: {
    height: 200,
    width: 200,
  },
});

