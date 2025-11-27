import { prisma } from '@/lib/prisma';

export async function GET(req, context) {
    const params = await context.params;
    const userID = params.id;

    if (!userID) {
        return new Response(JSON.stringify({ error: 'Missing trainId' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const userIntID = parseInt(userID, 10);
    if (isNaN(userIntID)) {
        return new Response(JSON.stringify({ error: 'Invalid trainId' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const day = new Date();
    const start = new Date(day.setHours(0, 0, 0, 0));
    const end = new Date(day.setHours(23, 59, 59, 999));


    const user = await prisma.user.findUnique({
        where: { customerID: userIntID },
        include: {
            tickets: {
                where: {
                    date: {
                        gte: start,
                        lte: end,
                    },
                    },
                },
            },
    });

    if (!user) {
        return new Response(JSON.stringify({ error: 'User not Found' }), { status: 400 });
    }

    const formatUser = {
        userID: `${user.customerID.toString().padStart(4, '0')}`, 
        givenName: user.givenName,
        lastName: user.lastName,
        customerID: user.customerID,
        birthDate: user.birthDate.toISOString().split("T")[0],
        tickets: user.tickets
        }

    

    return new Response(
        JSON.stringify({ user: formatUser }),
        { status: 201 }
    );
}