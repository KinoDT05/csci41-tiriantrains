"use client";

import Image from "next/image";
import Header from "@/components/Header";
import InteractableTable from "@/components/InteractableTable";
import Table from "@/components/Table";
import { useEffect, useState } from 'react';
import PageButton from "@/components/PageButton";
import { useSession } from "next-auth/react";

export default function Schedule() {

    let columns;

    const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
    const [schedules, setSchedules] = useState([]);

    const { data: session, status } = useSession();

    const userID = session?.user?.customerID;
    const isLoggedIn = !!session?.user; 
    useEffect(() => {
        if (!date) return;

        async function fetchSchedules() {
            const res = await fetch(`/api/schedules/${date}`);
            if (!res.ok) {
                setSchedules(null);
                return;
            }
            const json = await res.json();
            setSchedules(json.schedules);
        }

        fetchSchedules();
    }, [date]);


    const handleAddItinerary = (row) => {
        console.log("Button clicked for row:", row);
    };


    if (isLoggedIn) {
        columns = [
            { key: "trainId", label: "Train #" },
            { key: "origin", label: "Origin" },
            { key: "destination", label: "Destination" },
            { key: "departure", label: "Departure" },
            { key: "arrival", label: "Arrival" },
            { key: "getTicket!", label: "Get Ticket!" }
        ];
    } else {
        columns = [
            { key: "trainId", label: "Train #" },
            { key: "origin", label: "Origin" },
            { key: "destination", label: "Destination" },
            { key: "departure", label: "Departure" },
            { key: "arrival", label: "Arrival" },
        ];
    }


    if (status === "loading") {
        return <p>Loading...</p>;
    }
    if (!schedules) return <div>Loading...</div>;

    return (
      <div className="my-5">
      <Header name="Trip Schedule" desc="This view contains a list of trip schedules." />
            <div className="flex flex-row gap-2">
                <PageButton name="Today" onClick={() => setDate(new Date().toISOString().split("T")[0])} />
                <PageButton name="Tomorrow" onClick={() => setDate(() => {
                    const t = new Date();
                    t.setDate(t.getDate() + 1);
                    return t.toISOString().split("T")[0];
                })} />
            </div>
            
            {isLoggedIn && <InteractableTable columns={columns} data={schedules} onRowButtonClick={handleAddItinerary} />}


            {!isLoggedIn && status !== "loading" && (
                <Table columns={columns} data={schedules} />
            )}
      </div>
    );
}
