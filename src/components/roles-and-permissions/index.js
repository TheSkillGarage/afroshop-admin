import React, { useState } from "react";
import { FilterIcon, NextIcon, PrevIcon, SearchIcon } from "../../images";
import StatusPills from "../status-pills";
import usePagination from "../../hooks/usePagination";
import Detail from "../products/details";
import ROLES_DATA from "../../data/rolesAndPermissions";
import { useNavigate } from "react-router-dom";
import Checkbox from "../shared/checkbox";
import useTableSelect from "../../hooks/useTableSelect";
import BaseTable from "../shared/table";

const RolesAndPermissions = () => {
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const navigate = useNavigate();
  // from usePagination hook
  const pagination = usePagination(page, itemsPerPage, ROLES_DATA);
  const totalPages = pagination.totalPages; // sets total pages

  const handleItemsPerPage = (e) => setItemsPerPage(e.target.value); // set items per page when selected from select dropdown
  const handlePage = (activePage) => setPage(activePage); // sets page when pagination button is clicked
  const prevPage = () => (page > 1 ? setPage(page - 1) : null); // goes to previous page
  const nextPage = () => (page < totalPages ? setPage(page + 1) : null); // goes to next page

  const { selectedRows, handleSelectAllRows, handleSelectRow } = useTableSelect(
    { rows: pagination.currentData }
  );

  const headers = [
    {
      id: "selection",
      name: (
        <Checkbox
          name="all"
          handleChange={handleSelectAllRows}
          value={
            selectedRows.length === pagination.currentData.length ? "all" : ""
          }
          valueOnChecked="all"
        />
      ),
      width: "6.5%",
    },
    {
      id: "name",
      name: "Name",
      width: "14.5%",
    },
    {
      id: "email",
      name: "Email",
      width: "14.5%",
    },
    {
      id: "role",
      name: "Role",
      width: "14.5%",
    },
    {
      id: "permissions",
      name: "Permissions",
      width: "14.5%",
    },
    {
      id: "created_at",
      name: "Date Created",
      width: "14.5%",
    },
    {
      id: "status",
      name: "Status",
      width: "14.5%",
    },
    { 
        id: "detail",
        name: "",
        width: "6.5%"
    }
  ];
  const results = pagination.currentData.map((data) => ({
    ...data,
    id: data.id,
    selection: (
      <Checkbox
        name={data.id}
        handleChange={(payload) => {
          handleSelectRow(data.id);
        }}
        value={selectedRows.includes(data.id) ? data.id : ""}
        valueOnChecked={data.id}
      />
    ),
    status: (
      <div className="capitalize">
        <StatusPills status={data.status} name="roles" />
      </div>
    ),
    detail: (
        <Detail />
    )
  }));

  return (
    <div className="bg-[#F2F2F2] w-full py-6 px-4">
      <div className="flex items-center gap-8 mb-6">
        <p className="text-[rgba(48,48,48,0.4)] font-medium text-[14px] leading-[16.8px] -tracking[16%] font-['Lato']">
          ...
        </p>
        <p className="text-[13px] leading-[23px] text-[#186F3D]">
          Roles & Permissions
        </p>
      </div>

      {/******************************************************* * filter section  **************************************************************/}

      <div className="pt-4 mt-4">
        <div className="bg-[#FFFFFF] pt-4">
          <div className="pl-4 border-b border-1 border-[#F2F2F2] h-[64px] flex items-center">
            <p className="text-[20px] leading-[32px] text-[#186F3D] font-bold">
              Roles & Permissions
            </p>
          </div>

          <div className="w-full flex justify-end items-center px-4 h-[60px]">
            <button
              className="bg-[#186F3D] text-[#ffffff] w-[216px] h-[40px] flex items-center justify-center rounded"
              onClick={() => navigate("/add-new-role")}
            >
              Add New Role
            </button>
          </div>

          <div className="flex justify-between items-center px-4 h-[93px]">
            <div className="w-[514px] relative">
              <SearchIcon className="absolute top-[10px] left-[18px] " />
              <input
                type="text"
                placeholder="Text"
                className="bg-[#F2F2F2] w-full h-[45px] rounded-[30px] text-[#999999] px-12"
              />
            </div>

            <div className="w-[108px] h-[44px] rounded border-[0.5px] flex items-center justify-center gap-2">
              <p className="text-[16px] leading-[24px] text-[#333333]">
                Filter
              </p>
              <FilterIcon />
            </div>
          </div>
        </div>

        {/******************************************************* * table section  **************************************************************/}

        <BaseTable tableHeaders={headers} data={results} />

        <div className="flex justify-between px-4 pt-4 pb-6 text-[13px] leading-[23px] items-center bg-[#FFFFFF]">
          <div className="flex gap-8 text-[#CCCCCC] items-center">
            <p className="flex gap-4 items-center">
              <span>Show</span>
              <select
                name="lines"
                id=""
                className="w-[56px] h-[33px] border border-1 border-[#CCCCCC] rounded focus:outline-none font-medium text-[#333333] text-[14px] leading-[16.8px]"
                onChange={(e) => handleItemsPerPage(e)}
              >
                {["5", "10", "15", "20", "25", "30"].map((num, key) => {
                  return (
                    <option value={num} key={key}>
                      {num}
                    </option>
                  );
                })}
              </select>
              <span>Lines</span>
            </p>

            <p>
              Showing {pagination.count.start} to {pagination.count.stop} of{" "}
              {ROLES_DATA.length} orders
            </p>
          </div>

          <div className="flex gap-1 text-[#333333]">
            <p
              className="h-[31px] w-[31px] rounded cursor-pointer flex justify-center items-center"
              onClick={prevPage}
            >
              {page === 1 ? <PrevIcon /> : <NextIcon className="rotate-180" />}
            </p>

            <div className="flex gap-1">
              {pagination.pageButtons.map((number, key) => {
                return (
                  <p
                    key={key}
                    className={`${page === number ? "bg-[#FFE0B2]" : null} ${
                      number === "..." ? "text-[#CCCCCC]" : "text-[#333333]"
                    } text-[13px] leading-[23px] mr-1 flex justify-center items-center h-[31px] w-[31px] rounded cursor-pointer transition-all duration-200 ease-in`}
                    onClick={() =>
                      number !== "..." ? handlePage(number) : null
                    }
                  >
                    {number}
                  </p>
                );
              })}
            </div>

            <p
              className="h-[31px] w-[31px] rounded cursor-pointer flex justify-center items-center"
              onClick={nextPage}
            >
              {page !== totalPages ? (
                <NextIcon />
              ) : (
                <PrevIcon className="rotate-180" />
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RolesAndPermissions;
