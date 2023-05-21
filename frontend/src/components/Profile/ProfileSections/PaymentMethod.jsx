import React from "react";
import styles from "../../../styles/styles";
import { RiVisaLine } from "react-icons/ri";
import { AiOutlineDelete } from "react-icons/ai";

const PaymentMethod = () => {
  return (
    <div className="w-full px-5">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-[25px] font-[600] text-[#000000ba] pb-2">
          Payment Methods
        </h1>
        <div className={`${styles.button} !rounded-md`}>
          <span className="text-[#fff]">Add New</span>
        </div>
      </div>
      <br />
      <br />
      <div className="w-full bg-white h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10">
        <div className="flex items-center">
          <RiVisaLine size={35} />
        </div>
        <h5 className="pl-5 font-[600]">Teran Neranga</h5>
        <div className="flex pl-8 items-center">
          <h6 className="font-[600]">1234 **** **** ****</h6>
          <h6 className="font-[600] pl-6">05/23</h6>
        </div>
        <div className="min-w-[10%] flex items-center justify-between pl-8">
          <AiOutlineDelete size={25} />
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;
