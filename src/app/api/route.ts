import { type NextRequest } from 'next/server'
import { insertContact } from '@/data/insertContact'

export async function POST(request: NextRequest) {
    console.log('ENDPUNKT')
    const data = await request.json()
    console.log(data)
    const result = await insertContact(data)
    console.log(result.err)

    if (result.ok) {
        return Response.json({}, { status: 201 }) 
    }  

    return Response.json({}, { status: 500 })
}
