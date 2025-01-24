import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ImageBackground, // Import depuis react-native
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import Layout from '../components/Layout';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomButton from '../components/button/CustomButton';

type RootStackParamList = {
  Historique: undefined;
};

function RetraitSolde() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const handleSubmit = async () => {
    navigation.navigate('Accueil');
  };

  return (
    <Layout>
      {/* Retour */}
      <View className="flex-row justify-between items-center mb-4 mt-2">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon className="ml-2" name={'arrow-back'} size={28} />
        </TouchableOpacity>
      </View>

      {/* Titre */}
      <Text className="text-3xl font-bold text-gray-900 mt-4 ml-6">
        Retrait du solde
      </Text>

      {/* Image avec un TextInput au centre */}
      <View style={{ alignItems: 'center', marginTop: 50 }}>
        <ImageBackground
          source={require('../assets/background.png')} // Remplacez par votre image
          style={{
            width: 350, // Largeur de l'image
            height: 150, // Hauteur de l'image
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 15,
            overflow: 'hidden', // Permet d'appliquer les coins arrondis
          }}
        >
          {/* Champ d'entrée centré */}
          <TextInput
            placeholder="0 €"
            placeholderTextColor="white"
            style={{
              fontSize: 32,
              color: 'white',
              fontWeight: 'bold',
              textAlign: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.2)', // Légère transparence
              borderRadius: 10,
              paddingVertical: 10,
              paddingHorizontal: 20,
            }}
            editable
            keyboardType="numeric"
          />

        </ImageBackground>
      </View>

      {/* Bouton */}
      <View style={{ marginTop: 30, alignItems: 'center' }}>
        <CustomButton
          title="Retirer mon solde"
          onPress={handleSubmit}
          variant="primary"
        />
      </View>
    </Layout>
  );
}

export default RetraitSolde;
