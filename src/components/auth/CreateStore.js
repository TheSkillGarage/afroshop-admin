import React from "react";
import { Tick} from "../../images";
import Button from "../shared/button";
import { Link } from "react-router-dom";
import Formheader from "./forms/helper/Formheader";

const CreateStore = () => {
  return (
    <div className="text-center flex flex-col justify-center items-center">
     <Formheader icon={Tick}/>
      <div>
        <div className="text-center font-bold py-[24px]">
          Store Account Created Successfully!
        </div>
      <Link to="/dashboard"> <Button icon="white" className="w-[400px]">Go to dashboard</Button></Link>
      </div>
    </div>
  );
};

export default CreateStore;
