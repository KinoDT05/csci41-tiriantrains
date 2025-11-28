"use client";

import Header from "@/components/Header";
import Table from "@/components/Table";
import PageButton from "@/components/PageButton";
import { useEffect, useState } from 'react';

const columns = [
  { key: "origin", label: "Origin" },
  { key: "destination", label: "Destination" },
  { key: "location", label: "Location" },
];

export default function Routes() {
    const [location, setLocation] = useState("All");
    const [routes, setRoutes] = useState([]);
    useEffect(() => {
        if (!location) return;

        async function fetchRoutes() {
            const res = await fetch(`/api/routes/${location}`);
            if (!res.ok) {
                setRoutes(null);
                return;
            }
            const json = await res.json();
            setRoutes(json.routes);
        }

        fetchRoutes();
    }, [location]);

    console.log(location);

    if (!routes) return <div>Loading...</div>;

  return (
      <div className="my-5">
          <Header name="Routes" desc="This view contains a list of routes." />
          <div className="flex flex-row gap-2">
              <PageButton name="All" onClick={() => setLocation("All")} />
              <PageButton name="Intertown" onClick={() => setLocation("Intertown")} />
              <PageButton name="WesternWood" onClick={() => setLocation("WestWood")} />
          </div>
          <Table columns={columns} data={routes} />
      
      </div>
    );
}
