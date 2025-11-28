"use client";

import Field from "@/components/Field";
import SubmitButton from "@/components/SubmitButton";
import { useState } from "react";
import { useRouter } from "next/navigation";


export default function Login(){
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [givenName, setGivenName] = useState("");
    const [lastName, setLastName] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [error, setError] = useState("");

    const [gender, setGender] = useState("");
    const [middleInitial, setMiddleInitial] = useState("");


    const handleSignup = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                body: JSON.stringify({ email, givenName, lastName, password, birthDate, middleInitial, gender }),
                headers: { "Content-Type": "application/json" },
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error);

            alert(`Account created for ${data.user.givenName || data.user.email}`);
            router.push("/LoginPage");
        } catch (err) {
            setError(err.message);
        }
    };


    return (
        <form onSubmit={handleSignup} className="p-5 w-1/3 mx-auto my-5 bg-primary flex flex-col items-center rounded-xl">

        
        <div className="text-5xl font-bold flex items-center m-2">Register</div>

                <Field name="Email" prompt="Type your username" value={email} setValue={setEmail} type="email" /> 
                <Field name="Password" prompt="Type your password" value={password} setValue={setPassword} type="password" /> 
                <Field name="Last name" prompt="Type your last name" value={lastName} setValue={setLastName} type="text" />
                <Field name="Given Name" prompt="Type your given name" value={givenName} setValue={setGivenName} type="text" /> 
                <Field name="Given Name" prompt="Type your given name" value={middleInitial} setValue={setMiddleInitial} type="text" /> 
                <Field name="Birthdate" prompt="Type your birthdate" value={birthDate} setValue={setBirthDate} type="date" /> 
                {error && <p className="text-red-500 mb-4">{error}</p>}
                
                <div className="text-left font-semibold">Gender</div>
                <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full p-2 rounded-md border border-gray-300 bg-background "
                    required
                >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Others">Other</option>
                </select>
            <SubmitButton name="Register"/>
        </form>
    );
}