import { prisma } from '@/lib/prisma';

export async function POST(req, context) {
    const param = await context.params;
    const userIdParam = param.id;
    const dateParam = param.date;

    if (!userIdParam) {
        return new Response(JSON.stringify({ error: 'Missing user id' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    if (!dateParam) {
        return new Response(JSON.stringify({ error: 'Missing date param' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const userID = parseInt(userIdParam, 10);
    if (isNaN(userID)) {
        return new Response(JSON.stringify({ error: 'Invalid user id' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const date = new Date(dateParam);
    const start = new Date(date.setHours(0, 0, 0, 0));
    const end = new Date(date.setHours(23, 59, 59, 999));
    const ticket = await prisma.ticket.findFirst({
        where: {
            date: {
                gte: start,
                lte: end,
            },
            customerID: userID,
        }
        })

    if (!ticket) {
        return new Response(JSON.stringify({ error: 'TicketExist' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const new_ticket = await prisma.ticket.create({
        data: {
            date: date,
            customerID: userID,
        },
    });

    return new Response(
        JSON.stringify({ ticket: new_ticket }),
        { status: 201 }
    );
}