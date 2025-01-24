import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity, // Import du composant ScrollView
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import Layout from '../components/Layout';
import Icon from 'react-native-vector-icons/MaterialIcons';

type RootStackParamList = {
  Historique: undefined;
};

function Statistiques() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <Layout>
      {/* Rendre le contenu scrollable */}
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        {/* Bouton de retour */}
        <View className="flex-row justify-between items-center mb-4 mt-2">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon
              className="ml-2"
              name={'arrow-back'}
              size={28}
            />
          </TouchableOpacity>
        </View>

        {/* Titre */}
        <Text className="text-2xl font-bold text-gray-900 ml-6">
          Statistiques de pourboire
        </Text>

        {/* Images */}
        <View className="items-center mt-4">
          <Image
            source={require('../assets/statmois.png')} // Remplacez par le chemin correct de votre image
            style={{ width: 400, height: 420 }} // Dimensions de l'image
            resizeMode="contain" // Ajustement de l'image
          />
        </View>
        <View className="items-center  mb-32">
          <Image
            source={require('../assets/statsemaine.png')} // Remplacez par le chemin correct de votre image
            style={{ width: 370, height: 370 }} // Dimensions de l'image
            resizeMode="contain" // Ajustement de l'image
          />
        </View>
      </ScrollView>
    </Layout>
  );
}

export default Statistiques;
