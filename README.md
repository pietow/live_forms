# Live Forms

Eine moderne Formular-Anwendung, gebaut mit **Next.js 16**, **React 19**, **TypeScript** und **Tailwind CSS**.  
Der Fokus liegt auf typsicherer Formularverarbeitung, Validierung und einer sauberen Komponentenarchitektur.

## Technologie-Stack

- **Framework:** Next.js 16
- **Sprache:** TypeScript
- **Styling:** Tailwind CSS
- **Linting & Formatierung:** ESLint, Prettier

## Lokale Entwicklung
```bash
npm install
npm run dev
```

Anwendung unter [http://localhost:3000](http://localhost:3000) im Browser öffnen.

## Projektstruktur
```
src/
├── app/        # Next.js App Router – Seiten & Layouts
├── components/ # Wiederverwendbare Formular-Komponenten
└── lib/        # Validierungslogik & Hilfsfunktionen
```

## Features

- Typsichere Formularverarbeitung mit TypeScript
- Wiederverwendbare, komposierbare Eingabe-Komponenten
- Responsives Layout mit Tailwind CSS
- Serverseitige Verarbeitung über Next.js App Router
- Einheitlicher Code-Stil durch ESLint & Prettier
- clientseitige und serverseitige Validierung mit React Form Hook, useActionState und Zod
```
