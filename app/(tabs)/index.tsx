import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import MedicationCard from "../../components/MedicationCard";
import MedicationForm from "../../components/MedicationForm";
import {
  cargarMedicamentos,
  guardarMedicamentos,
} from "../../services/storage";
import { Medication } from "../../types/Medication";

//pantalla inicial y los datos a rellenar en el formulario
export default function HomeScreen() {
  const [nombre, setNombre] = useState("");
  const [dosis, setDosis] = useState("");
  const [hora, setHora] = useState("");
  const [correo, setCorreo] = useState("");

  const [medicamentos, setMedicamentos] = useState<Medication[]>([]);

  useEffect(() => {
    async function cargar() {
      const datos = await cargarMedicamentos();
      setMedicamentos(datos);
    }

    cargar();
  }, []);

  useEffect(() => {
    guardarMedicamentos(medicamentos);
  }, [medicamentos]);

  function agregarMedicamento() {
    if (!nombre || !dosis || !hora || !correo) {
      alert("Completa todos los campos.");
      return;
    }
    //Este apartado es para marcar el estado inicial al guardar los datos del medicamento
    const nuevo: Medication = {
      id: Date.now().toString(),
      nombre,
      dosis,
      hora,
      correo,
      estado: "Pendiente ",
    };

    setMedicamentos((prev) => [...prev, nuevo]);

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
