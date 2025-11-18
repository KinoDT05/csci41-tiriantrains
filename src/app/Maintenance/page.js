/**
 * This is the main maintenance history page
 */
import Header from "@/components/Header";
import Table from "@/components/Table";
import Button from "@/components/Button";

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

export default function Maintenance() {
  return (
    <div className="my-10">
    <Header name="Maintenance History" desc="This view contains a list of maintenance histories." />
    <div className="flex flex-row gap-2">
      <Button name="Employees" link="Maintenance/Employees"/>
      <Button name="Crews" link="Maintenance/Crews"/>

    </div>
    <Table columns={columns} data={data} />

    </div>
  );
}




