// screens/HomeScreen.js
import { useEffect, useState } from "react";
import { View, FlatList, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";

export default function HomeScreen({ navigation }) {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCharacters();
  }, []);

  const fetchCharacters = async () => {
    try {
      const response = await fetch("https://dragonball-api.com/api/characters?limit=30");
      const data = await response.json();
      setCharacters(data.items || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#f39c12" />
      </View>
    );
  }

  return (
    <FlatList
      data={characters}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("Detail", { character: item })}
        >
          <Image source={{ uri: item.image }} style={styles.image} />
          <View style={styles.info}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.race}>Raza: {item.race || "Desconocida"}</Text>
            <Text style={styles.ki}>KI: {item.ki}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#1a1a2e" },
  card: { flexDirection: "row", padding: 15, margin: 10, backgroundColor: "#16213e", borderRadius: 15, elevation: 5 },
  image: { width: 80, height: 80, borderRadius: 40, borderWidth: 2, borderColor: "#f39c12" },
  info: { flex: 1, marginLeft: 15, justifyContent: "center" },
  name: { fontSize: 20, fontWeight: "bold", color: "#f39c12" },
  race: { fontSize: 14, color: "#ccc", marginTop: 4 },
  ki: { fontSize: 14, color: "#e74c3c", marginTop: 4, fontWeight: "bold" },
});