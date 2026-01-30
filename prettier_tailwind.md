## Schritt 1: Installieren

```bash
npm i -D prettier-plugin-tailwindcss
```

## Schritt 2: In Prettier aktivieren

* `.prettierrc` ergänzen/erstellen:

```json
{
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

## Schritt 3: Ausführen

```bash
npx prettier . --write
```

## Nächster Schritt

* Wenn du in VS Code "Format on Save" aktiv hast, werden Tailwind-Klassen ab jetzt beim Speichern automatisch sortiert.
