import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomButton from '../components/button/CustomButton';
import { useNavigation } from '@react-navigation/native';

type Transaction = {
  id: number;
  amount: number;
  review: string;
  rating: number;
  createdAt: string;
};

type TransactionHistoryProps = {
  transactions: Transaction[];
  onPressSeeMore?: () => void;
};

function Avis() {
  const navigation = useNavigation();

  const handleSubmit = async () => {
    navigation.navigate('Avis');
  };

  return (
    <View className="bg-white rounded-xl shadow p-4 ml-5 mr-5 mt-8 ">
      {/* Titre */}
      <Text className="text-lg font-bold mb-3">
        Les avis de l'établissement
      </Text>

      {/* Section des étoiles avec fond primaire */}
      <View className="mb-4 mt-4 ">
        <View className="bg-brand-darkBlue-500-main rounded-lg p-4 mx-24">
          <View className="flex-row justify-center items-center">
            <Icon name="star" size={30} color="#FFD700" />
            <Icon name="star" size={30} color="#FFD700" />
            <Icon name="star" size={30} color="#FFD700" />
            <Icon name="star" size={30} color="#FFD700" />
            <Icon name="star" size={30} color="#C0C0C0" />
          </View>
        </View>
        <Text className="text-center mt-2">230 Avis</Text>
      </View>

      {/* Bouton pour voir les avis */}
      <View className="mt-4">
        <CustomButton
          title="Voir les avis"
          onPress={handleSubmit}
          variant="primary"
        />
      </View>
    </View>
  );
}

export default Avis;
