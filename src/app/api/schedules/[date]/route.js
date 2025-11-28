import { prisma } from '@/lib/prisma';

export async function GET(req, context) {
    const params = await context.params;
    const dateParam = params.date;

    if (!dateParam) {
        return new Response(JSON.stringify({ error: 'Missing date' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const date = new Date(dateParam);
    
    const start = new Date(date.setHours(0, 0, 0, 0));
    const end = new Date(date.setHours(23, 59, 59, 999));

    const schedule = await prisma.schedule.findMany({
        where: {
            departure: {
                gte: start,
                lte: end,
                },
        },
        include: {
            route: true,
            trainInTransit: true,
            },
        }
    );

    if (!schedule) {
        return new Response(JSON.stringify({ error: 'Schedules not Found' }), { status: 400 });
    }

    const formatSchedule = schedule.map(s => {
        const dep = s.departure;
        const depHours = dep.getHours().toString().padStart(2, '0');
        const depMinutes = dep.getMinutes().toString().padStart(2, '0');

        const arrival = new Date(dep);
        arrival.setMinutes(arrival.getMinutes() + s.route.durationInMinutes);

        const arrivalHours = arrival.getHours().toString().padStart(2, '0');
        const arrivalMinutes = arrival.getMinutes().toString().padStart(2, '0');

        return {
            scheduleID: s.scheduleID,
            origin: s.originID,
            destination: s.destinationID,
            trainId: `T-${s.trainID.toString().padStart(4, '0')}`,
            departure: `${depHours}:${depMinutes}`,
            arrival: `${arrivalHours}:${arrivalMinutes}`
        };
    });


    return new Response(
        JSON.stringify({ schedules: formatSchedule }),
        {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        }
    );
}