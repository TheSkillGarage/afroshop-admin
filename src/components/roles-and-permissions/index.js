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
import useFilter from "../../hooks/useFilter";
import Search from "../search";
import TableFooter from "../table-footer/table-footer";
import { useSelector } from "react-redux";
import { getPermissionCount, getRoles } from "../../utils/roles";
import useTableData from "../../hooks/useTableData";

const RolesAndPermissions = () => {
  const [page, setPage] = useState(1);
  const users = useSelector((s) => s.roles);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterObject, setFilterObject] = useState({});
  const [activeTab] = useState("all");
  const handleSearch = (searchWord) => setSearchTerm(searchWord);
  const handleFilterObject = (filterObject) => setFilterObject(filterObject);
  const usersWithRoles = users.filter((user) => {
    if (user.actions) {
      return user;
    }
  });
  // using custom  hooks
  const data = useFilter(
    "roles",
    activeTab,
    usersWithRoles,
    searchTerm,
    filterObject
  ).filteredData;

  // from usePagination hook
  const pagination = usePagination(page, itemsPerPage, data);
  const totalPages = pagination.totalPages; // sets total pages

  const handleItemsPerPage = (e) => setItemsPerPage(e.target.value); // set items per page when selected from select dropdown
  const handlePage = (activePage) => setPage(activePage); // sets page when pagination button is clicked
  const prevPage = () => (page > 1 ? setPage(page - 1) : null); // goes to previous page
  const nextPage = () => (page < totalPages ? setPage(page + 1) : null); // goes to next page

  const { selectedRows, handleSelectAllRows, handleSelectRow } = useTableSelect(
    { rows: pagination.currentData }
  );
  const headersArray = [
    "selection",
    "name",
    "email",
    "role",
    "permissions",
    "created_at",
    "status",
    "detail",
  ];
  const tableData = useTableData("roles", headersArray, pagination.currentData, (user)=>{
    navigate(`/roles-and-permissions/edit-role/${user.id}`)
  })

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
              onClick={() => navigate("/roles-and-permissions/add-new-role")}
            >
              Add New Role
            </button>
          </div>

          <Search
            handleSearch={handleSearch}
            name="roles"
            DATA={ROLES_DATA}
            handleFilterObject={handleFilterObject}
          />
        </div>

        {/******************************************************* * table section  **************************************************************/}

        <BaseTable
          tableHeaders={tableData.headers}
          data={tableData.results}
          emptyState={
            <div className="bg-white border rounded-md min-h-[300px] flex items-center justify-center sticky bottom-0 left-0 mt-8">
              <p className="text-sm text-gray-400">
                There are no records to show for this table
              </p>
            </div>
          }
        />

        <TableFooter
          pagination={pagination}
          data={data}
          itemsPerPage={itemsPerPage}
          handleItemsPerPage={handleItemsPerPage}
          prevPage={prevPage}
          page={page}
          handlePage={handlePage}
          nextPage={nextPage}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
};

export default RolesAndPermissions;
