import { prisma } from '@/lib/prisma';

export async function GET(req, context) {
    const params = await context.params;
    const location = params.location;

    if (!location) {
        return new Response(JSON.stringify({ error: 'Missing location' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    let routes;

    if (location === "All") {
        routes = await prisma.route.findMany();
    } else {
        routes = await prisma.route.findMany({
            where: { location: location },

        });
    }

    if (!routes) {
        return new Response(JSON.stringify({ error: 'Routes not Found' }), { status: 400 });
    }

    const formatRoutes = routes.map(r => ({
        origin: r.originID,
        destination: r.destinationID,
        location: r.location
    }));



    return new Response(
        JSON.stringify({ routes: formatRoutes }),
        { status: 201 }
    );
}