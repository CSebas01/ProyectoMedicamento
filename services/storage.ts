import AsyncStorage from "@react-native-async-storage/async-storage";
import { Medication } from "../types/Medication";

//Clave utilizada para almacenar la lista de medicamentos en AsyncStorage
//No es necesario ocultarlo pues solamente es almacenamiento local, no maneja datos sensibles
const STORAGE_KEY = "@medicamentos";

//Obtiene los medicamentos almacenados en el dispositivo
export async function cargarMedicamentos(): Promise<Medication[]> {
  try {
    const datos = await AsyncStorage.getItem(STORAGE_KEY);

    if (datos) {
      return JSON.parse(datos);
    }

    return [];
  } catch (error) {
    console.error("Error al cargar medicamentos:", error);
    return [];
  }
}

//Guarda la lista de medicamentos en AsyncStorage
export async function guardarMedicamentos(
  medicamentos: Medication[],
): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(medicamentos));
  } catch (error) {
    console.error("Error al guardar medicamentos:", error);
  }
}
