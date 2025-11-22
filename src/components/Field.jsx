export default function Field({name, prompt}){
    return (<>
    <div className="text-left self-start" >{name} </div>  
    <div className="bg-background text-gray-400 p-1.5 rounded-md m-3 w-full">
    {prompt}
    </div>
    </>)
}