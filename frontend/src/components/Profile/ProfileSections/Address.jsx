import React from "react";
import { RiVisaLine } from "react-icons/ri";
import { AiOutlineDelete } from "react-icons/ai";
import styles from "../../../styles/styles";

const Address = () => {
  return (
    <div className="w-full px-5">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-[25px] font-[600] text-[#000000ba] pb-2">
          My Addresses
        </h1>
        <div className={`${styles.button} !rounded-md`}>
          <span className="text-[#fff]">Add New</span>
        </div>
      </div>
      <br />
      <br />
      <div className="w-full bg-white h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10">
        <div className="flex items-center">
          <h5 className="pl-5 font-[600]">Default Address</h5>
        </div>
        <div className="flex pl-8 items-center">
          <h6 className="font-[600]">
            31, Right Place, Arachchikanda, Hikkaduwa
          </h6>
        </div>
        <div className="flex pl-8 items-center">
          <h6 className="font-[600]">+94713637577</h6>
        </div>

        <div className="min-w-[10%] flex items-center justify-between pl-8">
          <AiOutlineDelete size={25} />
        </div>
      </div>
    </div>
  );
};

export default Address;
