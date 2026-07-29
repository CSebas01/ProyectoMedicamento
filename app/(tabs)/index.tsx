import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import MedicationCard from "../../components/MedicationCard";
import MedicationForm from "../../components/MedicationForm";
import { enviarMedicamento } from "../../services/api";
import {
  cargarMedicamentos,
  guardarMedicamentos,
} from "../../services/storage";
import { Medication } from "../../types/Medication";

//Pantalla principal de la aplicación
export default function HomeScreen() {
  // Estados del formulario
  const [nombre, setNombre] = useState("");
  const [dosis, setDosis] = useState("");
  const [hora, setHora] = useState("");
  const [correo, setCorreo] = useState("");

  // Lista de medicamentos registrados
  const [medicamentos, setMedicamentos] = useState<Medication[]>([]);

  // Carga los medicamentos guardados al iniciar la aplicación
  useEffect(() => {
    async function cargar() {
      const datos = await cargarMedicamentos();
      setMedicamentos(datos);
    }

    cargar();
  }, []);

  //Agrega un nuevo medicamento
  async function agregarMedicamento() {
    // Verifica que todos los campos estén completos
    if (!nombre || !dosis || !hora || !correo) {
      alert("Completa todos los campos.");
      return;
    }

    //Crea el nuevo objeto medicamento
    const nuevo: Medication = {
      id: Date.now().toString(),
      nombre,
      dosis,
      hora,
      correo,
      estado: "Pendiente",
    };

    //Actualiza la lista de medicamentos
    const nuevaLista = [...medicamentos, nuevo];
    setMedicamentos(nuevaLista);

    //Guarda la lista actualizada en AsyncStorage
    await guardarMedicamentos(nuevaLista);

    //Envía la informacion al webhook de n8n para generar el correo
    try {
      await enviarMedicamento(nuevo);
      alert("Medicamento registrado y recordatorio enviado correctamente.");
    } catch (error) {
      console.error("Error enviando a n8n:", error);
      alert("No se pudo enviar el recordatorio.");
    }

    //Limpia los campos del formulario
    setNombre("");
    setDosis("");
    setHora("");
    setCorreo("");
  }

  //Cambia el estado del medicamento a "Tomado"
  async function marcarComoTomado(id: string) {
    const actualizados = medicamentos.map((med) =>
      //El icono de palomita sacado de google
      med.id === id ? { ...med, estado: "Tomado ✅" } : med,
    );

    setMedicamentos(actualizados);

    //Guarda el cambio en AsyncStorage
    await guardarMedicamentos(actualizados);
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

//Estilos de la pantalla
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
