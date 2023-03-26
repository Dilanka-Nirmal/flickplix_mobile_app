/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import React,{useEffect, useState} from "react";
import { TextInput } from "react-native";
import { Button } from "react-native";
import {View,StyleSheet, Text } from "react-native";
import {db, doc, updateDoc, deleteDoc} from "../../firebase";

const BookingItem = (props)=>{

  //const [ticket, setTicket] = useState(props.qty);
  const updateConfirm = async()=>{
    const confirmRef = doc(db, 'Bookings', props.id);

    // Set the "capital" field of the city 'DC'
    await updateDoc(confirmRef, {
      confirm: confirm,
    });
  }

  const deleteMovie = async()=>{
    db.collection('Bookings')
      .doc(props.id)
      .delete()
      .then(() => {
        console.log('Document successfully deleted!');
      })
      .catch(error => {
        console.error('Error removing document: ', error);
      });
  }

  useEffect(()=>{
    updateConfirm();
  },[confirm]);

  const [confirm, setConfirm] = useState(false);

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
          <Text
            style={styles.info}
            //value={ticket}
            //onChangeText={(e)=>setTicket(e.target.value)}
          >
            Tickets :{props.qty}{' '}
          </Text>
        </View>
        <View style={styles.btnContainer}>
          <View style={styles.edit}>
            <Button title="Edit" />
          </View>

          <View>
            {confirm ? (
              <Button
                title="confirmed"
                onPress={() => setConfirm(!setConfirm)}
              />
            ) : (
              <Button
                title="Not confirmed yet"
                onPress={() => setConfirm(!setConfirm)}
              />
            )}
          </View>
          <View style={styles.delete}>
            <Button onPress={deleteMovie} title="Delete" />
          </View>
        </View>
      </View>
    );
};

export default BookingItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'grey',
    height: 300,
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
    marginBottom: 10,
  },
  delete: {
    width: '100%',
    marginBottom: 20,
    marginTop: 10,
  },
});

