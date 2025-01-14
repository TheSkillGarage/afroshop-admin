import React from "react";
import { StoreDefaultImage, ClockIcon } from "../../images";
import { renderValidUrl } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setStoreExistStatus, setStoreID } from "../../redux/action";

const convertTimeFormat = (time) => {
  if (!time) return "Invalid time";
  const [hours, minutes] = time.split(":");
  const parsedHours = parseInt(hours, 10);
  const period = parsedHours >= 12 ? "pm" : "am";
  const formattedHours = parsedHours % 12 === 0 ? 12 : parsedHours % 12;

  return `${formattedHours}:${minutes} ${period}`;
};

const formatOpeningDays = (openDays, openingTimes) => {
  if (!openDays || openDays.length === 0) return "Closed";

  const currentTime = new Date();
  const openingTime = new Date();
  const closingTime = new Date();
  const [openingHours, openingMinutes] = openingTimes.from?.split(":") || [];
  const [closingHours, closingMinutes] = openingTimes.to?.split(":") || [];

  openingTime.setHours(openingHours, openingMinutes);
  closingTime.setHours(closingHours, closingMinutes);

  if (currentTime < openingTime || currentTime > closingTime) return "Closed";

  if (openDays.length === 1) {
    return `Open ${capitalizeDay(openDays[0].openDays)}`;
  }

  const firstDay = capitalizeDay(openDays[0].openDays);
  const lastDay = capitalizeDay(openDays[openDays.length - 1].openDays);

  return `Open ${firstDay} - ${lastDay}`;
};

const capitalizeDay = (day) =>
  day.charAt(0).toUpperCase() + day.slice(1, 3);

const StoreCard = ({ store, index }) => {
  const { name, image, status, deliveryTime, openDays, openingTimes, businessType } = store;

  const formattedOpeningDays = formatOpeningDays(openDays, openingTimes);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.stopPropagation();
    dispatch(setStoreID(index));
    dispatch(setStoreExistStatus(index !== -1));
    navigate("/dashboard");
  };

  // const perc_completion = status === "Draft" ? 25 : 100;

  return (
    <section
      className={`w-full h-full min-h-[164px] max-w-[30%] bg-white flex flex-col rounded py-8 px-6 gap-[30px]
        ${status === "Draft" ? "border-[#FFD60A] border-[1px] bg-[#FFD60A0D]" : "shadow-[0px_4px_8px_rgba(51,51,51,0.16)]"}`}
      onClick={handleClick}
    >
      <div className="flex items-center gap-5">
        <img
          src={image ? renderValidUrl(image) : StoreDefaultImage}
          alt={`${name || "Store"} image`}
          className="w-[100px] h-[100px] rounded-full"
        />

        <div className="flex flex-col gap-2">
          {status !== "Draft" && businessType && (
            <p className="bg-[#186F3D1A] text-[#186F3D] text-[10px] text-center leading-[15px] rounded-full w-[100px] px-2 py-1">
              {businessType}
            </p>
          )}

          <h3 className="text-[25px] text-[#333333] font-bold leading-[40px]">
            {name}
          </h3>

          {status === "Draft" ? (
            <p className="text-[10px] text-[#333333]">
              Store submission is now under review. We'll notify you once it's been approved.
            </p>
          ) : (
            <div className="flex items-center h-[15px]">
              <ClockIcon className="mr-2" />
              <p className="text-[10px] text-[#186F3D]">
                {formattedOpeningDays === "Closed"
                  ? "Not Delivering"
                  : `Delivery from ${convertTimeFormat(deliveryTime?.from)} - ${convertTimeFormat(deliveryTime?.to)}`}
              </p>
            </div>
          )}
        </div>
      </div>
      {/* {status !== "Draft" && (
        <div className="flex flex-col gap-2">
          <p className="text-[13px] leading-[23px]">{`Store Profile Completion: ${perc_completion}%`}</p>
          <div className="relative w-full bg-[#EBECEB] h-2 rounded-full overflow-hidden">
            <div
              style={{ width: `${perc_completion}%` }}
              className="bg-[#006B0B] h-full rounded-full"
            />
          </div>
        </div>
      )}` */}
    </section>
  );
};

export default StoreCard;
