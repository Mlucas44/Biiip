// components/Historique.js
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import Layout from '../components/Layout';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from '../axiosConfig';
import DateTimePicker from '@react-native-community/datetimepicker';

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

function Historique() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // État pour stocker les pourboires
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // État pour le filtre
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  // États pour les DateTimePickers
  const [showStartDatePicker, setShowStartDatePicker] = useState<boolean>(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState<boolean>(false);

  // Référence pour l'animation du menu latéral
  const slideAnim = useRef(new Animated.Value(Dimensions.get('window').width)).current;
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false);

  // Récupérer les pourboires depuis l'API lors du montage du composant
  useEffect(() => {
    const fetchPourboires = async () => {
      try {
        const response = await axios.get('/pourboires');
        setTransactions(response.data);
        setIsLoading(false);
      } catch (err) {
        console.error('Erreur lors de la récupération des pourboires :', err);
        setError('Une erreur est survenue lors du chargement des pourboires.');
        setIsLoading(false);
      }
    };

    fetchPourboires();
  }, []);

  // Fonction pour filtrer les transactions
  const filteredTransactions = transactions.filter((item) => {
    let ratingMatch = true;
    let startDateMatch = true;
    let endDateMatch = true;

    if (selectedRating !== null) {
      ratingMatch = item.rating === selectedRating;
    }

    if (startDate) {
      startDateMatch = new Date(item.createdAt) >= startDate;
    }

    if (endDate) {
      endDateMatch = new Date(item.createdAt) <= endDate;
    }

    return ratingMatch && startDateMatch && endDateMatch;
  });

  // Fonction pour ouvrir le menu de filtre
  const openFilterMenu = () => {
    setIsFilterVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  // Fonction pour fermer le menu de filtre
  const closeFilterMenu = () => {
    Animated.timing(slideAnim, {
      toValue: Dimensions.get('window').width,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setIsFilterVisible(false);
    });
  };

  // Fonction pour appliquer le filtre de note
  const toggleRatingFilter = (rating: number) => {
    if (selectedRating === rating) {
      setSelectedRating(null);
    } else {
      setSelectedRating(rating);
    }
  };

  // Fonction pour réinitialiser tous les filtres
  const resetFilters = () => {
    setSelectedRating(null);
    setStartDate(null);
    setEndDate(null);
  };

  // Fonction pour rendre chaque transaction
  const renderTransaction = ({ item }: { item: Transaction }) => {
    const formattedDateTime = new Date(item.createdAt).toLocaleString('fr-FR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
    return (
      <View className="flex-row justify-between bg-white p-4 rounded-lg mb-2">
        <View className="flex-1 mr-3">
          <Text className="text-lg font-bold">+{item.amount} €</Text>
          <Text className="text-sm text-gray-500 mb-1">{item.review}</Text>
          <Text className="text-xs text-gray-400">{formattedDateTime}</Text>
        </View>
        <View className="flex-shrink-0 flex-row items-center">
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
      {/* Header personnalisé */}
      <View className="flex-row justify-between items-center mb-4">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text className="text-xl text-gray-800">{'< Retour'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={openFilterMenu}>
          <Icon name="filter-list" size={28} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Affichage des filtres actifs */}
      {(selectedRating || startDate || endDate) && (
        <View className="mb-2">
          <Text className="text-base font-bold">Filtres actifs :</Text>
          {selectedRating && (
            <Text className="text-sm text-gray-500">{selectedRating} étoiles</Text>
          )}
          {startDate && (
            <Text className="text-sm text-gray-500">
              À partir du {startDate.toLocaleDateString('fr-FR')}
            </Text>
          )}
          {endDate && (
            <Text className="text-sm text-gray-500">
              Jusqu'au {endDate.toLocaleDateString('fr-FR')}
            </Text>
          )}
          <TouchableOpacity onPress={resetFilters} className="mt-2 bg-red-500 p-2 rounded self-start">
            <Text className="text-white text-sm">Réinitialiser les filtres</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Liste complète des transactions filtrées */}
      <FlatList
        data={filteredTransactions}
        renderItem={renderTransaction}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 80 }}
        ListEmptyComponent={
          <Text className="text-center text-gray-500 mt-4">
            Aucun pourboire trouvé pour ces filtres.
          </Text>
        }
      />

      {/* Menu de filtre latéral */}
      {isFilterVisible && (
        <TouchableWithoutFeedback onPress={closeFilterMenu}>
          <View className="absolute top-0 left-0 right-0 bottom-0">
            <Animated.View
              style={{
                transform: [{ translateX: slideAnim }],
              }}
              className="absolute top-0 right-0 w-4/5 h-full bg-white shadow-lg"
            >
              {/* Header du menu de filtre */}
              <View className="flex-row items-center p-4">
                <TouchableOpacity onPress={closeFilterMenu}>
                  <Icon name="close" size={28} color="#000" />
                </TouchableOpacity>
                <Text className="text-lg font-bold ml-4">Filtres</Text>
              </View>

              <View className="flex-1 p-4">
                {/* Filtre par note */}
                <Text className="text-base font-bold my-2">Filtrer par note</Text>
                {[5, 4, 3, 2, 1].map((rating) => (
                  <TouchableOpacity
                    key={rating}
                    onPress={() => toggleRatingFilter(rating)}
                    className="flex-row items-center mb-2"
                  >
                    <Icon
                      name={selectedRating === rating ? 'check-box' : 'check-box-outline-blank'}
                      size={24}
                      color="#000"
                      className="mr-2"
                    />
                    <Text className="text-base">{rating} étoiles</Text>
                  </TouchableOpacity>
                ))}

                {/* Filtre par date */}
                <Text className="text-base font-bold my-2">Filtrer par date</Text>
                {/* Date de début */}
                <TouchableOpacity
                  onPress={() => setShowStartDatePicker(true)}
                  className="py-2"
                >
                  <Text className="text-base">
                    {startDate
                      ? `À partir du ${startDate.toLocaleDateString('fr-FR')}`
                      : 'Sélectionner une date de début'}
                  </Text>
                </TouchableOpacity>
                {showStartDatePicker && (
                  <DateTimePicker
                    value={startDate || new Date()}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                      setShowStartDatePicker(Platform.OS === 'ios');
                      if (selectedDate) {
                        setStartDate(selectedDate);
                      }
                    }}
                  />
                )}
                {/* Date de fin */}
                <TouchableOpacity
                  onPress={() => setShowEndDatePicker(true)}
                  className="py-2"
                >
                  <Text className="text-base">
                    {endDate
                      ? `Jusqu'au ${endDate.toLocaleDateString('fr-FR')}`
                      : 'Sélectionner une date de fin'}
                  </Text>
                </TouchableOpacity>
                {showEndDatePicker && (
                  <DateTimePicker
                    value={endDate || new Date()}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                      setShowEndDatePicker(Platform.OS === 'ios');
                      if (selectedDate) {
                        setEndDate(selectedDate);
                      }
                    }}
                  />
                )}

                {/* Bouton pour réinitialiser les filtres */}
                <TouchableOpacity onPress={resetFilters} className="mt-2 bg-red-500 p-2 rounded self-start">
                  <Text className="text-white text-sm">Réinitialiser les filtres</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      )}
    </Layout>
  );
}

export default Historique;
