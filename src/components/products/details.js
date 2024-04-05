import React, { useState } from "react";
import { DeleteIcon, DetailsIcon, EditIcon } from "../../images";
import DeleteUser from "../pop-ups/deleteModal";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { deleteRequest, getProductData, updateUserRole } from "../../redux/action";
import { getTokenFromCookie } from "../../utils";
import { toast } from "react-toastify";

const Detail = ({ name, id, goToEdit, param, user }) => {

  const dispatch = useDispatch();
  const roles = useSelector((s) => s.roles);
  const [showDetails, setShowDetails] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const handleShowDetails = () => {
    setShowDetails(!showDetails);
    closeDeleteModal();
  };

  const closeDeleteModal = (e) => {
    e?.stopPropagation();
    setOpenDeleteModal(false);
  };

  const token = getTokenFromCookie();
  const storeData = useSelector((state) => state.storeData);


  const handleRoleDelete = (e) => {
    e?.stopPropagation();
    const newUsers = roles.filter((r) => r.id !== user.id);
    dispatch(updateUserRole({ roles: newUsers }));
    setOpenDeleteModal(false);
    setShowDetails(false);
  };

  const handleProductDelete = async () => {
    try {
      const deleteProduct = await deleteRequest(`/api/products/${id}`, token);

      if (deleteProduct[0]) {
        toast.success(`Product deleted successfully`, { autoClose: 2000 });
          dispatch(getProductData(storeData.id, token));
      } else {
        toast.error(`An error occurred while deleting product: ${deleteProduct[1]}`, { autoClose: 2000 });
      }
    } catch (error) {
      toast.error(`An unexpected error occurred while deleting product. Please try again.`, { autoClose: 2000 });
    }
  }

  const handleDelete = async (e, name) => {
    if (name === "products") {
      handleProductDelete();
    } else {
      handleRoleDelete(e);
    }
  };


  return (
    <div className="relative flex flex-col items-center">
      <DetailsIcon className="cursor-pointer" onClick={handleShowDetails} />
      {showDetails && (
        <div className="absolute top-[30px] right-[20px] bg-[#ffffff] rounded flex flex-col space-around py-3 px-2 z-[5] shadow-md">
          <div
            className="px-1 flex items-center cursor-pointer mb-2 gap-2"
            onClick={() => goToEdit?.(param)}
          >
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
            <DeleteUser
              name={name}
              handleDelete={(e) => handleDelete(e, name)}
              handleClose={(e) => closeDeleteModal(e)}
            />
          ) : null}
        </div>
      )}
    </div>
  );
};

Detail.propTypes = {
  name: PropTypes.string.isRequired,
  goToEdit: PropTypes.func.isRequired,
  param: PropTypes.number,
};

export default Detail;
