export default function Field({ name, prompt }) {
    return (<>
        <div className="text-left self-start" >{name} </div>
        <div className="bg-background p-1.5 rounded-md m-3 w-full">
            < input type="text" placeholder={prompt} className="text-gray-400 placeholder-gray-400 placeholder-shown:text-gray-400  not-placeholder-shown:text-black w-full" />
        </div>
    </>)
}