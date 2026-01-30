export default async function Thanks({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    return (
        <main>
            <h2>Formular erflogreich übermittelt</h2>
            Danke, {(await searchParams).name}, wir werden uns melden.
        </main>
    )
}
