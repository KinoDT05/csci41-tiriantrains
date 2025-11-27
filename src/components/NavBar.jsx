"use client";

import { signOut, useSession } from "next-auth/react";

export default function NavBar() {
    const { data: session, status } = useSession();
    const isLoggedIn = !!session?.user; 

    return (

        <div className="flex flex-row justify-between">
            <div className="flex flex-row text-4xl">
                <img src="/logo.svg" />
                <h1><a href="/">Tirian Trains</a></h1>
            </div>

            <div className="flex flex-row gap-14 text-xl">
                <a className="hover:underline" href="/Maintenance">Maintenance</a>
                <a className="hover:underline" href="/Routes">Routes</a>
                
                <a className="hover:underline" href="/Schedule">Schedule</a>

                {status === "loading" && <span>Loading...</span>}

                {!isLoggedIn && status !== "loading" && (
                    <a href="/LoginPage" className="hover:underline">
                        Login
                    </a>
                )}

                {isLoggedIn && (
                    <a className="hover:underline" href="/Sales/Customer">Your Profile</a>
                )}

                {isLoggedIn && (
                    <a
                        onClick={() => signOut({ redirect: true, callbackUrl: "/" })}
                        className="hover:underline"
                    >
                        Logout
                    </a>
                )}

            </div>
        </div>
    );
}


