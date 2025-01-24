'use server'

import jwt from 'jsonwebtoken'
import { createUser, getUserById } from '../user'
import { cookies } from 'next/headers'

const privateKey = process.env.NEXT_PUBLIC_JWT_SECRET!

export type Decoded = {
    sub: string,
    name: string,
    picture: string,
    email: string
}

export async function auth(credential :string) {
    const decoded = jwt.decode(credential)
    if (!decoded) return;

    const user = await createUser(decoded as Decoded);
    if (!user) return;

    const token = jwt.sign({ _id: user._id }, privateKey, { expiresIn: '1d' })
    const maxAge = 60 * 60 * 24 // 1 day;

    const cookieJar = await cookies();
    cookieJar.set({ name: "auth__token", value: token, maxAge })

    return user
}

export async function getAuthedUser() {
    const id = await getAuthedUserId();
    if (!id) return;

    const user = await getUserById(id)
    return user
}

export async function getAuthedUserId() {
    const cookieJar = await cookies();

    const token = cookieJar.get('auth__token')?.value;
    if (!token) return;

    const decoded = jwt.verify(token, privateKey) as { _id: string }
    return decoded._id
}