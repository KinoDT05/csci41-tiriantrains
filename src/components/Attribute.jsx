export default function Attribute({ name, value, color }) {
  const bgClass = color ? "bg-secondary" : "bg-background";
  const textClass = color ? "text-white" : "text-inherit";

  return (
    <div className={`${bgClass} ${textClass} h-10 py-2.5 px-5 rounded-xl`}>
      {name}: {value}
    </div>
  );
}