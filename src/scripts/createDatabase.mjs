import { createClient } from "@libsql/client";

const client = createClient({
    url: "file:src/data/forms.db",
});

await client.execute(`
    CREATE TABLE IF NOT EXISTS contacts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        reason TEXT,
        notes TEXT,
        done INTEGER
    )
`);

console.log("Database table created successfully");