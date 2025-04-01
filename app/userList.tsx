import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { useRouter } from "expo-router";
import axios from "axios";  // axios importálása
import { useState, useEffect } from "react";

// Definiáljuk a felhasználó típusát
interface User {
  id: number;  // Vagy string, ha az id egy string
  name: string;
  role: string;
}

export default function Page1() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);  // Típus definiálása a felhasználók számára
  const [loading, setLoading] = useState(true);  // Loading állapot

  // Felhasználók lekérése az API-ból
  useEffect(() => {
    axios.get("http://localhost:5000/users")  // Az Express szerver URL-je
      .then(response => {
        setUsers(response.data);  // A válaszból származó adatokat tároljuk
        setLoading(false);  // Beállítjuk a loading állapotot
      })
      .catch(error => {
        console.error("Hiba a felhasználók lekérésekor:", error);
        setLoading(false);  // Hiba esetén is beállítjuk, hogy vége a betöltésnek
      });
  }, []);

  // Visszalépés kezelése (ellenőrizzük, hogy van-e előző képernyő)
  const handleBackPress = () => {
    if (router.canGoBack()) {
      router.back();  // Ha van hova visszalépni, akkor visszalépünk
    } else {
      router.push("/");  // Ha nincs hova visszalépni, akkor a főoldalra navigálunk
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Userek listája</Text>

      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={users}
          keyExtractor={(item) => item.id.toString()}  // Felhasználó azonosítója az egyedi kulcs
          renderItem={({ item }) => (
            <View style={styles.userRow}>
              <Text>{item.name}</Text>
              <Text>{item.role}</Text>
            </View>
          )}
        />
      )}

      <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
        <Text style={styles.backText}>Vissza</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  backButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#627966",
    borderRadius: 5,
  },
  backText: {
    color: "white",
    fontSize: 16,
  },
  userRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
});
