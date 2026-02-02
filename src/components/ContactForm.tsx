'use client'

import { insertContact } from '@/data/insertContact'
import { error } from 'console'
import { useActionState } from 'react'

export function ContactForm() {
    const [{ ok, error, errors, formData }, formAction, isPending] =
        useActionState(insertContact, {
            ok: false,
            error: '',
            formData: new FormData(),
            errors: { name: null, email: null, reason: null },
        })
    return (
        <form action={formAction}>
            <div className="field">
                <label htmlFor="name">Dein Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    defaultValue={(formData.get('name') ?? '') as string}
                />
                <FieldError serverError={errors.name} errorId="name-error" />
            </div>
            <div className="field">
                <label htmlFor="email">Deine email Adresse</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    defaultValue={(formData.get('email') ?? '') as string}
                />
                <FieldError serverError={errors.email} errorId="email-error" />
            </div>

            <div className="field">
                <label htmlFor="grund">Grund für Kontak</label>
                <select
                    name="reason"
                    id="grund"
                    defaultValue={(formData.get('reason') ?? '') as string}
                >
                    <option value=""></option>
                    <option value="Support">Support</option>
                    <option value="Feedback">Feedback</option>
                    <option value="Andere">Andere</option>
                </select>
                <FieldError serverError={errors.reason} errorId="reason-error" />
            </div>
            <div className="field">
                <label htmlFor="notes">Zusätzlice Kommentar</label>
                <textarea
                    id="notes"
                    name="notes"
                    defaultValue={(formData.get('notes') ?? '') as string}
                />
            </div>
            {!ok && (
                <p role="alert" className="error">
                    {error}
                </p>
            )}
            {isPending && <p role="alert">Saving ...</p>}
            <button type="submit" disabled={isPending}>
                Submit
            </button>
        </form>
    )
}

type Err = { message?: string } | null

function FieldError({
    serverError,
    errorId,
}: {
    serverError: Err
    errorId: string
}) {
    if (!serverError) {
        return null
    }

    return (
        <div id={errorId} role="alert">
            {serverError.message}
        </div>
    )
}
