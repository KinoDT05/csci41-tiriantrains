import Table from "@/components/Table";
import IntAttribute from "@/components/IntAttribute";
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

const data = [
  {
    trainId: "S001",
    date: "2025-12-20",
    crew: "The Clean Up Crew",
    task: "Cleaning",
    condition: "Good",
  },
  {
    trainId: "S001",
    date: "2025-12-20",
    crew: "The Clean Up Crew",
    task: "Cleaning",
    condition: "Good",
  },
];


// End of Queries

export default function Train() {
  return (
    <div className="my-10">

      {/*Inside the header */}
      <div className="bg-primary p-5 rounded-3xl my-5">
          <div className="text-6xl font-bold my-2">Train ID: S001</div>    
          <div className="flex flex-row gap-5">

            {/* Replace this with a map */}
            <IntAttribute name="Model" value="S103" />
            <IntAttribute name="Max Speed (kph)" value="120" />
            <IntAttribute name="No. of Seats" value="70" />
            <IntAttribute name="No. of Toilets" value="70" />
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


