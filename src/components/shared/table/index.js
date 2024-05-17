import React, { useEffect, useState } from "react";
import Detail from "../../products/details";
import { BeatLoader } from 'react-spinners';
import { formatPrice } from "../../../utils/order-utils";


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

const BaseTable = ({ tableHeaders, data, emptyState, name, goToEdit }) => {

  const [loading, setLoading] = useState(false);

  const handleLoading = (bool) => {
    setLoading(bool)
  };

  return (
    <div className="w-full">
      {loading &&
        <div className="fixed inset-0 bg-[#D3D3D3] bg-opacity-25 z-[100] flex justify-center items-center h-screen">
          <div className="mt-[250px] w-full flex justify-center items-center">
            <BeatLoader color={'#186F3D'} loading={true} size={25} speedMultiplier={1} />
          </div>
        </div>}
      {data && data.length !== 0 ?
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
                        : header.id === "availability"
                          ? "w-[12.5%]"
                          : "w-[14.5%]"}  text-left ${header.id === "SKU" ? "pl-4" : "px-2"} ${index === 0 ? "pl-4" : ""}`}
                >
                  {(header.id === "price" || header.id === "salesPrice") ? `${header.name} ($)` : header.name}
                </th>
              ))}
            </tr>
          </thead>

          {data && data.length !== 0 && (
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
                            formatPrice(row["grandTotal"])
                          )
                            : header.id === "productName" ?
                              (
                                row["name"]
                              )
                              : ((header.id === "orderDate" && name === "orders"))
                                ? (
                                  <DateCol value={row["createdAt"]} />
                                )
                                : (header.id === "customer" && name === "orders")
                                  ? (
                                    `${row["firstName"]} ${row["lastName"]}`
                                  )
                                  : (header.id === "items" && name === "orders")
                                    ? (
                                      `${row["products"]?.length}`
                                    )
                                    : (header.id === "salesPrice")
                                      ? (
                                        row["price"] === null ? "---" : formatPrice(row["price"])
                                      )
                                      : (header.id === "dateAdded")
                                      ? (
                                        <DateCol value={row["dateAdded"]} />
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

                  {name === "products" &&
                    <td className="py-2 pr-4">
                      <Detail name={name} id={data[index].id} goToEdit={goToEdit} param={data[index].SKU} data={data} handleLoading={handleLoading} />
                    </td>}
                </tr>
              ))}
            </tbody>
          )}
        </table>
        :
        (emptyState)
      }
    </div>
  );
};

export default BaseTable;