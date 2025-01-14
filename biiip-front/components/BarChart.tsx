import { View, Text, Dimensions } from "react-native";
import { BarChart } from "react-native-chart-kit";
import CustomButton from '../components/button/CustomButton';

const screenWidth = Dimensions.get("window").width;

export default function MyBarChart() {

  const data = {
    labels: ["Juil", "Août", "Sept", "Oct", "Nov"],
    datasets: [{ data: [100, 200, 130, 160, 90] }],
  };
  const chartConfig = {
    backgroundGradientFrom: 'white',
    backgroundGradientFromOpacity: 'white',
    backgroundGradientTo: 'white',
    color: (opacity = 1) => `rgba(31, 43, 83, ${opacity})`,
    fillShadowGradientOpacity: 1,
    barPercentage: 0.5,
    barRadius: 5,
    propsForBackgroundLines: {
      strokeWidth: 0,
      strokeDasharray: null,
      stroke: '#F0F0F0',
    },

  };


  return (
    <View className=" bg-white rounded-xl p-4 ml-5 mr-5 mt-8 mb-64"  >
      <Text className="text-xl font-bold text-[#1F2B53] mb-2">
        Vos pourboires par mois
      </Text>
      <BarChart
        data={data}
        width={screenWidth - 48} // 80% de l'écran
        height={220}
        fromZero
        yLabelsOffset={-10}
        chartConfig={chartConfig}
        style={{ borderRadius: 8, alignSelf: "center" }}
        withHorizontalLabels={false}
        showValuesOnTopOfBars={false}
      />
      <View className="mt-4">
        <CustomButton
          title="Voir mes statistiques de pourboire"
          // onPress={handleSubmit}
          variant="primary"
        />
      </View>
    </View >
  );
}
