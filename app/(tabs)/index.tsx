import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

import MedicationCard from "../../components/MedicationCard";
import MedicationForm from "../../components/MedicationForm";
import { Medication } from "../../types/Medication";

export default function HomeScreen() {
  const [nombre, setNombre] = useState("");
  const [dosis, setDosis] = useState("");
  const [hora, setHora] = useState("");
  const [correo, setCorreo] = useState("");

  const [medicamentos, setMedicamentos] = useState<Medication[]>([]);

  const STORAGE_KEY = "@medicamentos";

  // Cargar medicamentos al abrir la app
  useEffect(() => {
    cargarMedicamentos();
  }, []);

  // Guardar medicamentos cada vez que cambie la lista
  useEffect(() => {
    guardarMedicamentos();
  }, [medicamentos]);

  async function cargarMedicamentos() {
    try {
      const datos = await AsyncStorage.getItem(STORAGE_KEY);

      if (datos) {
        setMedicamentos(JSON.parse(datos));
      }
    } catch (error) {
      console.log("Error al cargar medicamentos", error);
    }
  }

  async function guardarMedicamentos() {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(medicamentos));
    } catch (error) {
      console.log("Error al guardar medicamentos", error);
    }
  }

  function agregarMedicamento() {
    if (!nombre || !dosis || !hora || !correo) {
      alert("Completa todos los campos.");
      return;
    }

    const nuevo: Medication = {
      id: Date.now().toString(),
      nombre,
      dosis,
      hora,
      correo,
      estado: "Pendiente",
    };

    setMedicamentos([...medicamentos, nuevo]);

    setNombre("");
    setDosis("");
    setHora("");
    setCorreo("");
  }

  function marcarComoTomado(id: string) {
    const actualizados = medicamentos.map((med) =>
      med.id === id ? { ...med, estado: "Tomado ✅" } : med,
    );

    setMedicamentos(actualizados);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recordatorio de Medicamentos</Text>

      <MedicationForm
        nombre={nombre}
        dosis={dosis}
        hora={hora}
        correo={correo}
        setNombre={setNombre}
        setDosis={setDosis}
        setHora={setHora}
        setCorreo={setCorreo}
        agregarMedicamento={agregarMedicamento}
      />

      <Text style={styles.subtitle}>Medicamentos registrados</Text>

      <FlatList
        data={medicamentos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MedicationCard
            medication={item}
            marcarComoTomado={marcarComoTomado}
          />
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

  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },

  subtitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 15,
  },
});
