
export default function Table({
  columns = [],
  data = [],
  headerClass = "",
  rowClass = "",
  containerClass = "",
  gap = "gap-3",
}) {
  return (
    <div className="w-full my-3">
      
      {/* Header */}
      <div
        className="
          flex flex-row
          justify-between
          bg-secondary 
          text-white 
          rounded-full 
          py-3 
          px-6 
          font-medium 
          text-sm
        "
      >
        {columns.map((col) => (
          <div key={col.key}>{col.label}</div>
        ))}
      </div>

      {/* Body */}
      <div className="flex flex-col my-3">
        {data.map((row, index) => (
          <div
            key={index}
            className="
              flex flex-row 
              justify-between
              bg-primary 
              py-4 
              px-6 
              rounded-xl 
              text-sm 
              shadow-sm
              my-2
              "
          >
            {columns.map((col) => (
              <div key={col.key} className="flex items-center">
                {col.render ? col.render(row[col.key], row) : row[col.key]}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
