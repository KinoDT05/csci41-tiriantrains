"use client";

import { useState, useEffect } from "react";

export default function NavBar() {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const cookie = document.cookie.split("; ").find((c) => c.startsWith("loggedIn="));
        setLoggedIn(!!cookie);
    }, []);

  return (
    <>
    <div className="flex flex-row justify-between">
        <div className="flex flex-row text-4xl">
            <img src="/logo.svg"/>
            <h1><a href="/">Tirian Trains</a></h1>
        </div>

        <div className="flex flex-row gap-14 text-xl">
                <a className="hover:underline" href="/Maintenance">Maintenance</a>
                <a className="hover:underline" href="/Routes">Routes</a>
                <a className="hover:underline" href="/Sales">Sales</a>
                  <a className="hover:underline" href="/Schedule">Schedule</a>
                  {loggedIn ? (
                      <a className="hover:underline" href="/Sales">Your Profile</a>
                  ) : (
                      <a className="hover:underline" href="/LoginPage">Login</a>
                  )};
                  
    </div>
    </div>

    

    </>
  );
}
