"use client";

import Image from "next/image";
import Header from "@/components/Header";
import Table from "@/components/Table";
import { useEffect, useState } from 'react';
import PageButton from "@/components/PageButton";


const columns = [
  { key: "origin", label: "Origin" },
  { key: "destination", label: "Destination" },
  { key: "trainId", label: "Train #" },
  { key: "departure", label: "Departure" },
  { key: "arrival", label: "Arrival" },
];


export default function Schedule() {
    const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
    const [schedules, setSchedules] = useState([]);
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

    console.log(date)
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

            <Table columns={columns} data={schedules} />
      
      </div>
    );
}
