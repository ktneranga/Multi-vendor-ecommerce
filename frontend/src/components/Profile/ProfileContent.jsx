import React, { useState } from "react";
import UserProfile from "./ProfileSections/UserProfile";
import AllOrders from "./ProfileSections/AllOrders";
import Refund from "./ProfileSections/Refund";
import TrackOrder from "./ProfileSections/TrackOrder";
import PaymentMethod from "./ProfileSections/PaymentMethod";
import Address from "./ProfileSections/Address";

const ProfileContent = ({ active }) => {
  return (
    <div className="w-full">
      {/* profile page */}
      {active === 1 && <UserProfile />}

      {/* All Orders */}
      {active === 2 && (
        <div>
          <AllOrders />
        </div>
      )}

      {/* refund */}
      {active === 3 && (
        <>
          <Refund />
        </>
      )}

      {/* track order */}
      {active === 5 && (
        <>
          <TrackOrder />
        </>
      )}

      {/* payment method */}
      {active === 6 && (
        <div>
          <PaymentMethod />
        </div>
      )}

      {/* address */}
      {active === 7 && (
        <div>
          <Address />
        </div>
      )}
    </div>
  );
};

export default ProfileContent;
