import { prisma } from '@/lib/prisma';

export async function GET(req, context) {
    const params = await context.params;   // unwrap the promise
    const trainId = params.id;   
    console.log(trainId);

    if(!trainId) {
        return new Response(JSON.stringify({ error: 'Missing trainId' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const numericTrainId = parseInt(trainId, 10);
    if (isNaN(numericTrainId)) {
        return new Response(JSON.stringify({ error: 'Invalid trainId' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    try {
        const train = await prisma.train.findUnique({
            where: { trainID: numericTrainId },
            include: {
                trainModel: true,
                maintenanceHistories: true,
            },
        });

        const formattedTrain = {
            trainId: `T-${train.trainID.toString().padStart(4, '0')}`,
            trainModelID: `${train.trainType}-${train.trainModelID.toString().padStart(3, '0')}`,
            maxSpeed: train.trainModel.maxSpeed,
            noSeats: train.trainModel.noSeats,
            noToilets: train.trainModel.noToilets,
            hasRecliningSeats: train.trainModel.hasRecliningSeats,
            hasFoldingTables: train.trainModel.hasFoldingTables,
            hasDisabilityAccess: train.trainModel.hasDisabilityAccess,
            LuggageStorage: train.trainModel.LuggageStorage,
            VendingMachine: train.trainModel.VendingMachine,
            hasFoodService: train.trainModel.hasFoodService,
            maintenanceHistories: train.maintenanceHistories.map(h => ({
                date: h.date.toISOString().split("T")[0],
                crewInCharge: h.crewInCharge,
                task: h.task,
                condition: h.condition,
            })),
        };
        return new Response(JSON.stringify({ train: formattedTrain }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Server error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}