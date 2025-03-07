import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import Layout from '../components/Layout';
import CustomButton from '../components/button/CustomButton';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

function Boitier() {
  const navigation = useNavigation();


  return (
    <Layout>
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <View className="flex-row justify-between items-center mb-4 mt-2">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon
              className="ml-2"
              name={'arrow-back'}
              size={28}
            />
          </TouchableOpacity>
        </View>
        <Text className="text-3xl font-bold text-gray-900 ml-6">Mon boitier Biiip</Text>

        <View className="bg-white rounded-xl shadow p-4 ml-5 mr-5 mt-10 mb-32">
          <Text className="text-lg font-bold mb-4">Mes informations</Text>
          <View style={{ alignItems: 'center', marginBottom: 20 }}>
            <Image
              source={require('../assets/tpe.png')}
              style={{
                width: 150,
                height: 150,
                marginBottom: 10,
              }}
            />
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#000' }}>
              Biiip restaurant La Bodega
            </Text>
            <View className="flex-row justify-between items-center">
              <View style={{
                backgroundColor: 'green',
                borderRadius: 10,
                paddingVertical: 6,
                paddingHorizontal: 6,
                marginTop: 10
              }}>

              </View>
              <Text style={{ fontSize: 13, marginBlockStart: 8, marginLeft: 10, marginTop: 10 }}>
                Connectée
              </Text>
            </View>
          </View>

          <View className="space-y-6">
            <View className="mb-3">
              <Text className=" mb-1">État du réseau</Text>
              <TextInput
                value="Bon"
                editable={false}
                className="bg-gray-100 p-3 rounded-md text-gray-600"
              />
            </View>
            <View className="mb-3">
              <Text className=" mb-1">Numéro de série</Text>
              <TextInput
                value="145267871562415244"
                editable={false}
                className="bg-gray-100 p-3 rounded-md text-gray-600"
              />
            </View>
          </View>

          {/* Boutons */}
          <View className="mt-6">
            <CustomButton
              title="Déconnecter l'appareil"
              variant="primary"
            />
          </View>
        </View>
      </ScrollView>
    </Layout >
  );
}

export default Boitier;
