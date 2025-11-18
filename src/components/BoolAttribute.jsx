export default function BoolAttribute({ name, bool }) {
  const bgClass = bool ? "bg-true" : "bg-false";

  return (
    <div className={`py-2.5 mx-1 px-5 rounded-2xl ${bgClass}`}>
      {name}
    </div>
  );
}
