import React from "react";
import {
  SupportIllustration,
  WhatsAppSupport,
  PhoneSupport,
  EmailSupport,
} from "../../images";

const Support = () => {
  return (
    <div>
      <div className="bg-[#f2f2f2] border border-red-500">Support</div>
      <div className="bg-white p-[50px]">
        <div>
          <div>Need Help?</div>
          <div>Reach our to us on the following channels?</div>
          <div>
            <img src={SupportIllustration} />
          </div>
        </div>
        <div>
          <div>
            <div>
              <img src={EmailSupport} />
            </div>
            <div></div>
          </div>
          <div>
            <div>
              <img src={PhoneSupport} />
            </div>
            <div></div>
          </div>
          <div>
            <div>
              <img src={WhatsAppSupport} />
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Support;
