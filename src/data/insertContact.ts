'use server'

import { createClient, type Client } from '@libsql/client'
import { redirect } from 'next/navigation'
import { contactSchema } from './schema'
import z from 'zod'

type Err = { message: string }

type FieldErrors = {
    name: Err | null
    email: Err | null
    reason: Err | null
}

type ActionState = {
    ok: boolean
    error: string
    formData: FormData
    errors: FieldErrors
    attempts: number
}

export async function insertContact(
    previousState: ActionState,
    formData: FormData,
) {
    const parsedResult = contactSchema.safeParse(Object.fromEntries(formData))

    const attempts = previousState.attempts + 1

    if (!parsedResult.success) {
        return {
            ...previousState,
            ok: false,
            error: 'Konnte nicht speichern - Ungültige Eingabewerte',
            formData,
            errors: formatZodErrors(parsedResult.error),
            attempts: attempts,
        }
    }

    const { name, email, reason, notes } = parsedResult.data

    let client: Client | undefined
    let ok = true
    let error: string = ''

    try {
        client = createClient({
            url: process.env.DB_URL ?? '',
        })

        await client.execute({
            sql: 'INSERT INTO contacts(name, email, reason, notes) VALUES (?, ?, ?, ?)',
            args: [name, email, reason, notes ? notes : null],
        })
    } catch (e) {
        ok = false
        error = e instanceof Error ? e.message : 'Probleme beim speicherns'
    }

    if (client) {
        client.close()
    }

    if (ok) {
        redirect(`/thanks/?name=${encodeURIComponent(name)}`)
    }

    return {
        ok,
        error,
        formData,
        errors: { name: null, email: null, reason: null },
        attempts: attempts,
    }
}

function formatZodErrors(error: z.ZodError): FieldErrors {
    const formattedErrors: FieldErrors = {
        name: null,
        email: null,
        reason: null,
    }

    for (const issue of error.issues) {
        const field = issue.path[0]
        if (field === 'name' && !formattedErrors.name) {
            formattedErrors.name = { message: issue.message }
        } else if (field === 'email' && !formattedErrors.email) {
            formattedErrors.email = { message: issue.message }
        } else if (field === 'reason' && !formattedErrors.reason) {
            formattedErrors.reason = { message: issue.message }
        }
    }

    return formattedErrors
}

//formatZodErrors(parsedResult.error)
