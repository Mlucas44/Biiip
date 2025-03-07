// Login.js
import React, { useState, useEffect } from 'react';
import {
  Text, TextInput, TouchableOpacity, View
} from 'react-native';
import axios from '../axiosConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import Logo from '../assets/Logo.svg';
import CustomButton from '../components/button/CustomButton';

type RootStackParamList = {
  Login: undefined;
  Accueil: undefined;
  Register: undefined;
};

function Login() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('password123');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        navigation.navigate('Accueil');
      }
    };
    checkToken();
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/auth/login', { email, password });

      // Récupère le token et le user
      const { token, user } = response.data;

      // Stocke le token et les infos user
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('userName', user.name);
      await AsyncStorage.setItem('role', user.role.toString());

      navigation.navigate('Accueil');
    } catch (error) {
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      } else if (error.request) {
        console.error('Request object:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
      setErrorMessage('Email ou mot de passe incorrect.');
    }
  };

  // Fonction qui crée le pourboire et navigue vers Register
  const handleRegister = async () => {
    try {
      await axios.post('/pourboires', {
        amount: 5, // Montant de 5€
        rating: 5, // Note par défaut (attention : doit respecter la validation de ton modèle)
        review: 'Nouveau pourboire'
      });
    } catch (error) {
      console.error('Erreur lors de la création du pourboire :', error);
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
      <TouchableOpacity onPress={handleRegister}>
        <Text className="text-center text-brand-red-500 mt-4">
          Vous n'avez pas de compte ? Inscrivez-vous
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default Login;
