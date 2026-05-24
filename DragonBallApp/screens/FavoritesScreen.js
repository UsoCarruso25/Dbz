// screens/FavoritesScreen.js
import { useEffect, useState } from "react";
import { View, FlatList, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, auth } from "../firebaseConfig";

export default function FavoritesScreen({ navigation }) {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchFavorites();
    });
    return unsubscribe;
  }, [navigation]);

  const fetchFavorites = async () => {
    if (!auth.currentUser) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const q = query(collection(db, "favorites"), where("userId", "==", auth.currentUser.uid));
      const snapshot = await getDocs(q);
      const favoritesList = snapshot.docs.map(doc => doc.data());
      setFavorites(favoritesList);
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

  if (favorites.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.emptyText}>⭐ No tienes personajes favoritos</Text>
        <Text style={styles.emptySubtext}>Agrega algunos desde la pantalla principal</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={favorites}
      keyExtractor={(item) => `${item.characterId}`}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("Personajes", { 
            screen: "Detail", 
            params: { character: item } 
          })}
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
  centered: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    backgroundColor: "#1a1a2e" 
  },
  card: { 
    flexDirection: "row", 
    padding: 15, 
    margin: 10, 
    backgroundColor: "#16213e", 
    borderRadius: 15, 
    elevation: 5 
  },
  image: { 
    width: 80, 
    height: 80, 
    borderRadius: 40, 
    borderWidth: 2, 
    borderColor: "#f39c12" 
  },
  info: { 
    flex: 1, 
    marginLeft: 15, 
    justifyContent: "center" 
  },
  name: { 
    fontSize: 20, 
    fontWeight: "bold", 
    color: "#f39c12" 
  },
  race: { 
    fontSize: 14, 
    color: "#ccc", 
    marginTop: 4 
  },
  ki: { 
    fontSize: 14, 
    color: "#e74c3c", 
    marginTop: 4, 
    fontWeight: "bold" 
  },
  emptyText: { 
    fontSize: 20, 
    fontWeight: "bold",
    color: "#f39c12", 
    textAlign: "center" 
  },
  emptySubtext: { 
    fontSize: 16, 
    color: "#999", 
    textAlign: "center", 
    marginTop: 10 
  },
});