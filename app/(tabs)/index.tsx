import { postItStyles } from "../../constants/colors";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useFonts, Kalam_400Regular } from "@expo-google-fonts/kalam";

export default function Tab() {
  let [fontsLoaded] = useFonts({
    Kalam_400Regular,
  });

  if (!fontsLoaded) return;

  const data = Object.entries(postItStyles).map(([name, color]) => ({
    name,
    color,
  }));

  const numColumns = 1;

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        numColumns={numColumns}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View style={[styles.card, { backgroundColor: item.color }]}>
            <Text style={styles.text}>{item.name}</Text>
          </View>
        )}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 40,
  },
  card: {
    margin: 5,
    padding: 20,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },
  text: {
    fontFamily: "Kalam_400Regular",
    fontSize: 16,
    textAlign: "center",
  },
  list: {},
});
