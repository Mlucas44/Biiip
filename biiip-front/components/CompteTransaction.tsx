// components/TransactionHistory.js
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
  onPressSeeMore?: () => void; // pour gérer l'action du bouton "Voir mes transactions"
};



function CompteTransaction({
  transactions,
  onPressSeeMore,
}: TransactionHistoryProps) {
  const navigation = useNavigation();

  const handleSubmit = async () => {
    navigation.navigate('Historique');
  };

  return (
    <View className="bg-white rounded-xl shadow p-4 ml-5 mr-5 mt-10">
      {/* Titre du tableau */}
      <Text className="text-lg font-bold mb-3">
        Transactions
      </Text>

      {transactions.slice(0, 4).map((item, index) => {
        // Tronquer le review si besoin
        const truncatedReview =
          item.review && item.review.length > 30
            ? `${item.review.slice(0, 30)}...`
            : item.review;

        // Formater la date en français
        const formattedDateTime = new Date(item.createdAt).toLocaleString(
          'fr-FR',
          {
            day: '2-digit',
            month: 'short', // ou 'long'
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          }
        );

        // Générer les 5 étoiles
        const stars = Array.from({ length: 5 }, (_, starIndex) => (
          <Icon
            key={starIndex}
            name={starIndex < item.rating ? 'star' : 'star-border'}
            size={20}
            color="#FFD700"
          />
        ));

        return (
          <View
            key={item.id}
            className={`
              flex-row justify-between items-center 
              pl-1 pr-1 pb-2 pt-2 rounded-lg   
              ${index < transactions.length - 1 ? 'border-b border-gray-200' : ''}
            `}
          >
            <View>
              {/* Montant + review éventuelle */}
              <Text className="text-base font-semibold">

                {truncatedReview ? `${truncatedReview}` : ''}
              </Text>
              {/* Date de la transaction */}
              <Text className="text-xs text-gray-400">{formattedDateTime}</Text>
            </View>
            {/* Zone étoilée */}
            <View className="flex-row ">
              <Text className="text-base font-semibold">
                {item.amount >= 0
                  ? `+${item.amount} €`
                  : `-${Math.abs(item.amount)} €`}
              </Text>

            </View>
          </View>
        );
      })}
      <View className="mt-4">
        <CustomButton
          title="Voir mes transactions"
          onPress={handleSubmit}
          variant="primary"
        />
      </View>
    </View>
  );
}

export default CompteTransaction;
