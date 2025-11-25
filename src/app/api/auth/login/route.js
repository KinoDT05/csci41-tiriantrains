import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';
import { NextResponse } from "next/server";

export async function POST(req) {
    const { email, password } = await req.json();

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
        return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
    }

    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
        return new Response(JSON.stringify({ error: 'Invalid password' }), { status: 401 });
    }

    const response = NextResponse.json({ user: { id: user.customerID, email: user.email } });
    response.cookies.set({
        name: "loggedIn",
        value: String(user.customerID), // store user ID
        path: "/",
        httpOnly: false,
        sameSite: "strict",
        maxAge: 60 * 60 * 24, // 1 day
    });


    
    return new Response(
        JSON.stringify({ user: { id: user.id, email: user.email, givenName: user.givenName, lastName: user.lastName } }),
        { status: 201 }
    );
}
