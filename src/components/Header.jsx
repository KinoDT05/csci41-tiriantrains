

export default function Header ({name, desc}){
    return (
    <>
        <div className="bg-[#ECEDDE] p-5 rounded-3xl my-5">
            <div className="text-6xl font-bold">{name}</div>    
        <p>
            {desc}
        </p>
        </div>
    </>
    );
}