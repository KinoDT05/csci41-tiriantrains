import Field from "@/components/Field";
import Button from "@/components/Button";

export default function Login(){
    return(
    <div className="p-5 w-1/3 mx-auto my-5 bg-primary flex flex-col items-center rounded-xl">
        <div className="text-5xl font-bold flex items-center m-2">Register</div>
        <Field name="Username" prompt="Type your username"/> 
        <Field name="Password" prompt="Type your password"/> 
        <Field name="Confirm Passowrd" prompt="Type your password"/> 
        <Field name="Lastname" prompt="Type your lastname"/> 
        <Field name="Firstname" prompt="Type your firstname"/> 
        <Field name="Middle Initial" prompt="Type your middle initial"/> 
        <Field name="Birthdate" prompt="Type your birthdate"/> 
        <Field name="Gender" prompt="Select your gender"/> 


        <Button name="Register" link="/RegisterPage" />
    </div>
    );
}