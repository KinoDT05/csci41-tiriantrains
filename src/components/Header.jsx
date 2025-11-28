

export default function Header ({name, desc}){
    return (
    <>
        <div className="bg-primary p-5 rounded-3xl my-5">
            <div className="text-6xl font-bold my-4">{name}</div>    
        <p className="text-lg">
            {desc}
        </p>
        </div>
    </>
    );
}