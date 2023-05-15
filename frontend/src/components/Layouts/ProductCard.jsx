import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/styles";
import {
  AiFillEye,
  AiFillHeart,
  AiFillStar,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineStar,
} from "react-icons/ai";
import ProductDetailsCard from "./ProductDetailsCard";

const ProductCard = ({ productData }) => {
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);

  const d = productData.name;
  const product_name = d.replace(/\s+/g, "-");

  return (
    <div className="w-full h-[370px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer">
      <div className="flex justify-end"></div>
      <Link to={`/product/${product_name}`}>
        <img
          className="w-full h-[170px] object-contain"
          src={productData.image_Url[0].url}
          alt=""
        />
      </Link>
      <Link to="/">
        <h5 className={`${styles.shop_name}`}>{productData.shop.name}</h5>
      </Link>
      <Link to={`/product/${product_name}`}>
        <h4 className={`text-[16px] pb-3 font-[450]`}>
          {productData.name.length > 40
            ? productData.name.slice(0, 40) + "..."
            : productData.name}
        </h4>
        <div className="flex">
          <AiFillStar color="#F6BA00" className="mr-2 cursor-pointer " />
          <AiFillStar color="#F6BA00" className="mr-2 cursor-pointer " />
          <AiFillStar color="#F6BA00" className="mr-2 cursor-pointer " />
          <AiFillStar color="#F6BA00" className="mr-2 cursor-pointer " />
          <AiOutlineStar color="#F6BA00" className="mr-2 cursor-pointer" />
        </div>

        <div className="py-2 flex items-center justify-between">
          <div className="flex">
            <h5 className={`${styles.productDiscountPrice}`}>
              {productData.price === 0
                ? `$ ${productData.price}`
                : productData.discount_price}
            </h5>
            <h4 className={`${styles.price}`}>
              {productData.price ? `$ ${productData.price}` : null}
            </h4>
          </div>
          <span className="font-[400] text-[17px] text-[#68d284]">
            {productData.total_sell} sold
          </span>
        </div>
        {/* side options */}
      </Link>
      <div>
        {click ? (
          <AiFillHeart
            size={22}
            className="cursor-pointer absolute right-2 top-5"
            onClick={() => {
              setClick(!click);
            }}
            color={click ? "red" : "black"}
            title="Remove from wishlist"
          />
        ) : (
          <AiOutlineHeart
            size={22}
            className="cursor-pointer absolute right-2 top-5"
            onClick={() => {
              setClick(!click);
            }}
            color={click ? "red" : "black"}
            title="Add to wishlist"
          />
        )}

        <AiOutlineEye
          size={22}
          className="cursor-pointer absolute right-2 top-14"
          onClick={() => {
            setOpen(!open);
          }}
          title="Remove from wishlist"
        />
        <AiOutlineShoppingCart
          size={22}
          className="cursor-pointer absolute right-2 top-24"
          onClick={() => {
            setOpen(!open);
          }}
          title="Add to cart"
        />
      </div>
      {open && open ? (
        <ProductDetailsCard open={open} setOpen={setOpen} data={productData} />
      ) : null}
    </div>
  );
};

export default ProductCard;
