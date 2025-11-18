import Table from "@/components/Table";
import Attribute from "@/components/Attribute";
import BoolAttribute from "@/components/BoolAttribute";

/**
 * Make your queries here!!!
 * This is just a sample
 */
const columns = [
  { key: "trainId", label: "Train ID" },
  { key: "origin", label: "Origin" },
  { key: "destination", label: "Destination" },
  { key: "departure", label: "Departure" },
    { key: "arrival", label: "Arrival" },
  { key: "duration", label: "Duration" },
    { key: "cost", label: "Cost" },



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

export default function Customer() {
  return (
    <div className="my-10">

      {/*Inside the header */}
      <div className="bg-primary p-5 rounded-3xl my-5">
        <div className="flex flex-row justify-between">
            <div className="text-6xl font-bold my-2">Customer ID: 7288</div>    
            <Attribute name="Date" value="2025-12-20" color={true} />
        </div>
          
        <div className="flex flex-row justify-between items-end">
            <div className="w-3/4 flex flex-wrap gap-5">
                {/* Replace this with a map */}
                <Attribute name="Last Name" value="Grove" />
                <Attribute name="First Name" value="Adam" />
                <Attribute name="Middle Initial" value="L" />
                <Attribute name="Gender" value="Male" />
                <Attribute name="Birthday" value="2025-12-20" />
            </div>
            <Attribute name="Total Cost" value="26 coins" color={true} />
        </div>    
      </div>  
      
      <Table columns={columns} data={data} />

    </div>
  );
}


