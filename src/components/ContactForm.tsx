'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactSchema } from '@/data/schema'
import { insertContact } from '@/data/insertContact'
import { startTransition, useActionState, useRef } from 'react'
import { start } from 'repl'

export function ContactForm() {
    const [{ ok, error, errors, formData, attempts }, formAction, isPending] =
        useActionState(insertContact, {
            ok: false,
            error: '',
            formData: new FormData(),
            errors: { name: null, email: null, reason: null },
            attempts: 0,
        })

    const {
        handleSubmit,
        register,
        formState: { errors: clientErrors },
    } = useForm({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            name: '',
            email: '',
            reason: '',
            notes: '',
            ...(Object.fromEntries(formData) ?? {}),
        },
    })
    const formRef = useRef<HTMLFormElement>(null)

    function onSubmit() {
        startTransition(() => {
            if (!formRef.current) {
                return
            }
            formAction(new FormData(formRef.current))
        })
    }
    console.log('errors', errors)
    console.log('clientErrors', clientErrors)
    return (
        <form
            ref={formRef}
            action={formAction}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
        >
            <div className="field">
                <label htmlFor="name">Dein Name</label>
                <input
                    type="text"
                    id="name"
                    defaultValue={(formData.get('name') ?? '') as string}
                    {...register('name')}
                />
                <FieldError
                    clientErrors={clientErrors.name}
                    serverError={errors.name}
                    errorId="name-error"
                />
            </div>
            <div className="field">
                <label htmlFor="email">Deine email Adresse</label>
                <input
                    type="email"
                    id="email"
                    {...register('email')}
                    defaultValue={(formData.get('email') ?? '') as string}
                />
                <FieldError
                    clientErrors={clientErrors.email}
                    serverError={errors.email}
                    errorId="email-error"
                />
            </div>

            <div className="field">
                <label htmlFor="grund">Grund für Kontak</label>
                <select
                    {...register('reason')}
                    id="grund"
                    defaultValue={(formData.get('reason') ?? '') as string}
                >
                    <option value=""></option>
                    <option value="Support">Support</option>
                    <option value="Feedback">Feedback</option>
                    <option value="Andere">Andere</option>
                </select>
                <FieldError
                    clientErrors={clientErrors.reason}
                    serverError={errors.reason}
                    errorId="reason-error"
                />
            </div>
            <div className="field">
                <label htmlFor="notes">Zusätzlice Kommentar</label>
                <textarea
                    id="notes"
                    {...register('notes')}
                    defaultValue={(formData.get('notes') ?? '') as string}
                />
            </div>
            {!ok && (
                <p role="alert" className="error">
                    {error}
                </p>
            )}
            {isPending && <p role="alert">Saving ...</p>}
            {attempts >= 3 && (
                <p role="alert" className="error">
                    Du hats das Formular zu oft abgeschickt. Bitte versuche es
                    apäter erneut.
                </p>
            )}
            <button type="submit" disabled={isPending || attempts >= 3}>
                Submit
            </button>
        </form>
    )
}

type Err = { message?: string } | null | undefined

function FieldError({
    clientErrors,
    serverError,
    errorId,
}: {
    clientErrors: Err
    serverError: Err
    errorId: string
}) {
    const error = clientErrors ?? serverError

    if (!error) {
        return null
    }

    return (
        <div id={errorId} role="alert">
            {error.message}
        </div>
    )
}
