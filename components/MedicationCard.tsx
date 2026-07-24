import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Medication } from "../types/Medication";

interface Props {
  medication: Medication;
}

export default function MedicationCard({ medication }: Props) {
  return (
    <View style={styles.card}>
      <Text>
        <Text style={styles.bold}>Medicamento:</Text> {medication.nombre}
      </Text>

      <Text>
        <Text style={styles.bold}>Dosis:</Text> {medication.dosis}
      </Text>

      <Text>
        <Text style={styles.bold}>Hora:</Text> {medication.hora}
      </Text>

      <Text>
        <Text style={styles.bold}>Correo:</Text> {medication.correo}
      </Text>

      <Text>
        <Text style={styles.bold}>Estado:</Text> {medication.estado}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    backgroundColor: "#f8f8f8",
  },

  bold: {
    fontWeight: "bold",
  },
});
