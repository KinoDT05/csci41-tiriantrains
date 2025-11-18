export default function BoolAttribute({ name, bool }) {
  const bgClass = bool ? "bg-yes" : "bg-no";

  return (
    <div className={`py-2.5 mx-1 px-5 rounded-2xl ${bgClass}`}>
      {name}
    </div>
  );
}
