import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import Layout from '../components/Layout';
import LogoutButton from '../components/LogoutButton';
import CustomButton from '../components/button/CustomButton';
import AsyncStorage from "@react-native-async-storage/async-storage";

function Profil() {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const loadRole = async () => {
      const storedRole = await AsyncStorage.getItem('role');
      setRole(storedRole);
    };

    loadRole();
  }, []);

  const shouldShowRetirer = role !== "true";

  return (
    <Layout>
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <Text className="text-3xl font-bold text-gray-900 mt-10 ml-6">Mon profil</Text>

        <View className="bg-white rounded-xl shadow p-4 ml-5 mr-5 mt-10 mb-32">
          <Text className="text-lg font-bold mb-4">Mes informations</Text>
          {shouldShowRetirer ? (
            <>
              < View style={{ alignItems: 'center', marginBottom: 20 }}>
                <Image
                  source={require('../assets/avatar.png')}
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 50,
                    marginBottom: 10,
                  }}
                />
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#000' }}>
                  Camille MARTIN
                </Text>
              </View>
              <View className="space-y-6">
                <View className="mb-3">
                  <Text className=" mb-1">Nom</Text>
                  <TextInput
                    value="Martin"
                    editable={false}
                    className="bg-gray-100 p-3 rounded-md text-gray-600"
                  />
                </View>
                <View className="mb-3">
                  <Text className=" mb-1">Prénom</Text>
                  <TextInput
                    value="Camille"
                    editable={false}
                    className="bg-gray-100 p-3 rounded-md text-gray-600"
                  />
                </View>
                <View className="mb-3">
                  <Text className=" mb-1">E-mail</Text>
                  <TextInput
                    value="camille.martin@gmail.com"
                    editable={false}
                    className="bg-gray-100 p-3 rounded-md text-gray-600"
                  />
                </View>
                <View className="mb-3">
                  <Text className=" mb-1">Téléphone</Text>
                  <TextInput
                    value="+33 6 67 53 21 73"
                    editable={false}
                    className="bg-gray-100 p-3 rounded-md text-gray-600"
                  />
                </View>
              </View>
            </>
          ) : (
            <>
              <View style={{ alignItems: 'center', marginBottom: 20 }}>
                <Image
                  source={require('../assets/avatar2.jpg')}
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 50,
                    marginBottom: 10,
                  }}
                />
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#000' }}>
                  Administrateur
                </Text>
              </View>
              <View className="space-y-6">
                <View className="mb-3">
                  <Text className=" mb-1">Nom</Text>
                  <TextInput
                    value="admin"
                    editable={false}
                    className="bg-gray-100 p-3 rounded-md text-gray-600"
                  />
                </View>
                <View className="mb-3">
                  <Text className=" mb-1">Prénom</Text>
                  <TextInput
                    value="Administrateur"
                    editable={false}
                    className="bg-gray-100 p-3 rounded-md text-gray-600"
                  />
                </View>
                <View className="mb-3">
                  <Text className=" mb-1">E-mail</Text>
                  <TextInput
                    value="admin@example.com"
                    editable={false}
                    className="bg-gray-100 p-3 rounded-md text-gray-600"
                  />
                </View>
                <View className="mb-3">
                  <Text className=" mb-1">Téléphone</Text>
                  <TextInput
                    value="+33 6 90 21 11 65"
                    editable={false}
                    className="bg-gray-100 p-3 rounded-md text-gray-600"
                  />
                </View>
              </View>
            </>
          )}





          {/* Boutons */}
          <View className="mt-6">
            <CustomButton
              title="Modifier mon profil"
              variant="primary"
            />
          </View>
          <LogoutButton />
        </View>
      </ScrollView>
    </Layout >
  );
}

export default Profil;
