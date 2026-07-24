import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Medication } from "../types/Medication";

interface Props {
  medication: Medication;
  marcarComoTomado: (id: string) => void;
}

export default function MedicationCard({
  medication,
  marcarComoTomado,
}: Props) {
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

      <TouchableOpacity
        style={styles.button}
        onPress={() => marcarComoTomado(medication.id)}
      >
        <Text style={styles.buttonText}>Marcar como tomado</Text>
      </TouchableOpacity>
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

  button: {
    marginTop: 10,
    backgroundColor: "#16A34A",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
