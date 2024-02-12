import { z } from "zod";

export const cardSchema = z.object({
  typeCardId: z.string({
    required_error: "El tipo de tarjeta es requerido",
  }),
  description: z.string(),
  rfid: z.string({
    required_error: "RFID es requerido",
  }),
});
