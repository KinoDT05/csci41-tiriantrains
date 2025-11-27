
"use client";

import { useSession } from "next-auth/react";
import Table from "@/components/Table";
import Attribute from "@/components/Attribute";
import BoolAttribute from "@/components/BoolAttribute";
import { useEffect,useState } from "react";
import { useRouter } from "next/navigation";


const columns = [
  { key: "trainId", label: "Train ID" },
  { key: "origin", label: "Origin" },
  { key: "destination", label: "Destination" },
  { key: "departure", label: "Departure" },
    { key: "arrival", label: "Arrival" },
  { key: "duration", label: "Duration" },
    { key: "cost", label: "Cost" },



];
const data = [];
const date = new Date();

export default function Customer() {

    const { data: session, status } = useSession();

    

    const userID = session?.user?.customerID;
    const [user, setUser] = useState(null);
    
    const dateString = date.toISOString().split("T")[0]
    console.log(userID);

    useEffect(() => {
        
        async function fetchUser() {
            const res = await fetch(`/api/user/${userID}`);

            if (!res.ok) {
                console.log("Not Okay");
                setUser(null);
                return;
            }
            const json = await res.json();
            console.log(json);
            setUser(json.user);
        }

        fetchUser();
    }, [userID]);

    if (!user) return <div>Loading...</div>;
    if (status === "loading") {
        return <p>Loading...</p>;
    }
   return (
    <div className="my-10">

      {/*Inside the header */}
      <div className="bg-primary p-5 rounded-3xl my-5">
        <div className="flex flex-row justify-between">
                   <div className="text-6xl font-bold my-2">Customer ID: { user.userID }</div>    
                   <Attribute name="Date" value={dateString} color={true} />
        </div>
          
        <div className="flex flex-row justify-between items-end">
            <div className="w-3/4 flex flex-wrap gap-5">
                {/* Replace this with a map */}
                       <Attribute name="Last Name" value={user.lastName} />
                       <Attribute name="First Name" value={user.lastName} />
                        <Attribute name="Gender" value="Male" />
                       <Attribute name="Birthday" value={user.birthDate} />
            </div>
                   <Attribute name="Total Cost" value={user.tickets} color={true} />
        </div>    
      </div>  
      <div className="text-4xl font-bold">Trip Itinerary</div>

    </div>
  );
}


