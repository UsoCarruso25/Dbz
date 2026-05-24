// screens/DetailScreen.js
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native";
import { doc, setDoc, deleteDoc, getDoc } from "firebase/firestore";
import { db, auth } from "../firebaseConfig";
import { useState, useEffect } from "react";

export default function DetailScreen({ route }) {
  const { character } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    checkFavorite();
  }, []);

  const checkFavorite = async () => {
    if (!auth.currentUser) return;
    const favoriteRef = doc(db, "favorites", `${auth.currentUser.uid}_${character.id}`);
    const docSnap = await getDoc(favoriteRef);
    setIsFavorite(docSnap.exists());
  };

  const toggleFavorite = async () => {
    if (!auth.currentUser) {
      Alert.alert("Error", "Debes iniciar sesión");
      return;
    }
    const favoriteRef = doc(db, "favorites", `${auth.currentUser.uid}_${character.id}`);
    if (isFavorite) {
      await deleteDoc(favoriteRef);
      setIsFavorite(false);
      Alert.alert("Eliminado", "Personaje eliminado de favoritos");
    } else {
      await setDoc(favoriteRef, {
        userId: auth.currentUser.uid,
        characterId: character.id,
        name: character.name,
        image: character.image,
        race: character.race,
        ki: character.ki,
        maxKi: character.maxKi,
        gender: character.gender,
        description: character.description,
        affiliation: character.affiliation,
        createdAt: new Date()
      });
      setIsFavorite(true);
      Alert.alert("Guardado", "Personaje agregado a favoritos");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: character.image }} style={styles.image} />
      <Text style={styles.name}>{character.name}</Text>
      
      <View style={styles.infoCard}>
        <Text style={styles.label}>🔥 Raza:</Text>
        <Text style={styles.value}>{character.race || "Desconocida"}</Text>
        
        <Text style={styles.label}>⚥ Género:</Text>
        <Text style={styles.value}>{character.gender || "Desconocido"}</Text>
        
        <Text style={styles.label}>💪 KI:</Text>
        <Text style={styles.value}>{character.ki}</Text>
        
        <Text style={styles.label}>⚡ KI Máximo:</Text>
        <Text style={styles.value}>{character.maxKi}</Text>
        
        <Text style={styles.label}>🏷️ Afiliación:</Text>
        <Text style={styles.value}>{character.affiliation || "Desconocida"}</Text>
      </View>

      {character.description && (
        <View style={styles.descriptionCard}>
          <Text style={styles.label}>📖 Descripción:</Text>
          <Text style={styles.description}>{character.description}</Text>
        </View>
      )}

      <TouchableOpacity
        style={[styles.favoriteButton, isFavorite && styles.favoriteButtonActive]}
        onPress={toggleFavorite}
      >
        <Text style={styles.favoriteButtonText}>
          {isFavorite ? "★ Eliminar de Favoritos" : "☆ Agregar a Favoritos"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#1a1a2e" 
  },
  image: { 
    width: "100%", 
    height: 350, 
    resizeMode: "cover" 
  },
  name: { 
    fontSize: 34, 
    fontWeight: "bold", 
    textAlign: "center", 
    marginVertical: 20, 
    color: "#f39c12" 
  },
  infoCard: { 
    backgroundColor: "#16213e", 
    margin: 15, 
    padding: 20, 
    borderRadius: 15, 
    elevation: 3 
  },
  descriptionCard: { 
    backgroundColor: "#16213e", 
    margin: 15, 
    marginTop: 0, 
    padding: 20, 
    borderRadius: 15, 
    elevation: 3 
  },
  label: { 
    fontSize: 18, 
    fontWeight: "bold", 
    color: "#f39c12", 
    marginTop: 10 
  },
  value: { 
    fontSize: 16, 
    color: "#ffffff", 
    marginTop: 5, 
    marginBottom: 10 
  },
  description: { 
    fontSize: 14, 
    color: "#cccccc", 
    marginTop: 5, 
    lineHeight: 20 
  },
  favoriteButton: { 
    backgroundColor: "#f39c12", 
    margin: 15, 
    padding: 15, 
    borderRadius: 10, 
    alignItems: "center" 
  },
  favoriteButtonActive: { 
    backgroundColor: "#e67e22" 
  },
  favoriteButtonText: { 
    color: "white", 
    fontSize: 18, 
    fontWeight: "bold" 
  }
});