import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';

export async function POST(req) {
    const { email, givenName, lastName, password, birthDate } = await req.json();

    const existingEmail = await prisma.user.findUnique({ where: { email } });
    if (existingEmail) {
        return new Response(JSON.stringify({ error: 'Email is already in use' }), { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
        data: {
            email,
            givenName,
            lastName,
            birthDate: new Date(birthDate), 
            password: hashedPassword,
        },
    });

    return new Response(
        JSON.stringify({ user: newUser }),
        { status: 201 }
    );
}
