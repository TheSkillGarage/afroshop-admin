import React from "react";
import Button from "../shared/button";

const DeleteUser = ({ handleClose }) => {
  return (
    <div className="flex flex-col gap-4 bg-white h-fit m-auto rounded-md max-w-[400px] p-4">
      <p className="text-[#186F3D] text-xl font-bold">Delete User</p>
      <p className="text-base text-[#333333]">
        Are you sure you want to delete this user? This action cannot be undone.
      </p>
      <div className="flex">
        <Button variant="secondary" onClick={handleClose}>
          No, cancel
        </Button>
        <Button>Yes, delete</Button>
      </div>
    </div>
  );
};

export default DeleteUser;
