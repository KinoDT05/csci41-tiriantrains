export default function Button({name, link}){
  return (
    <a href={link}>
      <div className="text-white p-3 bg-secondary rounded-xl hover:bg-primary hover:text-black">{name}</div>
    </a>
  );
}