import Table from "@/components/Table";
import Attribute from "@/components/Attribute";
import BoolAttribute from "@/components/BoolAttribute";

/**
 * Make your queries here!!!
 * This is just a sample
 */
const columns = [
  { key: "trainId", label: "TrainID" },
  { key: "date", label: "Date" },
  { key: "crew", label: "Crew In Charge" },
  { key: "task", label: "Task" },
  { key: "condition", label: "Condition" },
];

// End of Queries

export default async function Train() {
  const trainModelDetails = await prisma.trainModel.findMany({
    include: {},
    orderBy: {modelID: "asc"},
  });

  const maintenanceHistoryDetails = await prisma.maintenanceHistory.findMany({
    include: {crewAssigned: true, trainMaintained: true},
    orderBy: { maintainedTrainID: "asc" },
  });

  //const header = trains.map

  // I DONT QUITE KNOW HOW TO MAKE THIS A HEADER YET
  //const data = trainModelDetails.map(t => ({
  //  trainId: `T-${t.trainID.toString().padStart(4, '0')}`,
  //  modelId: `${t.trainModel.trainType}-${t.trainModelID.toString().padStart(3, '0') }`,
  //  maxSpeed: ``,
  //  noSeats: ``,
  //  noToilets: ``,
  //}));

  const data = maintenanceHistoryDetails.map(t => ({
        maintainedTrainID: `T-${t.maintainedTrainID.toString().padStart(4, '0')}`,
        date: `${t.date.toString()}`,
        crewAssigned: `${t.crewAssigned.toString()}`,
        task: `${t.task.toString()}`,
        condition: `${t.condition}`,
    }));

  return (
    <div className="my-10">

      {/*Inside the header */}
      <div className="bg-primary p-5 rounded-3xl my-5">
          <div className="text-6xl font-bold my-2">Train ID: S001</div>    
          <div className="flex flex-row gap-5">

            {/* Replace this with a map */}
            <Attribute name="Model" value="S103" />
            <Attribute name="Max Speed (kph)" value="120" />
            <Attribute name="No. of Seats" value="70" />
            <Attribute name="No. of Toilets" value="70" />
          </div>
          
      </div>  
      
      <div className="flex ">
      {/* Replace this with a map */}
        <BoolAttribute name="Reclining Seats" bool={true} />  
        <BoolAttribute name="Folding Table" bool={true} />  
        <BoolAttribute name="Disability Access" bool={true} />  
        <BoolAttribute name="Luggage Access" bool={false} />  
        <BoolAttribute name="Vending Machine" bool={true} />  
        <BoolAttribute name="Food Service" bool={true} />  
      </div>
      
      <Table columns={columns} data={data} />

    </div>
  );
}


