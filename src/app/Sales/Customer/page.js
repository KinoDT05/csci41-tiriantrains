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
    origin: "New York",
    destination: "Washington D.C.",
    departure: "2025-12-20 08:00",
    arrival: "2025-12-20 12:00",
    duration: "4h 0m",
    cost: "$120",
  },
  {
    trainId: "S002",
    origin: "Boston",
    destination: "Philadelphia",
    departure: "2025-12-20 09:30",
    arrival: "2025-12-20 14:00",
    duration: "4h 30m",
    cost: "$135",
  },
  {
    trainId: "S003",
    origin: "Chicago",
    destination: "St. Louis",
    departure: "2025-12-21 07:15",
    arrival: "2025-12-21 11:00",
    duration: "3h 45m",
    cost: "$95",
  },
  {
    trainId: "S004",
    origin: "Los Angeles",
    destination: "San Francisco",
    departure: "2025-12-21 10:00",
    arrival: "2025-12-21 16:00",
    duration: "6h 0m",
    cost: "$150",
  },
  {
    trainId: "S005",
    origin: "Seattle",
    destination: "Portland",
    departure: "2025-12-22 06:45",
    arrival: "2025-12-22 10:15",
    duration: "3h 30m",
    cost: "$80",
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
      <h1 className="text-5xl">Trip Itinerary</h1>
      <Table columns={columns} data={data} />

    </div>
  );
}


