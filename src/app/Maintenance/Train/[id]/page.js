import Table from "@/components/Table";
import Attribute from "@/components/Attribute";
import BoolAttribute from "@/components/BoolAttribute";
import prisma from "../../../../../lib/prisma";


const columns = [
  { key: "date", label: "Date" },
  { key: "crew", label: "Crew" },
  { key: "crewInCharge", label: "Crew In Charge" },
  { key: "task", label: "Task" },
  { key: "condition", label: "Condition" },
];

export default async function Train({ params }) {
    const { id } = await params; // await here

    const trainIDParam = parseInt(id);

    console.log(params.id);
    const trainDetails = await prisma.train.findUniqueOrThrow({
        where: {
            trainID: trainIDParam
        },
        include: {
            trainModel: true
        }
    });

    const maintenance = await prisma.maintenanceHistory.findMany({
        where: {
            maintainedTrainID: trainIDParam
        },
        include: {
            crewAssigned: true
        }
    });

    const data = maintenance.map(t => ({
        date: t.date.toISOString().split("T")[0],
        crew: `${t.maintainer}`,
        crewInCharge: `${t.crewAssigned.inCharge}`,
        task: `${t.task}`,
        condition: `${t.condition}`,
    }));

    const trainID = `T-${trainDetails.trainID.toString().padStart(4, '0')}`;
    const trainModelID = `${trainDetails.trainModel.trainType}-${trainDetails.trainModel.modelID.toString().padStart(3, '0')}`;
    return (
    <div className="my-10">

      {/*Inside the header */}
      <div className="bg-primary p-5 rounded-3xl my-5">
              <div className="text-6xl font-bold my-2">Train ID: {trainID} </div>    
          <div className="flex flex-row gap-5">

            {/* Replace this with a map */}
                  <Attribute name="Model" value={trainModelID} />
                    <Attribute name="Max Speed (kph)" value={trainDetails.trainModel.maxSpeed} />
                    <Attribute name="No. of Seats" value={trainDetails.trainModel.noSeats} />
                    <Attribute name="No. of Toilets" value={trainDetails.trainModel.noToilets } />
          </div>
          
      </div>  
      
      <div className="flex ">
      {/* Replace this with a map */}
                <BoolAttribute name="Reclining Seats" bool={trainDetails.trainModel.hasRecliningSeats} />  
                <BoolAttribute name="Folding Table" bool={trainDetails.trainModel.hasFoldingTables} />  
                <BoolAttribute name="Disability Access" bool={trainDetails.trainModel.hasDisabilityAccess} />  
                <BoolAttribute name="Luggage Access" bool={trainDetails.trainModel.LuggageStorage} />  
                <BoolAttribute name="Vending Machine" bool={trainDetails.trainModel.hasVendingMachine} />  
                <BoolAttribute name="Food Service" bool={trainDetails.trainModel.hasFoodService} />  
      </div>
      
      <Table columns={columns} data={data} />

    </div>
  );
}


