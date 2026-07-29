import axios from "axios";
import { Medication } from "../types/Medication";

const WEBHOOK_URL = "http://localhost:5678/webhook-test/Medicamentos";

export async function enviarMedicamento(medicamento: Medication) {
  try {
    const response = await axios.post(WEBHOOK_URL, medicamento);

    console.log("Respuesta de n8n:", response.data);

    return response.data;
  } catch (error) {
    console.error("Error enviando medicamento:", error);
    throw error;
  }
}
