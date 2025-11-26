"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Field from "@/components/Field";
import SubmitButton from "@/components/SubmitButton";
import Button from "@/components/Button"

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false); 

    async function handleLogin(e) {
        e.preventDefault();
        setError("");
        setLoading(true);

        const res = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });


        setLoading(false);
        if (res?.error) {
            setError(res.error);
            return;
        }

        router.push("/Profile");
    }

    return (
        <form onSubmit={handleLogin} className="p-5 w-1/3 mx-auto my-5 bg-primary flex flex-col items-center rounded-xl">
            <div className="text-5xl font-bold flex items-center m-2">Login</div>
            <Field name="Email" prompt="Type your username" value={email} setValue={setEmail} type="email" />
            <Field name="Password" prompt="Type your password" value={password} setValue={setPassword} type="password" />
            <SubmitButton name={loading ? "Logging in..." : "Login"} disabled={loading} />
            Don't have an account yet?
            <Button name="Register" link="/RegisterPage" />
        </form>
    );
}