import React from "react";
import Button from "../shared/button";

const DeleteUser = () => {
  return (
    <div className="bg-white">
      <p>Delete User</p>
      <p>
        Are you sure you want to delete this user? This action cannot be undone.
      </p>
      <div>
        <Button variant="secondary">No, cancel</Button>
        <Button>Yes, delete</Button>
      </div>
    </div>
  );
};

export default DeleteUser;
