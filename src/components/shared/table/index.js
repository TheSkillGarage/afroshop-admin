import React from "react";

const Price = ({ value }) => {
  return (
    <>
      <p>${parseFloat(value).toFixed(2)}</p>
      <p className="text-[#186F3D] text-[10px] leading-[15px]">
        Stripe
      </p>
    </>
  );
};

const DateCol = ({ value }) => {
  const date = new Date(value)
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear()).slice(2);

  return (
    <>
      {`${day}/${month}/${year}`}
    </>
  )
}

const BaseTable = ({ tableHeaders, data, loading, emptyState, name }) => {
  return (
    <div className="w-full">
      {data && data.length !== 0 && !loading ? (
        <table className="w-full border-collapse">
          <thead className="h-[56px] uppercase text-[13px] leading-[23px] text-[#186F3D] font-semibold bg-[#F2F2F2]">
            <tr>
              {tableHeaders.map((header, index) => (
                <th
                  key={header.id}
                  className={`
                  ${(header.id === "selection" || header.id === "detail")
                      ? "w-[6.5%]"
                      : header.id === "productName"
                        ? "w-[16.5%]"
                        : header.id === "availabilty"
                          ? "w-[12.5%]"
                          : "w-[14.5%]"}  text-left ${header.id === "SKU" ? "pl-4" : "px-2"} ${index === 0 ? "pl-4" : ""}`}
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
                      className={`py-2 ${header.id === "SKU" ? "pl-4" : "px-2"} ${index === 0 ? "pl-4" : ""}`}
                      key={index}
                    >
                      {
                        header.id === "price" ? (
                          `$${parseFloat(row["grandTotal"]).toFixed(2)}`
                        )
                          : (header.id === "dateAdded")
                            ? (
                              <DateCol value={row[header.id]} />
                            )
                            : ((header.id === "orderDate" && name === "orders"))
                              ? (
                                <DateCol value={row["payment"]?.createdAt} />
                              )
                              : (header.id === "customer" && name === "orders")
                                ? (
                                  `${row["firstName"]} ${row["lastName"]}`
                                )
                                : (header.id === "items" && name === "orders")
                                  ? (
                                    `${row["products"].length}`
                                  )
                                  : (header.id === "salesPrice")
                                    ? (
                                      row[header.id] === "" ? "---" : parseFloat(row[header.id]).toFixed(2)
                                    )
                                    : row[header.id] === ""
                                      ? "---"
                                      : (
                                        row[header.id]
                                      )
                      }
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