import React from "react";

const Price = ({ values }) => {
  return (
    <>
      <p>${values.price}</p>
      <p className="text-[#186F3D] text-[10px] leading-[15px]">
        {values.paymentMethod}
      </p>
    </>
  );
};

const BaseTable = ({ tableHeaders, data, loading, emptyState }) => {
  return (
    <div className="w-full">
      {data && data.length !== 0 && !loading ? (
        <table className="w-full border-collapse">
          <thead className="h-[56px] uppercase text-left text-[13px] leading-[23px] text-[#186F3D] font-semibold bg-[#F2F2F2]">
            <tr>
              {tableHeaders.map((header) => (
                <th
                  key={header.id}
                  className={`${(header.id === "selection" || header.id === "detail") ? "w-[6.5%]" : "w-[14.5%]"} 
                  ${header.id === "SKU" ? "pl-8" : ""}`
                }
                >
                  {header.name}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="bg-[#ffffff]">
            {data.map((row, index) => (
              <tr
                key={index}
                className="text-[13px] leading-[23px] text-[#333333] border-b border-1 border-[#E6E6E6] min-h-[47px]"
              >
                {tableHeaders.map((header, index) => {
                  return (
                    <td
                      className={`py-2 w-[${header.width}] ${header.id === "SKU" ? "pl-8" : ""}`}
                      key={index}
                    >
                      {header.id !== "price" ? (
                        row[header.id]
                      ) : (
                        <Price values={row[header.id]} />
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        emptyState
      )}
    </div>
  );
};

export default BaseTable;
