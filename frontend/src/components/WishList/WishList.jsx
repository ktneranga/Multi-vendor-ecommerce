import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { IoHeartOutline } from "react-icons/io5";
import styles from "../../styles/styles";
import { BsCartPlus } from "react-icons/bs";

const WishList = ({ setOpenWishList }) => {
  const cartData = [
    {
      name: "Iphone 14 pro max 256 gb ssd 8gb ram silver color",
      description: "test",
      price: 999,
    },
    {
      name: "Iphone 14 pro max 256 gb ssd 8gb ram silver color",
      description: "test",
      price: 999,
    },
    {
      name: "Iphone 14 pro max 256 gb ssd 8gb ram silver color",
      description: "test",
      price: 999,
    },
  ];

  return (
    <div>
      <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
        <div className="fixed top-0 right-0 min-h-full w-[25%] bg-white flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex w-full justify-end pt-5 pr-5">
              <RxCross1
                size={25}
                className="cursor-pointer"
                onClick={() => setOpenWishList(false)}
              />
            </div>
            {/* item length */}
            <div className={`${styles.noramlFlex} p-4 mb-10`}>
              <IoHeartOutline size={25} />
              <h5 className="pl-2 text-[20px] font-[500]">3 Items</h5>
            </div>

            {/* cart single items */}
            <div className="w-full border-t ">
              {cartData &&
                cartData.map((i, index) => (
                  <WishListSingle key={index} data={i} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const WishListSingle = ({ data }) => {
  let [value, setValue] = useState(1);
  const totalPrice = data.price * value;
  return (
    <div className="border-b p-4">
      <div className="w-full flex items-center">
        <div className="flex flex-col items-center">
          <RxCross1 size={12} />
        </div>
        <img
          src="https://bonik-react.vercel.app/assets/images/products/Fashion/Clothes/1.SilverHighNeckSweater.png"
          alt=""
          className="w-[80px] h-[80px] ml-1"
        />
        <div className="pl-[5px]">
          <h1>{data.name}</h1>
          <h4 className="font-[400] text-[15px] text-[#00000082]">
            ${data.price} * {value}
          </h4>
          <h4 className="font-[600] text-[17px] text-[#d02222] font-Roboto">
            US${totalPrice}
          </h4>
        </div>
        <div>
          <BsCartPlus size={20} />
        </div>
      </div>
    </div>
  );
};

export default WishList;
