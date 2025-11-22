import Field from "@/components/Field";
import Button from "@/components/Button";

export default function Login(){
    return(
    <div className="p-5 w-1/3 mx-auto my-5 bg-primary flex flex-col items-center rounded-xl">
        <div className="text-5xl font-bold flex items-center m-2">Login</div>
        <Field name="Username" prompt="Type your username"/> 
        <Field name="Password" prompt="Type your password"/> 
        <Button name="Login" />
        Don't have an account yet? 
        <Button name="Register" link="/RegisterPage" />
    </div>
    );
}