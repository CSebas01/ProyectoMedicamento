import axios from "axios";
import { Medication } from "../types/Medication";

//URL del webhook de n8n
//usa la ip de mi equipo para conectar el dispositivo movil y la pc por lo que no puede usar localhost
const WEBHOOK_URL = "http://192.168.0.33:5678/webhook/Medicamentos";

//Envía la información del medicamento al workflow de n8n
export async function enviarMedicamento(medicamento: Medication) {
  try {
    const response = await axios.post(WEBHOOK_URL, medicamento);

    //Devuelve la respuesta del webhook
    return response.data;
  } catch (error) {
    console.error("Error enviando medicamento a n8n:", error);
    throw error;
  }
}
