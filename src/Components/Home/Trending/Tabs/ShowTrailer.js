/* eslint-disable no-trailing-spaces */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable quotes */
/* eslint-disable keyword-spacing */
/* eslint-disable prettier/prettier */
import { StyleSheet, 
Text,
SafeAreaView,
View,
Pressable,
TextInput,
Button,
 } from 'react-native';
import { useEffect, useState } from "react";
import SelectDropdown from 'react-native-select-dropdown';
import {auth, db, getFirestore, collection, addDoc} from "./../../../../../firebase";
import {useNavigation} from '@react-navigation/native';

export const ShowTrailer = ({})=>{
  const times = ['10.30', '1.15', '4.15'];
  const theatres = ['Savoy','Majestic Cineplex','Liberty Cinema'];
  const [theatreName, setTheatreName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [qty, setQty] = useState("");
   const navigation = useNavigation();

  const addBooking = async ()=>{
    try{
      const docRef = await addDoc(collection(db,"Bookings"),{
        time: startTime ,
        theatreName: theatreName,
        qty: qty,
      });
      console.log("Document written with ID: ", docRef.id);
    }catch(e){
      console.error("Error adding document: ",e);
    }
  };

  return (
    <View>
      <View style={styles.time}>
        <Text style={styles.timename}>Theatre</Text>
        <SelectDropdown
          data={theatres}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);
            setTheatreName(selectedItem);
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            setTheatreName(item);
            return item;
          }}
        />
      </View>
      <View style={styles.time}>
        <Text style={styles.timename}>Time</Text>
        <SelectDropdown
          data={times}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);
            setStartTime(selectedItem);
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            setStartTime(item);
            return item;
          }}
        />
      </View>
      <TextInput
        placeholder="Enter quantity"
        style={styles.input}
        onChangeText={text => setQty(text)}
        value={qty}
       // onSubmitEditing={addBooking}
      />
      <Button
        onPress={() => {addBooking(); navigation.navigate('Booking');}}
        style={styles.btn}
        title="Book Now"
      />
      <Button
      title="View"
        onPress={()=>{navigation.navigate('Booking')}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#323232',
  },
  infoContainer: {
    flex: 1,
  },
  btn:{
    marginTop:40,
    marginLeft:20,
    marginRight:20,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 200,
    opacity: 0.5,
  },
  buttonContainer: {},
  timename:{
    color:'#fff',
    fontSize:20,
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    fontSize: 15,
    width: '80%',
    alignSelf: 'center',
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    marginBottom:20,
  },
  time: {
    width: '80%',
    marginRight: 20,
    marginLeft: 20,
    padding: 10,
    alignItems: 'center',
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
 