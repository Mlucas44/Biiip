import React, { useState, useEffect } from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  TextInput
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import Layout from '../components/Layout';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomButton from '../components/button/CustomButton';

type RootStackParamList = {
  Historique: undefined;
};

type Transaction = {
  id: number;
  amount: number;
  review: string;
  rating: number;
  createdAt: string;
};

function Retrait() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const handleSubmit = async () => {
    navigation.navigate('Accueil');
  };
  return (
    <Layout>
      <View className="flex-row justify-between items-center mb-4 mt-2">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            className="ml-2"
            name={'arrow-back'}
            size={28}
          />
        </TouchableOpacity>
      </View>
      <Text className="text-3xl font-bold text-gray-900 mt-4 ml-6">Compte</Text>

      <View className="bg-white rounded-xl shadow p-4 ml-5 mr-5 mt-10 mb-32">
        <Text className="text-lg font-bold mb-4">Mon mode de retrait</Text>
        <View className="space-y-6">
          <View className="mb-3">
            <Text className=" mb-1">Nom</Text>
            <TextInput
              value="Martin"
              editable={false}
              className="bg-gray-100 p-3 rounded-md text-gray-600"
            />
          </View>
          <View className="mb-3">
            <Text className=" mb-1">Prénom</Text>
            <TextInput
              value="Camille"
              editable={false}
              className="bg-gray-100 p-3 rounded-md text-gray-600"
            />
          </View>
          <View className="mb-3">
            <Text className=" mb-1">Iban</Text>
            <TextInput
              value="FR76 XXX XXX XXX XXX XXX"
              editable={false}
              className="bg-gray-100 p-3 rounded-md text-gray-600"
            />
          </View>
        </View>
        <View className="mt-6">
          <CustomButton
            title="Modifier mon mode de retrait"
            onPress={handleSubmit}
            variant="primary"
          />
        </View>
      </View>
    </Layout>
  );
}

export default Retrait;
