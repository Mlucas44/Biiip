import React from 'react';
import { View, Text, TextInput } from 'react-native';
import CustomButton from '../components/button/CustomButton';
import { useNavigation, NavigationProp } from '@react-navigation/native';
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

type TransactionHistoryProps = {
  transactions: Transaction[];
  onPressSeeMore?: () => void;
};

function FormRetrait({
  onPressSeeMore,
}: TransactionHistoryProps) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleSubmit = async () => {
    navigation.navigate('Retrait');
  };

  return (
    <View className="bg-white rounded-xl shadow p-4 ml-5 mr-5 mt-10 mb-32">
      <Text className="text-lg font-bold mb-3">Mon mode de retrait</Text>
      <View className="space-y-6">
        <View className="mb-3">
          <Text className="text-gray-400 mb-1">Nom</Text>
          <TextInput
            value="Martin"
            editable={false}
            className="bg-gray-100 p-3 rounded-md text-gray-400"
          />
        </View>
        <View className="mb-3">
          <Text className="text-gray-400 mb-1">Prénom</Text>
          <TextInput
            value="Camille"
            editable={false}
            className="bg-gray-100 p-3 rounded-md text-gray-400"
          />
        </View>
        <View className="mb-3">
          <Text className="text-gray-400 mb-1">Iban</Text>
          <TextInput
            value="FR76 XXX XXX XXX XXX XXX"
            editable={false}
            className="bg-gray-100 p-3 rounded-md text-gray-400"
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
  );
}

export default FormRetrait;
