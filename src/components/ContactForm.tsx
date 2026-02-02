'use client'

import { Contact } from "@/data/schema"
import { useRouter } from "next/navigation"

export function ContactForm() {
    const router = useRouter()
    async function handleAction(formData: FormData) {
        console.log('formData: ', formData)
        const contact = Object.fromEntries(formData) as Contact
        console.log('contact object: ', contact)

        const response = await fetch('/api', {
            method: 'POST',
            body: JSON.stringify(contact),
        })

        if (!response.ok) {
            console.error('Something went wrong')
            return
        }

        router.push('/thanks?name='+ encodeURIComponent(contact.name))

    }
    return (
        <form action={handleAction}>
            <div className="field">
                <label htmlFor="name">Dein Name</label>
                <input type="text" id="name" name="name" />
            </div>
            <div className="field">
                <label htmlFor="email">Deine email Adresse</label>
                <input type="email" id="email" name="email" />
            </div>

            <div className="field">
                <label htmlFor="grund">Grund für Kontak</label>
                <select name="reason" id="grund">
                    <option value=""></option>
                    <option value="Support">Support</option>
                    <option value="Feedback">Feedback</option>
                    <option value="Andere">Andere</option>
                </select>
            </div>
            <div className="field">
                <label htmlFor="notes">Zusätzlice Kommentar</label>
                <textarea id="notes" name="notes" />
            </div>
            <button type="submit">Submit</button>
        </form>
    )
}
