import { prisma } from '@/lib/prisma';

export async function GET(req, context) {
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

    const user = await prisma.user.findUnique({
        where: {
            customerID: userID,
        },
    });

    const ticket = await prisma.ticket.findFirst({
        where: {
            customerID: userID,
            date: { gte: start, lte: end }
        },
    });
    
    if (!user) {
        return new Response(JSON.stringify({ error: 'User not Found' }), { status: 400 });
    }

    if (!ticket) {
        const formatUser = {
            userID: `${user.customerID.toString().padStart(4, '0')}`,
            givenName: user.givenName,
            lastName: user.lastName,
            middleInitial: user.middleInitial,
            gender: user.gender,
            customerID: user.customerID,
            birthDate: user.birthDate.toISOString().split("T")[0],
            ticket: ticket,
            totalCost: 0
        }

        return new Response(
            JSON.stringify({ user: formatUser }),
            { status: 201 }
        );
    }
    const itineraries = await prisma.itinerary.findMany({
        where: { ticketID: ticket.ticketID },        
        include: {
            schedule: {
                include: { route: true }   
            }
        }
    });

    const totalCost = itineraries.reduce((sum, it) => {
        return sum + (it.schedule?.route?.cost || 0); // defensive check
    }, 0);

    const updatedTicket = await prisma.ticket.update({
        where: { ticketID: ticket.ticketID },  
        data: { total_cost: totalCost },
        include: {
            itinerary: {
                include: {              
                    schedule: {
                        include: {
                            route: true,
                        },
                    },
                },
            },
        },
    });


    const intineraryFormatted = updatedTicket.itinerary.map(i => {

        const dep = i.schedule.departure;
        const depHours = dep.getHours().toString().padStart(2, '0');
        const depMinutes = dep.getMinutes().toString().padStart(2, '0');

        const arrival = new Date(dep);
        arrival.setMinutes(arrival.getMinutes() + i.schedule.route.durationInMinutes);

        const arrivalHours = arrival.getHours().toString().padStart(2, '0');
        const arrivalMinutes = arrival.getMinutes().toString().padStart(2, '0');

        const hours = Math.floor(i.schedule.route.durationInMinutes / 60); // full hours
        const mins = i.schedule.route.durationInMinutes % 60;

        return {
            trainId: `T-${i.schedule.trainID.toString().padStart(4, '0')}`,
            origin: i.schedule.route.originID,
            destination: i.schedule.route.destinationID,
            departure: `${depHours}:${depMinutes}`,
            arrival: `${arrivalHours}:${arrivalMinutes}`,
            duration: `${hours.toString()}h ${mins.toString().padStart(2,'0')}min`,
            cost: `${i.schedule.route.cost} Lion coins` ,
        };


    })

    const formatUser = {
        userID: `${user.customerID.toString().padStart(4, '0')}`, 
        givenName: user.givenName,
        lastName: user.lastName,
        customerID: user.customerID,
        middleInitial: user.middleInitial,
        gender: user.gender,
        birthDate: user.birthDate.toISOString().split("T")[0],
        ticket: updatedTicket,
        itinerary: intineraryFormatted,
        totalCost: updatedTicket.total_cost
        }

    

    return new Response(
        JSON.stringify({ user: formatUser }),
        { status: 201 }
    );
}