import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useState} from 'react';
import axios from 'axios';
import Styles from './Style';
const LoginScreen = () => {
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (phoneParam, passwordParam) => {
    const data = {
      phone: phoneParam,
      password: passwordParam,
    };
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://kami-backend-5rs0.onrender.com/auth',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    try {
      const response = await axios(config);
      setResponseData(responseData);
      console.log(responseData);
      Alert.alert('Success');
    } catch (err) {
      setError(err);
      console.error('Error: ', err);
      Alert.alert('Failed');
    }
  };
  return (
    <ScrollView shows VerticalScrollIndicator={false}>
      <View style={Styles.container}>
        <Text style={Styles.title}>Login</Text>
        <TextInput
          style={Styles.input}
          placeholder="Phone"
          onChangeText={text => setPhoneNumber(text)}
        />
        <TextInput
          style={Styles.input}
          placeholder="Password"
          secureTextEntry
          onChangeText={text => setPassword(text)}
        />
        <TouchableOpacity
          style={Styles.button}
          onPress={handleLogin(phoneNumber, password)}>
          <Text style={Styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
export default LoginScreen;
