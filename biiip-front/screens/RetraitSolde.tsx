import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  ImageBackground,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import Layout from '../components/Layout';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomButton from '../components/button/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from '../axiosConfig';

type RootStackParamList = {
  Accueil: undefined;
  Historique: undefined;
};

function RetraitSolde() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [withdrawal, setWithdrawal] = useState<string>("");
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const handleSubmit = async () => {
    const amountToWithdraw = parseFloat(withdrawal);
    if (isNaN(amountToWithdraw)) {
      // Gérer l'erreur, par exemple afficher une alerte
      return;
    }
    // Récupérer le solde actuel depuis AsyncStorage
    const storedBalance = await AsyncStorage.getItem('balance');
    let currentBalance = storedBalance ? parseFloat(storedBalance) : 59.65;

    // Calculer le nouveau solde
    const newBalance = currentBalance - amountToWithdraw;

    // Mettre à jour le solde dans AsyncStorage
    await AsyncStorage.setItem('balance', newBalance.toString());

    // Créer un pourboire en BDD avec axios en mettant le montant en négatif et la review "Transaction"
    try {
      await axios.post('/pourboires', {
        amount: -amountToWithdraw,  // montant négatif
        rating: 1,                   // note par défaut (rating obligatoire entre 1 et 5)
        review: 'Retrait du solde'        // description indiquant qu'il s'agit d'une transaction
      });
    } catch (error) {
      console.error('Erreur lors de la création du pourboire :', error);
      // Tu peux gérer l'erreur ici (afficher une alerte, etc.)
    }

    // Afficher le modal de confirmation
    setModalVisible(true);

    // Fermer le modal après 2 secondes et naviguer vers l'accueil
    setTimeout(() => {
      setModalVisible(false);
      navigation.navigate('Accueil');
    }, 2000);
  };

  return (
    <Layout>
      {/* Modal de confirmation */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}
        >
          <View
            style={{
              width: 300,
              backgroundColor: 'white',
              borderRadius: 10,
              padding: 20,
              alignItems: 'center',
            }}
          >
            <Text style={{ fontSize: 18, marginBottom: 20 }}>
              Virement pris en compte
            </Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={{ color: 'blue', fontSize: 16 }}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Bouton Retour */}
      <View className="flex-row justify-between items-center mb-4 mt-2">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon className="ml-2" name={'arrow-back'} size={28} />
        </TouchableOpacity>
      </View>

      {/* Titre */}
      <Text className="text-3xl font-bold text-gray-900 mt-4 ml-6">
        Retrait du solde
      </Text>

      {/* Champ d'entrée pour le montant */}
      <View style={{ alignItems: 'center', marginTop: 50 }}>
        <ImageBackground
          source={require('../assets/background.png')}
          style={{
            width: 350,
            height: 150,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 15,
            overflow: 'hidden',
          }}
        >
          <TextInput
            placeholder="0 €"
            placeholderTextColor="white"
            style={{
              fontSize: 32,
              color: 'white',
              fontWeight: 'bold',
              textAlign: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              borderRadius: 10,
              paddingVertical: 10,
              paddingHorizontal: 20,
            }}
            keyboardType="numeric"
            value={withdrawal}
            onChangeText={setWithdrawal}
          />
        </ImageBackground>
      </View>

      {/* Bouton de retrait */}
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
