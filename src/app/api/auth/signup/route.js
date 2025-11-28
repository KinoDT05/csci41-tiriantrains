import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(req) {
    const { email, givenName, lastName, password, birthDate, middleInitial, gender } = await req.json();

    const existingEmail = await prisma.user.findUnique({ where: { email } });
    if (existingEmail) {
        return new Response(JSON.stringify({ error: 'Email is already in use' }), { status: 400 });
    }

    if (middleInitial.length > 1) {
        return new Response(JSON.stringify({ error: 'Middle Initial should be one character' }), { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
        data: {
            email,
            givenName,
            lastName,
            birthDate: new Date(birthDate),
            password: hashedPassword,
            middleInitial: middleInitial,
            gender: gender
        },
    });

    return new Response(
        JSON.stringify({ user: newUser }),
        { status: 201 }
    );
}