import Table from "@/components/Table";
import Header from "@/components/Header";

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

export default function Sales() {
  return (
      <div className="my-5">
      <Header name="Ticket Sales" desc="This view contains a list of ticket sales." />
      <Table columns={columns} data={data} />

      </div>
      
    );
}
