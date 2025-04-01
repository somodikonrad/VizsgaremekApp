import { View, Text, TouchableOpacity, StyleSheet, useWindowDimensions } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";

export default function Navbar() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [menuOpen, setMenuOpen] = useState(false); // Állapotkezelés a hamburger menühöz

  const isMobile = width < 768; // Ha a szélesség kisebb, mint 768px, mobil nézetben vagyunk

  return (
    <View style={styles.navbar}>
      {isMobile ? (
        // Mobil nézet: Hamburger ikon megjelenítése
        <TouchableOpacity onPress={() => setMenuOpen(!menuOpen)} style={styles.hamburger}>
          <Text style={styles.hamburgerText}>☰</Text>
        </TouchableOpacity>
      ) : (
        // Nagyobb képernyőn a menü mindig látható
        <View style={styles.menu}>
          <NavButton title="Főoldal" onPress={() => router.push("/")} />
          <NavButton title="User List" onPress={() => router.push("/userList")} />
          <NavButton title="Oldal 2" onPress={() => router.push("/page2")} />
        </View>
      )}

      {/* Lenyíló menü mobil nézetben */}
      {isMobile && menuOpen && (
        <View style={styles.dropdownMenu}>
          <NavButton title="Főoldal" onPress={() => router.push("/")} />
          <NavButton title="User List" onPress={() => router.push("/userList")} />
          <NavButton title="Oldal 2" onPress={() => router.push("/page2")} />
        </View>
      )}
    </View>
  );
}

type NavButtonProps = {
    title: string;
    onPress: () => void;
  };
  

// 🔹 Navigációs gomb komponens (EZ HIÁNYZOTT)
const NavButton: React.FC<NavButtonProps> = ({ title, onPress }) => (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
const styles = StyleSheet.create({
  navbar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: "#627966",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  menu: {
    flexDirection: "row",
    justifyContent: "space-around",
    flex: 1,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  text: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  hamburger: {
    padding: 10,
  },
  hamburgerText: {
    color: "white",
    fontSize: 24,
  },
  dropdownMenu: {
    position: "absolute",
    top: 60,
    left: 0,
    right: 0,
    backgroundColor: "#627966",
    flexDirection: "column",
    alignItems: "center",
    paddingVertical: 10,
  },
});
