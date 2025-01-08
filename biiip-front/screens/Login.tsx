// Login.js
import React, { useState, useEffect } from 'react';
import {
  Text, TextInput, TouchableOpacity, View
} from 'react-native';
import axios from '../axiosConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import Logo from '../assets/Logo.svg';
import { Button } from '../components/Button';
import CustomButton from '../components/button/CustomButton';

type RootStackParamList = {
  Login: undefined;
  Dashboard: undefined;
  Register: undefined;
};

function Login() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // const navigation = useNavigation();
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('password123');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        navigation.navigate('Dashboard');
      }
    };
    checkToken();
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/auth/login', {
        email,
        password,
      });
      await AsyncStorage.setItem('token', response.data.token);
      navigation.navigate('Dashboard');
    } catch (error) {
      console.error('Erreur lors de la connexion :', error);
      setErrorMessage('Email ou mot de passe incorrect.');
    }
  };

  return (
    <View className="flex-1 p-4 bg-gray-100 justify-center">
      <View className="items-center mb-6">
        <Logo width={150} height={150} />
      </View>
      <Text className="text-4xl text-center text-principale mb-8">
        Bienvenue chez Biiip
      </Text>
      <TextInput
        className="h-12 border border-gray-300 bg-white rounded-lg px-4 mb-4"
        placeholder="Votre email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        className="h-12 border border-gray-300 bg-white rounded-lg px-4 mb-4"
        placeholder="Votre mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {errorMessage ? (
        <Text className="text-red-500 text-center mb-4">
          {errorMessage}
        </Text>
      ) : null}
      <CustomButton
        title="Se connecter"
        onPress={handleSubmit}
        variant="primary"
      />
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text className="text-center  text-brand-red-500 mt-4">
          Vous n'avez pas de compte ? Inscrivez-vous
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default Login;


