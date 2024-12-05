// components/Dashboard.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import Layout from '../components/Layout';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LogoutButton from '../components/LogoutButton';
import axios from '../axiosConfig';

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

function Dashboard() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // État pour les transactions, le chargement et les erreurs
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [visibleTransactions, setVisibleTransactions] = useState<number>(5);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Utiliser useEffect pour récupérer les données lors du montage du composant
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('/pourboires');
        setTransactions(response.data);
        setIsLoading(false);
      } catch (err) {
        console.error('Erreur lors de la récupération des transactions :', err);
        setError('Une erreur est survenue lors du chargement des données.');
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  // Fonction pour charger plus de transactions
  const loadMoreTransactions = () => {
    if (visibleTransactions < transactions.length) {
      setVisibleTransactions(visibleTransactions + 5);
    }
  };

  // Fonction pour rendre chaque transaction
  const renderTransaction = ({ item }: { item: Transaction }) => {
    // Limiter le review à 25 caractères
    const truncatedReview = item.review.length > 30
      ? `${item.review.slice(0, 30)}...`
      : item.review;

    // Convertir la date au format français
    const formattedDateTime = new Date(item.createdAt).toLocaleString('fr-FR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    return (
      <View className="flex-row justify-between bg-white p-2 rounded-lg mb-2">
        <View>
          <Text className="text-lg font-semibold">
            +{item.amount} €
            {item.review && (
              <Text className="text-sm text-gray-500"> - {truncatedReview}</Text>
            )}
          </Text>
          <Text className="text-xs text-gray-400">{formattedDateTime}</Text>
        </View>
        <View className="flex-row items-center">
          {Array.from({ length: 5 }, (_, index) => (
            <Icon
              key={index}
              name={index < item.rating ? 'star' : 'star-border'}
              size={20}
              color="#FFD700"
            />
          ))}
        </View>
      </View>
    );
  };


  if (isLoading) {
    return (
      <Layout>
        <ActivityIndicator size="large" color="#0000ff" />
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <Text className="text-red-500 text-center">{error}</Text>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Header interne personnalisé */}
      <View className="flex-row justify-between items-center mb-6">
        <Text className="text-2xl font-bold text-principale">Bienvenue Sandrine</Text>
        <TouchableOpacity className="p-2 bg-principale rounded-full">
          <Text style={{ color: 'white' }}>🔔</Text>
        </TouchableOpacity>
      </View>

      {/* Balance card */}
      <View className="bg-white p-6 rounded-lg shadow mb-6">
        <Text className="text-xl font-semibold text-principale">
          {transactions.reduce((total, item) => total + item.amount, 0).toFixed(2)} €
        </Text>
        <Text className="text-sm text-gray-500">Depuis {new Date().getFullYear()}</Text>
        <LogoutButton />
      </View>

      {/* Transaction history */}
      <View className="mb-2">
        <Text className="text-lg font-medium text-principale">Historique de transaction</Text>
        <View
          className="mt-4 bg-fond rounded-lg"
          style={{ maxHeight: 200 }}
        >
          <FlatList
            data={transactions.slice(0, visibleTransactions)}
            renderItem={renderTransaction}
            keyExtractor={(item) => item.id.toString()}
            onEndReached={loadMoreTransactions}
            onEndReachedThreshold={0.5}
            scrollEnabled
          />
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('Historique')}
          className="mt-4 w-full bg-principale px-4 py-2 rounded"
        >
          <Text className="text-white text-center">Explorer l'historique</Text>
        </TouchableOpacity>
      </View>

      {/* Chart section */}
      <View className="mt-2">
        <Text className="text-lg font-medium text-principale">Tous vos pourboires</Text>
        <View className="bg-white p-6 rounded-lg shadow">
          {/* Placeholder for the chart */}
          <View className="h-32 bg-gray-200 rounded mb-4" />
          <TouchableOpacity
            className="w-full bg-principale px-4 py-2 rounded"
            onPress={() => { /* Action pour voir les statistiques */ }}
          >
            <Text className="text-white text-center">Voir mes statistiques de pourboire</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Layout>
  );
}

export default Dashboard;
