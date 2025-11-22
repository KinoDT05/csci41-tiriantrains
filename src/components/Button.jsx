export default function Button({name, link}){
  return (
    <a href={link}>
      <div className="my-4 text-white px-4 py-2 w-fit bg-secondary rounded-xl 
      hover:bg-primary hover:border  hover:text-black">{name}</div>
    </a>
  );
}