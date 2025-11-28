export default function PageButton({ name, onClick }) {
    return (
        <div onClick={onClick} className="my-4 text-white px-4 py-2 w-fit bg-secondary rounded-xl 
      hover:bg-primary hover:border  hover:text-black">{name}</div>
    );
}