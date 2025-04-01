import { View, Text, StyleSheet, Image } from "react-native";
import Navbar from "../components/Navbar";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>TrackIt</Text>
      <Image source={require('../assets/images/Trackit.png')} style={styles.image} />
      <Navbar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10, // Paddingot adunk hozzá a konténerhez
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20, // Különbség a kép és a szöveg között
  },
  image: {
    height: 400,
    width: 600,
    resizeMode: "contain",  // Kép arányainak megtartása
    marginBottom: 20, // Kép és a navbar közötti távolság
  },
});

