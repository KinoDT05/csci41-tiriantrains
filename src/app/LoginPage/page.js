"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Field from "@/components/Field";
import SubmitButton from "@/components/SubmitButton";
import Button from "@/components/Button";


export default function Login(){
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                body: JSON.stringify({ email, password }),
                headers: { "Content-Type": "application/json" },
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error);

            alert(`Welcome ${data.user.name || data.user.email}`);
            router.push("/Maintenance");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <form onSubmit={handleLogin} className="p-5 w-1/3 mx-auto my-5 bg-primary flex flex-col items-center rounded-xl">
            <div className="text-5xl font-bold flex items-center m-2">Login</div>
            <Field name="Email" prompt="Type your username" value={email} setValue={setEmail} type="email" />
            <Field name="Password" prompt="Type your password" value={password} setValue={setPassword} type="password" /> 
            <SubmitButton name="Login" />
            Don't have an account yet? 
            <Button name="Register" link="/RegisterPage" />
        </form>
    );
}