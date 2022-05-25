import { Document } from 'mongoose'

export interface User {
    name: string
    lastName: String
    email: string
    password: string
    phone: string
    rol: Rol
    online?: boolean
    img?: string
}

export interface UserDoc extends User, Document {
    uid: string
    comparePassword: (password: string) => Promise<boolean>
}

export type Rol = 'seller' | 'admin' | 'client'
