import React from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

interface Props {
  nombre: string;
  dosis: string;
  hora: string;
  correo: string;

  setNombre: (text: string) => void;
  setDosis: (text: string) => void;
  setHora: (text: string) => void;
  setCorreo: (text: string) => void;

  agregarMedicamento: () => void;
}

export default function MedicationForm({
  nombre,
  dosis,
  hora,
  correo,
  setNombre,
  setDosis,
  setHora,
  setCorreo,
  agregarMedicamento,
}: Props) {
  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Nombre del medicamento"
        value={nombre}
        onChangeText={setNombre}
      />

      <TextInput
        style={styles.input}
        placeholder="Dosis"
        value={dosis}
        onChangeText={setDosis}
      />

      <TextInput
        style={styles.input}
        placeholder="Hora"
        value={hora}
        onChangeText={setHora}
      />

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={correo}
        onChangeText={setCorreo}
      />

      <TouchableOpacity style={styles.button} onPress={agregarMedicamento}>
        <Text style={styles.buttonText}>Guardar medicamento</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },

  button: {
    backgroundColor: "#2563EB",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
