import React from "react";

const BaseTable = ({ tableHeaders, data }) => {
  return (
    <div className="w-full">
      <table className="w-full border-collapse">
        <thead className="h-[56px] uppercase text-left text-[13px] leading-[23px] text-[#186F3D] font-semibold bg-[#F2F2F2]">
          <tr>
            {tableHeaders.map((header) => (
                <th key={header.id} className={`w-[${header.width}]`}>
                  {header.name}
                </th>
              )
            )}
          </tr>
        </thead>

        <tbody className="bg-[#ffffff]">
          {data.map((row) => (
            <tr key={row} className="text-[13px] leading-[23px] text-[#333333] border-b border-1 border-[#E6E6E6] min-h-[47px]">
              {tableHeaders.map((header) => {
                return <td className="py-2" key={header.id}>{row[header.id]}</td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BaseTable;
