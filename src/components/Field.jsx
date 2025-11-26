export default function Field({name, type, value, setValue, prompt}){
    return (<>
        <div className="flex flex-col w-full mb-4">
            <div className="text-left font-semibold mb-1">{name}</div>
            <input
                type={type}
                placeholder={prompt}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="bg-background text-gray-700 p-2 rounded-md border border-gray-300 w-full"
            />
        </div>
    </>);
}