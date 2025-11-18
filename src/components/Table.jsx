export default function Table({ columns = [], data = [] }) {
  const numCols = columns.length;

  return (
    <div className="w-full my-3 flex justify-center">
      <div className="w-full max-w-6xl"> {/* optional max width for better centering */}
        {/* Header */}
        <div
          className="grid items-center rounded-xl py-4 px-6 font-medium text-sm bg-secondary text-white"
          style={{ gridTemplateColumns: `repeat(${numCols}, 1fr)` }}
        >
          {columns.map((col) => (
            <div key={col.key} className="truncate text-center">
              {col.label}
            </div>
          ))}
        </div>

        {/* Body */}
        <div className="flex flex-col my-3">
          {data.map((row, index) => (
            <div
              key={index}
              className="grid items-center rounded-xl py-4 px-6 text-sm shadow-sm my-2 bg-primary"
              style={{ gridTemplateColumns: `repeat(${numCols}, 1fr)` }}
            >
              {columns.map((col) => (
                <div key={col.key} className="truncate text-center">
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
