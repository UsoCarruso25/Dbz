import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image, ActivityIndicator, TouchableOpacity } from "react-native";

export default function TierListScreen() {
  const [transformations, setTransformations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransformations();
  }, []);

  const fetchTransformations = async () => {
    try {
      const response = await fetch("https://dragonball-api.com/api/transformations");
      const data = await response.json();
      setTransformations(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getTierColor = (index) => {
    if (index === 0) return "#FFD700"; // S Tier - Dorado
    if (index === 1) return "#C0C0C0"; // A Tier - Plateado
    if (index === 2) return "#CD7F32"; // B Tier - Bronce
    if (index === 3) return "#90EE90"; // C Tier - Verde
    return "#808080"; // D Tier - Gris
  };

  const getTierName = (index) => {
    if (index === 0) return "S+";
    if (index === 1) return "S";
    if (index === 2) return "A";
    if (index === 3) return "B";
    return "C";
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#f39c12" />
        <Text style={styles.loadingText}>Cargando transformaciones...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>⚡ TIER LIST ⚡</Text>
        <Text style={styles.subtitle}>Transformaciones de Dragon Ball</Text>
        <View style={styles.divider} />
      </View>

      <View style={styles.legend}>
        <View style={styles.legendItem}><View style={[styles.legendColor, { backgroundColor: "#FFD700" }]} /><Text style={styles.legendText}>S+ - Dioses</Text></View>
        <View style={styles.legendItem}><View style={[styles.legendColor, { backgroundColor: "#C0C0C0" }]} /><Text style={styles.legendText}>S - Legendarias</Text></View>
        <View style={styles.legendItem}><View style={[styles.legendColor, { backgroundColor: "#CD7F32" }]} /><Text style={styles.legendText}>A - Épicas</Text></View>
        <View style={styles.legendItem}><View style={[styles.legendColor, { backgroundColor: "#90EE90" }]} /><Text style={styles.legendText}>B - Avanzadas</Text></View>
        <View style={styles.legendItem}><View style={[styles.legendColor, { backgroundColor: "#808080" }]} /><Text style={styles.legendText}>C - Básicas</Text></View>
      </View>

      {transformations.slice(0, 15).map((item, index) => (
        <TouchableOpacity key={item.id} style={styles.card}>
          <View style={[styles.tierBadge, { backgroundColor: getTierColor(index) }]}>
            <Text style={styles.tierText}>{getTierName(index)}</Text>
          </View>
          <Image source={{ uri: item.image }} style={styles.image} />
          <View style={styles.info}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.ki}>KI: {item.ki}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a2a",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0a0a2a",
  },
  loadingText: {
    color: "#f39c12",
    marginTop: 10,
    fontSize: 16,
  },
  header: {
    alignItems: "center",
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#FFD700",
    textShadowColor: "rgba(255, 215, 0, 0.5)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  subtitle: {
    fontSize: 14,
    color: "#aaa",
    marginTop: 5,
  },
  divider: {
    width: 100,
    height: 3,
    backgroundColor: "#FFD700",
    marginTop: 15,
    borderRadius: 2,
  },
  legend: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    padding: 10,
    gap: 15,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  legendColor: {
    width: 20,
    height: 20,
    borderRadius: 5,
  },
  legendText: {
    color: "white",
    fontSize: 12,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.08)",
    marginHorizontal: 15,
    marginVertical: 8,
    padding: 12,
    borderRadius: 15,
    borderLeftWidth: 5,
  },
  tierBadge: {
    width: 45,
    height: 45,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  tierText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
    borderWidth: 2,
    borderColor: "#f39c12",
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFD700",
  },
  ki: {
    fontSize: 12,
    color: "#e74c3c",
    marginTop: 4,
  },
});