import { z } from 'zod'

export const contactSchema = z.object({
    name: z
        .string()
        .min(1, { message: 'Name fehlt' })
        .max(50, {
            message: 'Name darf nicht mehr als 50 Charktere enthalten',
        }),
    email: z.email({
        message: 'Es muss eine gültige Email-addresse angegeben werden',
    }),
    reason: z.string().min(1, {
        message: 'Gib einen Grund an',
    }),
    notes: z.string().optional(),
})
