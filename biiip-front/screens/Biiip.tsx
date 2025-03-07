import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Layout from '../components/Layout';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

function Biiip() {
  const navigation = useNavigation();



  return (
    <Layout>
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <Text className="text-3xl font-bold text-gray-900 mt-10 ml-6">Mon Biiip</Text>
        <Text className="text-xl font-bold text-gray-900 mt-10 ml-6">Mon équipe</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Boitier')}
        >
          <View className="bg-white rounded-xl shadow p-4 ml-5 mr-5 mt-4">
            <View className="flex-row justify-between items-center">
              <Text style={{ flex: 1, flexWrap: 'wrap' }} className="text-lg font-bold">
                Gérez les accès de votre équipe et créez de nouveaux comptes
              </Text>
              <Icon name="arrow-forward-ios" size={20} color="#000" />
            </View>
          </View>
        </TouchableOpacity>

        <Text className="text-xl font-bold text-gray-900 mt-10 ml-6">Mon boitier Biiip</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Boitier')}
        >
          <View className="bg-white rounded-xl shadow p-4 ml-5 mr-5 mt-4 ">
            <View className="flex-row justify-between items-center">
              <Text className="text-lg font-bold">Gérez les paramètre de votre boitier</Text>
              <Icon name="arrow-forward-ios" size={20} color="#000" />
            </View>
          </View>
        </TouchableOpacity>
        <Text className="text-xl font-bold text-gray-900 mt-10 ml-6">J'ai un problème</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Boitier')}
        >
          <View className="bg-white rounded-xl shadow p-4 ml-5 mr-5 mt-4 mb-32">
            <View className="flex-row justify-between items-center">
              <Text className="text-lg font-bold">Envoyez nous un signalement</Text>
              <Icon name="arrow-forward-ios" size={20} color="#000" />
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </Layout >
  );
}

export default Biiip;
