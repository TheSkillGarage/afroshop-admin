import React from "react";
import Button from "../shared/button";

const DeleteUser = ({ name, handleClose, handleDelete, handleDeleteProduct }) => {
  return (
    <div className="flex flex-col gap-4 bg-white h-fit m-auto rounded-md max-w-[400px] p-4">
      <p className="text-[#186F3D] text-xl font-bold">
        Delete {name === "roles" ? "User" : "Product"}
      </p>
      <p className="text-base text-[#333333]">
        Are you sure you want to delete this{" "}
        {name === "roles" ? "user" : "product"}? This action cannot be undone.
      </p>
      <div className="flex gap-6">
        <Button variant="secondary" onClick={handleClose}>
          No, cancel
        </Button>
        <Button onClick={handleDeleteProduct}>Yes, delete</Button>
      </div>
    </div>
  );
};

export default DeleteUser;
