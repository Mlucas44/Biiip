// components/TransactionHistory.js
import React from 'react';
import { View, Text, ScrollView } from 'react-native';

type Transaction = {
  id: number;
  amount: number;
  review: string;
  rating: number;
  createdAt: string;
};

type TransactionHistoryProps = {
  transactions: Transaction[];
  title: string;
};

function History({ title, transactions }: TransactionHistoryProps) {
  return (
    <View className="bg-white rounded-xl shadow p-4 ml-5 mr-5 mt-5 h-80">
      <Text className="text-lg font-bold mb-3">{title}</Text>

      {/* ScrollView pour afficher toutes les transactions */}
      <ScrollView>
        {transactions.map((item, index) => {
          // Tronquer le review si besoin
          const truncatedReview =
            item.review && item.review.length > 30
              ? `${item.review.slice(0, 30)}...`
              : item.review;

          // Formater la date en français
          const formattedDateTime = new Date(item.createdAt).toLocaleString('fr-FR', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          });

          return (
            <View
              key={item.id}
              className={`flex-row justify-between items-center 
              pl-1 pr-1 pb-2 pt-2 rounded-lg
              ${index < transactions.length - 1 ? 'border-b border-gray-200' : ''}`}
            >
              <View>
                {/* Montant + review éventuelle */}
                <Text className="text-base font-semibold">
                  {truncatedReview ? truncatedReview : ''}
                </Text>
                {/* Date de la transaction */}
                <Text className="text-xs text-gray-400">{formattedDateTime}</Text>
              </View>
              {/* Zone d'affichage du montant et/ou des étoiles */}
              <View className="flex-row items-center">
                <Text className="text-base font-semibold mr-2">
                  {item.amount >= 0
                    ? `+${item.amount} €`
                    : `-${Math.abs(item.amount)} €`}
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

export default History;
