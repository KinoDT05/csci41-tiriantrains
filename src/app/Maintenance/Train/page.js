import Header from "@/components/Header";
import Table from "@/components/Table";
import IntAttribute from "@/components/IntAttribute";

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
    <div className="bg-[#ECEDDE] p-5 rounded-3xl my-5">
        <div className="text-6xl font-bold">Train</div>    
        <IntAttribute name="Model" value="S103" />
        
        </div>    
    <a href="/Maintenance/Employees">Employee List</a>
    <a href="/Maintenance/Crews">Crews</a>
    <Table columns={columns} data={data} />

    </div>
  );
}


