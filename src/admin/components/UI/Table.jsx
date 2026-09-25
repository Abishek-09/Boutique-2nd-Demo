import React from 'react';

const Table = ({
  headers = [],
  children,
  emptyMessage = 'No records found in atelier records.',
  loading = false,
  colSpan = 5,
}) => {
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-gray-100 bg-white shadow-sm">
      <table className="w-full text-left border-collapse font-sans text-sm">
        <thead>
          <tr className="bg-[#F9F6F0] border-b border-gray-100 text-[#174A43] text-xs uppercase tracking-wider font-semibold">
            {headers.map((head, index) => (
              <th key={index} className="py-3.5 px-5">
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 text-[#383028]">
          {loading ? (
            // Skeleton Loader Rows
            [...Array(4)].map((_, i) => (
              <tr key={i} className="animate-pulse">
                {headers.map((_, hIdx) => (
                  <td key={hIdx} className="py-4 px-5">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </td>
                ))}
              </tr>
            ))
          ) : React.Children.count(children) === 0 ? (
            <tr>
              <td colSpan={colSpan || headers.length} className="py-12 text-center text-[#383028]/60 text-sm">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            children
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
