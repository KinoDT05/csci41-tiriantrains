'use client';

import { useEffect, useState } from 'react';
import Header from "@/components/Header";
import LinkTable from "@/components/LinkTable";
import Button from "@/components/Button";

const columns = [
  { key: "trainId", label: "Train ID" },
  { key: "trainModelID", label: "Train Model" },
  { key: "link"}
];



export default function Maintenance() {
    const [trains, setTrains] = useState([]);

    useEffect(() => {
        async function fetchTrains() {
            const res = await fetch('/api/train/list', { method: 'POST' });
            const json = await res.json();
            setTrains(json.trains);
        }

        fetchTrains();
    }, []);



   return (
    <div className="my-10">
    <Header name="Maintenance History" desc="This view contains a list of maintenance histories." />
    <div className="flex flex-row gap-2">
    </div>
    <LinkTable columns={columns} data={trains} />

    </div>
  );
}




