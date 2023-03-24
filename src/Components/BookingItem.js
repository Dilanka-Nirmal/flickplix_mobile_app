/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import React from "react";
import { TextInput } from "react-native";
import { Button } from "react-native";
import {View,StyleSheet, Text } from "react-native";

const BookingItem = (props)=>{

    return (
      <View style={styles.container}>
        <Text style={styles.header}>Avatar</Text>
        <View>
          <Text style={styles.info}>Theatre Name :{props.theatreName} </Text>
        </View>
        <View>
          <Text style={styles.info}>Time :{props.time} </Text>
        </View>
        <View>
          <TextInput style={styles.info}>Tickets :{props.qty} </TextInput>
        </View>
        <View style={styles.btnContainer}>
        <View style={styles.edit}>
          <Button title="Edit" />
        </View>
        <View style={styles.delete}>
          <Button title="Delete" />
        </View></View>
      </View>
    );
};

export default BookingItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'grey',
    height: 280,
    padding: 10,
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  header: {
    fontSize: 30,
    textAlign: 'center',
    color: 'white',
  },
  info: {
    fontSize: 20,
    marginBottom: 10,
  },
  edit: {
    width: '100%',
    marginBottom: 20,
  },
  delete: {
    width: '100%',
    marginBottom: 20,
  },
});

