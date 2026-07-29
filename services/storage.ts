import AsyncStorage from "@react-native-async-storage/async-storage";
import { Medication } from "../types/Medication";

//Contraseña de asyncstorage
const STORAGE_KEY = "@medicamentos";

export async function cargarMedicamentos(): Promise<Medication[]> {
  try {
    const datos = await AsyncStorage.getItem(STORAGE_KEY);

    if (datos) {
      return JSON.parse(datos);
    }

    return [];
  } catch (error) {
    console.log("Error al cargar medicamentos:", error);
    return [];
  }
}

export async function guardarMedicamentos(
  medicamentos: Medication[],
): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(medicamentos));
  } catch (error) {
    console.log("Error al guardar medicamentos:", error);
  }
}
