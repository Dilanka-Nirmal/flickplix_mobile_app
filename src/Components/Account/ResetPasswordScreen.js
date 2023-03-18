import React from 'react';
import {View, Text, SafeAreaView, Keyboard, Alert} from 'react-native';

// Firebase imports
import {sendPasswordResetEmail} from 'firebase/auth';
import {auth} from '../../../firebase';

// Custom imports
import COLORS from '../Animation/Colors';
import Button from '../Animation/Button';
import Input from '../Animation/Input';
import Loader from '../Animation/Loader';

// Reset Password Screen
const ResetPasswordScreen = ({navigation}) => {
  const [inputs, setInputs] = React.useState({email: ''});
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  // Validate inputs
  const validate = async () => {
    Keyboard.dismiss();
    let isValid = true;
    if (!inputs.email) {
      handleError('Please input email', 'email');
      isValid = false;
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError('Please input a valid email', 'email');
      isValid = false;
    }
    if (isValid) {
      reset();
    }
  };

  // Reset Password
  const reset = () => {
    setLoading(true);
    sendPasswordResetEmail(auth, inputs.email)
      .then(async () => {
        setLoading(false);
        Alert.alert('Success', 'Password Reset Successful, Check your email');
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
      <View style={{paddingTop: 50, paddingHorizontal: 20}}>
        <Text style={{color: COLORS.black, fontSize: 40, fontWeight: 'bold'}}>
          Reset
        </Text>
        <Text style={{color: COLORS.gray, fontSize: 18, marginVertical: 10}}>
          Enter Your Details to Reset The Password
        </Text>
        <View style={{marginVertical: 20}}>
          {/* Email Input */}
          <Input
            onChangeText={text => handleOnchange(text, 'email')}
            onFocus={() => handleError(null, 'email')}
            iconName="email-outline"
            label="Email"
            placeholder="Enter your email address"
            error={errors.email}
            value={inputs.email}
          />
          {/* Reset Password button */}
          <Button title="Reset Password" onPress={validate} />
          {/* Login button */}
          <Text
            onPress={() => navigation.navigate('RegistrationScreen')}
            style={{
              color: COLORS.black,
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: 16,
            }}>
            Don't have an account? Register
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ResetPasswordScreen;
