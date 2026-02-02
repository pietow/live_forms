import { createClient, type Client } from '@libsql/client'
import { Contact } from './schema'

export async function insertContact({ name, email, reason, notes }: Contact) {
    let client: Client | undefined
    let ok = true
    let err: Error | undefined

    try {
        client = createClient({
            url: process.env.DB_URL ?? '',
        })

        await client.execute({
            sql: 'INSERT INTO contacts(name, email, reason, notes) VALUES (?, ?, ?, ?)',
            args: [name, email, reason, notes],
        })
    } catch (e) {
        ok = false
        err = e as Error
    }

    if (client) {
        client.close()
    }

    return { ok, err }
}
