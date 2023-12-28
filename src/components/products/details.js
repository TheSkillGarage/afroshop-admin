import React, { useState } from "react";
import { DeleteIcon, DetailsIcon, EditIcon } from "../../images";
import DeleteUser from "../pop-ups/deleteModal";

const Detail = ({name, goToEdit, sku}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const handleShowDetails = () => {
    setShowDetails(!showDetails);
    closeDeleteModal()
  };

  const closeDeleteModal = (e) => {
    e?.stopPropagation();
    setOpenDeleteModal(false);
  };

  return (
    <div className="relative flex flex-col items-center">
      <DetailsIcon className="cursor-pointer" onClick={handleShowDetails} />
      {showDetails && (
        <div className="absolute top-[30px] right-[20px] bg-[#ffffff] rounded flex flex-col space-around py-3 px-2 z-[5] shadow-md">
          <div className="px-1 flex items-center cursor-pointer mb-2 gap-2" onClick={() => goToEdit(sku)}>
            <EditIcon className="w-4 h-4" />
            <p>Edit</p>
          </div>

          <div
            className="px-1 flex items-center cursor-pointer gap-2"
            onClick={() => setOpenDeleteModal(!openDeleteModal)}
          >
            <DeleteIcon />
            <p>Delete</p>
          </div>
        </div>
      )}

      {showDetails && (
        <div
          id="__modal__"
          className={
            "fixed inset-0 w-full h-screen bg-opacity-20 z-[2] overflow-auto flex justify-center py-20 bg-black"
          }
          onClick={handleShowDetails}
        >
          {openDeleteModal ? (
          <DeleteUser name={name} handleClose={(e) => closeDeleteModal(e)} />
          ) : null}
        </div>
      )}
    </div>
  );
};

export default Detail;
