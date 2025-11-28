import { prisma } from '@/lib/prisma';

export async function POST(req, context) {
    const param = await context.params;
    const userIdParam = param.id;
    const dateParam = param.date;
    const scheduleParam = param.schedule;

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

    if (!scheduleParam) {
        return new Response(JSON.stringify({ error: 'Missing schedule id' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const userID = parseInt(userIdParam, 10);
    const scheduleID = parseInt(scheduleParam, 10);
    if (isNaN(userID)) {
        return new Response(JSON.stringify({ error: 'Invalid user id' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    if (isNaN(scheduleID)) {
        return new Response(JSON.stringify({ error: 'Invalid schedule id' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const date = new Date(dateParam);
    const start = new Date(date.setHours(0, 0, 0, 0));
    const end = new Date(date.setHours(23, 59, 59, 999));

    let ticket;

    ticket = await prisma.ticket.findFirst({
        where: {
            date: {
                gte: start,
                lte: end,
            },
            customerID: userID,
        }
    })

 
    if (!ticket) {
        return new Response(JSON.stringify({ error: 'Ticket does not exist' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const ticketID = ticket.ticketID;

    const new_itinerary = await prisma.itinerary.create({
        data: {
            scheduleID: scheduleID,
            ticketID: ticketID,
        },
        include: {
            schedule: {
                include: {
                    route: true, 
                }
            }
        },
    });

    const totalCost = ticket.total_cost + new_itinerary.schedule.route.cost;

    const updatedTicket = await prisma.ticket.update({
        where: { ticketID: ticketID },  
        data: {
            total_cost: totalCost,
        },
    });

    return new Response(
        JSON.stringify({ itinerary: new_itinerary, ticket: updatedTicket }),
        { status: 201 }
    );

}