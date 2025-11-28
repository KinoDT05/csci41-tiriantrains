'use client';

import Table from "@/components/Table";
import Attribute from "@/components/Attribute";
import BoolAttribute from "@/components/BoolAttribute";
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

const columns = [
  { key: "date", label: "Date" },
  { key: "crewInCharge", label: "Crew In Charge" },
  { key: "task", label: "Task" },
  { key: "condition", label: "Condition" },
];

export default function Train() {
    const params = useParams();
    const trainId = params.id;
    const [train, setTrain] = useState(null);

    useEffect(() => {
        if (!trainId) return;

        async function fetchTrain() {
            const res = await fetch(`/api/train/${trainId}`);
            if (!res.ok) {
                setTrain(null);
                return;
            }
            const json = await res.json();
            setTrain(json.train);
        }

        fetchTrain();
    }, [trainId]);

    console.log(trainId)
    console.log(train)
    
    if (!train) return <div>Loading...</div>;
    console.log(train.maintenanceHistory)
    return (
        
    <div className="my-10">

      {/*Inside the header */}
      <div className="bg-primary p-5 rounded-3xl my-5">
              <div className="text-6xl font-bold my-2">Train ID: {train.trainId} </div>    
          <div className="flex flex-row gap-5">

                  <Attribute name="Model" value={train.trainModelID} />
                    <Attribute name="Max Speed (kph)" value={train.maxSpeed} />
                    <Attribute name="No. of Seats" value={train.noSeats} />
                    <Attribute name="No. of Toilets" value={train.noToilets } />
          </div>
          
      </div>  
      
      <div className="flex ">
                <BoolAttribute name="Reclining Seats" bool={train.hasRecliningSeats} />  
                <BoolAttribute name="Folding Table" bool={train.hasFoldingTables} />  
                <BoolAttribute name="Disability Access" bool={train.hasDisabilityAccess} />  
                <BoolAttribute name="Luggage Access" bool={train.LuggageStorage} />  
                <BoolAttribute name="Vending Machine" bool={train.hasVendingMachine} />  
                <BoolAttribute name="Food Service" bool={train.hasFoodService} />  
      </div>
            
            <Table columns={columns} data={train.maintenanceHistories} />

    </div>
  );
}


