import Image from "next/image";
import Header from "@/components/Header";
import Table from "@/components/Table";


// Make your queries here !!!
// Just an example
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

export default function Schedule() {
  return (
      <div className="my-5">
      <Header name="Trip Schedule" desc="This view contains a list of trip schedules." />
          <Table columns={columns} data={data} />
      
      </div>
    );
}
