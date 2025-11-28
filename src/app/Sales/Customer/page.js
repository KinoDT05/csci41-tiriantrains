
"use client";

import { useSession } from "next-auth/react";
import Table from "@/components/Table";
import Attribute from "@/components/Attribute";
import BoolAttribute from "@/components/BoolAttribute";
import { useEffect,useState } from "react";
import { useRouter } from "next/navigation";
import PageButton from "@/components/PageButton";

const columns = [
  { key: "trainId", label: "Train ID" },
  { key: "origin", label: "Origin" },
  { key: "destination", label: "Destination" },
  { key: "departure", label: "Departure" },
  { key: "arrival", label: "Arrival" },
  { key: "duration", label: "Duration" },
  { key: "cost", label: "Cost" },
];
export default function Customer() {

    const { data: session, status } = useSession();

    

    const userID = session?.user?.customerID;
    const [user, setUser] = useState(null);
    const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
    const [ticket, setTicket] = useState(null);
    const [error, setError] = useState("");
    const [data, setData] = useState([])
    useEffect(() => {
        
        async function fetchUser() {
            const res = await fetch(`/api/user/${userID}/${date}`);

            if (!res.ok) {
                console.log("Not Okay");
                setUser(null);
                return;
            }
            const json = await res.json();
            setUser(json.user);
            setTicket(json.user.ticket);
            setData(json.user.itinerary)
        }

        fetchUser();
    }, [userID, date]);

    const handleCreateTicket = async () => {
        setError("");

        try {
            const res = await fetch(`/api/user/${userID}/${date}/ticket/create`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
            });

            const data = await res.json();
            console.log(data);
            if (!res.ok) throw new Error(data.error);

            setTicket(data.ticket);
            alert(`Ticket created on ${data.ticket.date}`);
        } catch (err) {
            setError(err.message);
            alert(err.message);
        }
    };


    if (!user) return <div>Loading User...</div>;
    if (status === "loading") {
        return <p>Loading...</p>;
    }
   return (
    <div className="my-10">

      {/*Inside the header */}
      <div className="bg-primary p-5 rounded-3xl my-5">
        <div className="flex flex-row justify-between">
                   <div className="text-6xl font-bold my-2">Customer ID: { user.userID }</div>    
                   <Attribute name="Date" value={date} color={true} />
        </div>
          
        <div className="flex flex-row justify-between items-end">
            <div className="w-3/4 flex flex-wrap gap-5">
                {/* Replace this with a map */}
                       <Attribute name="Last Name" value={user.lastName} />
                       <Attribute name="First Name" value={user.givenName} />
                       <Attribute name="Middle Initial" value={user.middleInitial} />
                       <Attribute name="Gender" value={user.gender} />
                       <Attribute name="Birthday" value={user.birthDate} />
            </div>
                   <Attribute name="Total Cost" value={user.totalCost} color={true} />
        </div>    
           </div>
           <div className="flex flex-row gap-2">
               <PageButton name="Today" onClick={() => setDate(new Date().toISOString().split("T")[0])} />
               <PageButton name="Tomorrow" onClick={() => setDate(() => {
                   const t = new Date();
                   t.setDate(t.getDate() + 1);
                   return t.toISOString().split("T")[0];
               })} />
           </div>

           {!ticket && <PageButton name="Create Ticket" onClick={ () => handleCreateTicket() } />}

           {ticket && data &&
               <div className="text-4xl font-bold">Trip Itinerary</div> &&
               <Table columns={columns} data={ data } />
           }

    </div>
  );
}


