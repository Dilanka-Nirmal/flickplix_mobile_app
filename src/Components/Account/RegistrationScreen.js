import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Keyboard,
  ScrollView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Firebase imports
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../../../firebase';

// Custom imports
import COLORS from '../Animation/Colors';
import Button from '../Animation/Button';
import Input from '../Animation/Input';
import Loader from '../Animation/Loader';

// Registration Screen
const RegistrationScreen = ({navigation}) => {
  const [inputs, setInputs] = React.useState({
    email: '',
    fullname: '',
    phone: '',
    password: '',
  });
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  // Validate inputs
  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;

    if (!inputs.email) {
      handleError('Please input email', 'email');
      isValid = false;
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError('Please input a valid email', 'email');
      isValid = false;
    }

    if (!inputs.fullname) {
      handleError('Please input fullname', 'fullname');
      isValid = false;
    }

    if (!inputs.phone) {
      handleError('Please input phone number', 'phone');
      isValid = false;
    }

    if (!inputs.password) {
      handleError('Please input password', 'password');
      isValid = false;
    } else if (inputs.password.length < 5) {
      handleError('Min password length of 5', 'password');
      isValid = false;
    }

    if (isValid) {
      register();
    }
  };

  // Register user
  const register = () => {
    setLoading(true);
    createUserWithEmailAndPassword(auth, inputs.email, inputs.password)
      .then(async () => {
        setLoading(false);
        Alert.alert('Success', 'Registration Successful');
        
        navigation.navigate('LoginScreen');
      })
      .catch(error => {
        const errorMessage = error.message;
        setLoading(false);
        Alert.alert('Error', errorMessage);
      });
  };

  const handleOnchange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };
  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };
  return (
    <SafeAreaView style={{backgroundColor: COLORS.white, flex: 1}}>
      <Loader visible={loading} />
      <ScrollView
        contentContainerStyle={{paddingTop: 50, paddingHorizontal: 20}}>
        <Text style={{color: COLORS.black, fontSize: 40, fontWeight: 'bold'}}>
          Register
        </Text>
        <Text style={{color: COLORS.gray, fontSize: 18, marginVertical: 10}}>
          Enter Your Details to Register
        </Text>
        <View style={{marginVertical: 20}}>
          {/* Email input */}
          <Input
            onChangeText={text => handleOnchange(text, 'email')}
            onFocus={() => handleError(null, 'email')}
            iconName="email-outline"
            label="Email"
            placeholder="Enter your email address"
            error={errors.email}
            value={inputs.email}
          />
          {/* Fullname input */}
          <Input
            onChangeText={text => handleOnchange(text, 'fullname')}
            onFocus={() => handleError(null, 'fullname')}
            iconName="account-outline"
            label="Full Name"
            placeholder="Enter your full name"
            error={errors.fullname}
            value={inputs.fullname}
          />
          {/* Phone input */}
          <Input
            keyboardType="numeric"
            onChangeText={text => handleOnchange(text, 'phone')}
            onFocus={() => handleError(null, 'phone')}
            iconName="phone-outline"
            label="Phone Number"
            placeholder="Enter your phone no"
            error={errors.phone}
            value={inputs.phone}
          />
          {/* Password input */}
          <Input
            onChangeText={text => handleOnchange(text, 'password')}
            onFocus={() => handleError(null, 'password')}
            iconName="lock-outline"
            label="Password"
            placeholder="Enter your password"
            error={errors.password}
            password
            value={inputs.password}
          />
          {/* Register button */}
          <Button title="Register" onPress={validate} />
          {/* Login button */}
          <Text
            onPress={() => navigation.navigate('LoginScreen')}
            style={{
              paddingTop: 5,
              color: COLORS.black,
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: 16,
            }}>
            Already have an account? Login
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegistrationScreen;
