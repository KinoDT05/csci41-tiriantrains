import Table from "@/components/Table";
import Attribute from "@/components/Attribute";
import BoolAttribute from "@/components/BoolAttribute";
import prisma from "../../../../../lib/prisma";


const columns = [
  { key: "date", label: "Date" },
  { key: "crew", label: "Crew In Charge" },
  { key: "task", label: "Task" },
  { key: "condition", label: "Condition" },
];

export default async function Train() {
    const trainDetails = await prisma.train.findUniqueOrThrow({
        where: {
            trainID: 1
        },
    });

    const maintenance = await prisma.maintenanceHistory.findMany({
        where: {
            maintainedTrainID: 1
        },
    });

    console.log(maintenance)

    const model = await prisma.trainModel.findUniqueOrThrow({
        where: {
            modelID: trainDetails.trainModelID
        }
    });

    const data = maintenance.map(t => ({
        date: `${t.date.toString()}`,
        crew: `${t.crewAssigned.toString()}`,
        task: `${t.task.toString()}`,
        condition: `${t.condition}`,
    }));

    const trainID = `T-${trainDetails.trainID.toString().padStart(4, '0')}`;
    const trainModelID = `${model.trainType}-${model.modelID.toString().padStart(3, '0')}`;
    return (
    <div className="my-10">

      {/*Inside the header */}
      <div className="bg-primary p-5 rounded-3xl my-5">
              <div className="text-6xl font-bold my-2">Train ID: {trainID} </div>    
          <div className="flex flex-row gap-5">

            {/* Replace this with a map */}
                  <Attribute name="Model" value={trainModelID} />
                    <Attribute name="Max Speed (kph)" value={model.maxSpeed} />
                    <Attribute name="No. of Seats" value={model.noSeats} />
                    <Attribute name="No. of Toilets" value={model.noToilets } />
          </div>
          
      </div>  
      
      <div className="flex ">
      {/* Replace this with a map */}
                <BoolAttribute name="Reclining Seats" bool={model.hasRecliningSeats} />  
                <BoolAttribute name="Folding Table" bool={model.hasFoldingTables} />  
        <BoolAttribute name="Disability Access" bool={model.hasDisabilityAccess} />  
        <BoolAttribute name="Luggage Access" bool={model.LuggageStorage} />  
        <BoolAttribute name="Vending Machine" bool={model.hasVendingMachine} />  
        <BoolAttribute name="Food Service" bool={model.hasFoodService} />  
      </div>
      
      <Table columns={columns} data={data} />

    </div>
  );
}


