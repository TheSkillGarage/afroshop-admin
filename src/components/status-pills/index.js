import React, { useEffect, useRef, useState } from "react";
import { getTokenFromCookie } from "../../utils";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getOrdersData, putRequest } from "../../redux/action";
import { CancelOrderIcon, CancelRed } from "../../images";
import { orderReasons } from "../../data/profile";
import InputComponent from "../shared/inputComponent";
import { useForm } from "react-hook-form";
import Button from "../shared/button";

const StatusPills = ({ name, status, id, data, deliveryOption }) => {
  const cancelForm = useForm({
    defaultValues: {
      reason: "",
      other_reasons: "",
    },
    mode: "all",
  });

  const [isSelected, setIsSelected] = useState(false);
  const [cancelOrder, setCancelOrder] = useState(false);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);
  const cancelRef = useRef(null);

  const options =
    deliveryOption === null || deliveryOption === undefined
      ? []
      : deliveryOption
      ? ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"]
      : ["Pending", "Processing", "Ready for Pickup", "Picked Up", "Cancelled"];

  const colorOfPills = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "text-[#FF9500] bg-[rgba(255,149,0,0.1)]";
      case "processing":
        return "text-[#4F4F4F] bg-[rgba(79,79,79,0.1)]";
      case "shipped":
        return "text-[#007AFF] bg-[rgba(0,122,255,0.1)]";
      case "draft":
        return "text-[#007AFF] bg-[rgba(0,122,255,0.1)]";
      case "delivered":
        return "text-[#34C759] bg-[rgba(52,199,89,0.1)]";
      case "ready for pickup":
        return "text-[#007AFF] bg-[rgba(0,122,255,0.1)]";
      case "picked up":
        return "text-[#34C759] bg-[rgba(52,199,89,0.1)]";
      case "active":
        return "text-[#34C759] bg-[rgba(52,199,89,0.1)]";
      case "inactive":
        return "text-[#FF3B30] bg-[#FF3B301A]";
      case "cancelled":
        return "text-[#FF3B30] bg-[rgba(255,59,48,0.1)]";
      default:
        return null;
    }
  };

  const handleIsSelected = (event) => {
    event.stopPropagation();
    setIsSelected(true);
  };

  const dispatch = useDispatch();
  const token = getTokenFromCookie();
  const storeData = useSelector((state) => state.store);

  const handleStatus = async (status, currentStatus) => {
    setIsSelected(false);

    const { reason, other_reasons } = cancelForm.getValues();

    const allowedTransitions = {
      Pending: ["Processing", "Cancelled"],
      Processing: ["Shipped", "Ready for Pickup", "Cancelled"],
      "Ready for Pickup": ["Picked Up"],
      Shipped: ["Delivered"],
      "Picked Up": [],
      Delivered: [],
      Cancelled: [],
    };

    try {
      setLoading(true);
      if (!allowedTransitions[currentStatus].includes(status)) {
        toast.error(
          `Invalid status transition from ${currentStatus} to ${status}`,
          { autoClose: 2000 }
        );
        return;
      }

      const [success, responseData] = await putRequest(
        `/api/orders/${id}`,
        {
          status: status,
          cancellationReason: reason === "Other" ? other_reasons : reason,
        },
        token
      );

      if (!success || responseData?.error) {
        setLoading(false);
        toast.error(
          `${
            responseData?.error?.message ||
            "An error occurred, please try again"
          }`,
          { autoClose: 2000 }
        );

        throw new Error(responseData?.error);
      } else {
        setLoading(false);
        setCancelOrder(false);
        cancelForm.reset();
        dispatch(getOrdersData(storeData.id, token));
        toast.success(`Order status updated successfully`, { autoClose: 2000 });
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsSelected(false);
    }
  };

  const handleCloseCancelOrderModal = (event) => {
    event.stopPropagation();
    setCancelOrder(false);
    cancelForm.reset();
  };
  console.log(cancelForm.formState.errors);

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div className="relative">
      <p
        className={`w-fit py-1 px-6 rounded-[30px] ${colorOfPills(
          status
        )} cursor-pointer`}
        onClick={handleIsSelected}
      >
        {["Ready for Pickup", "Picked Up"].includes(status)
          ? status === "Ready for Pickup"
            ? "Ready"
            : "Picked"
          : status}
      </p>
      {name === "orders" && isSelected && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.1)] z-[9] flex justify-center items-center">
          <div
            className="w-[327px] bg-[#ffffff] rounded-lg absolute top-[40%] right-[120px] z-[10] shadow-md status-dropdown"
            ref={dropdownRef}
          >
            {options.map((item, key) => {
              return (
                <p
                  key={key}
                  className="w-full text-[16px] leading-[24px] text-[#333333] bg-[#ffffff] hover:bg-[#F2F2F2] hover:text-[#186F3D] px-4 py-3 flex items-center rounded cursor-pointer"
                  onClick={() => {
                    item == "Cancelled"
                      ? setCancelOrder(true)
                      : handleStatus(item, status);
                  }}
                >
                  {item}
                </p>
              );
            })}
          </div>
        </div>
      )}

      {cancelOrder && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.1)] z-[9] flex justify-center items-center">
          <div
            className="w-[800px] relative bg-[#ffffff] pt-16 h-[498px] rounded absolute z-[10] shadow-md flex flex-col items-center"
            ref={cancelRef}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-8 right-10">
              <CancelRed onClick={(e) => handleCloseCancelOrderModal(e)} />
            </div>
            <div className="w-[327px]">
              <div className="text-center space-y-2 w-[250px] mx-auto">
                <CancelOrderIcon className="mx-auto" />
                <h3 className="text-[20px] text-[#186F3D] font-bold">
                  Cancel Order
                </h3>
                <p className="text-[#333333] normal-case">
                  You are attempting to cancel order {data?.orderID}
                </p>
              </div>
              <form className="flex flex-col gap-3 pt-4">
                {cancelForm.watch("reason") === "Other" ? (
                  <InputComponent
                    inputType="text"
                    label="Reason for Cancellation"
                    placeholder="Enter Reason"
                    fieldName={"other_reasons"}
                    name="other_reasons"
                    className="bg-[#F2F2F2]"
                    control={cancelForm.control}
                    errors={cancelForm.formState.errors}
                    register={cancelForm.register}
                    required={true}
                    requiredMessage={"This field is required"}
                    //   isReadOnly={!storeExists ? false : !editProfile}/
                  />
                ) : (
                  <InputComponent
                    inputType="select"
                    label="Reason for Cancellation"
                    name="reason"
                    fieldName="reason"
                    placeholder="Select"
                    required={true}
                    requiredMessage={"This field is required"}
                    className="bg-[#F2F2F2]"
                    control={cancelForm.control}
                    errors={cancelForm.formState.errors}
                    register={cancelForm.register}
                    //   isDisabled={!storeExists ? false : !editProfile}
                    options={orderReasons}
                  />
                )}

                <Button
                  size={"full"}
                  className={"p-3"}
                  loading={loading}
                  onClick={(e) => {
                    e.preventDefault();
                    cancelForm.handleSubmit(handleStatus("Cancelled", status));
                  }}
                  type="submit"
                >
                  Confirm
                </Button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatusPills;
