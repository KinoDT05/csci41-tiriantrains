/**
 * This is the main maintenance history page
 */
import Header from "@/components/Header";
import LinkTable from "@/components/LinkTable";
import Button from "@/components/Button";
import { prisma } from '@/lib/prisma';


// Make your queries here !!!
// Just an example
const columns = [
  { key: "trainId", label: "Train ID" },
  { key: "trainModelID", label: "Train Model" },
  { key: "link"}
];



export default async function Maintenance() {
    const trains = await prisma.train.findMany({
        include: { trainModel: true },
        orderBy: { trainID: "asc" },
    });

    const data = trains.map(t => ({
        trainId: `T-${t.trainID.toString().padStart(4, '0')}`,
        trainModelID: `${t.trainModel.trainType}-${t.trainModelID.toString().padStart(3, '0')}`,
        link: `Maintenance/Train/${t.trainID}`
    }));

    console.log(columns)
    console.log(data)

    // End of Queries
   return (
    <div className="my-10">
    <Header name="Maintenance History" desc="This view contains a list of maintenance histories." />
    <div className="flex flex-row gap-2">
      <Button name="Employees" link="Maintenance/Employees"/>
      <Button name="Crews" link="Maintenance/Crews"/>

    </div>
    <LinkTable columns={columns} data={data} />

    </div>
  );
}




