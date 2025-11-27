import { prisma } from '@/lib/prisma';

export async function POST() {
    const trains = await prisma.train.findMany({
        include: { trainModel: true },
        orderBy: { trainID: "asc" },
    });

    const data = trains.map(t => ({
        trainId: `T-${t.trainID.toString().padStart(4, '0')}`,
        trainModelID: `${t.trainType}-${t.trainModelID.toString().padStart(3, '0')}`,
        link: `Maintenance/Train/${t.trainID}`
    }));

    return new Response(
        JSON.stringify({ trains: data }),
        { status: 201 }
    );
}