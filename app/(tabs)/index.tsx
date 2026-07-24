import { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  const [nombre, setNombre] = useState("");
  const [dosis, setDosis] = useState("");
  const [hora, setHora] = useState("");
  const [correo, setCorreo] = useState("");

  const [medicamentos, setMedicamentos] = useState<any[]>([]);

  function agregarMedicamento() {
    if (
      nombre.trim() === "" ||
      dosis.trim() === "" ||
      hora.trim() === "" ||
      correo.trim() === ""
    ) {
      alert("Completa todos los campos.");
      return;
    }

    const nuevoMedicamento = {
      id: Date.now().toString(),
      nombre,
      dosis,
      hora,
      correo,
      estado: "Pendiente",
    };

    setMedicamentos([...medicamentos, nuevoMedicamento]);

    setNombre("");
    setDosis("");
    setHora("");
    setCorreo("");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Recordatorio de Medicamentos</Text>

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
        placeholder="Hora (Ej. 08:00 PM)"
        value={hora}
        onChangeText={setHora}
      />

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={correo}
        onChangeText={setCorreo}
      />

      <TouchableOpacity style={styles.boton} onPress={agregarMedicamento}>
        <Text style={styles.textoBoton}>Guardar medicamento</Text>
      </TouchableOpacity>

      <Text style={styles.subtitulo}>Medicamentos registrados</Text>

      <FlatList
        data={medicamentos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>
              <Text style={styles.negrita}>Medicamento:</Text> {item.nombre}
            </Text>
            <Text>
              <Text style={styles.negrita}>Dosis:</Text> {item.dosis}
            </Text>
            <Text>
              <Text style={styles.negrita}>Hora:</Text> {item.hora}
            </Text>
            <Text>
              <Text style={styles.negrita}>Correo:</Text> {item.correo}
            </Text>
            <Text>
              <Text style={styles.negrita}>Estado:</Text> {item.estado}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 40,
    backgroundColor: "#fff",
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  subtitulo: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  boton: {
    backgroundColor: "#2563EB",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  textoBoton: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  card: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
  },
  negrita: {
    fontWeight: "bold",
  },
});
