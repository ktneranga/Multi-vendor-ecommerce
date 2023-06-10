import React from "react";
import { navItems } from "../../static/data";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { useSelector } from "react-redux";
import { backend_url } from "../../server";

const Navbar = ({ active }) => {
  const { user, isAuthenticated } = useSelector((state) => state.user);

  return (
    <div className={`mt-10 800px:m-0 800px:${styles.noramlFlex}`}>
      {navItems &&
        navItems.map((i, index) => (
          <div className="flex mb-[30px] 800px:m-0 ">
            <Link
              to={i.url}
              className={`${
                active === index + 1
                  ? "text-[#17dd1f]"
                  : "text-[#000] 800px:text-[#fff]"
              } font-[500] px-6 cursor-pointer`}
            >
              {i.title}
            </Link>
          </div>
        ))}
      <div className={`${styles.button} ml-4 800px:hidden`}>
        <Link to="/seller-create">
          <h1 className="text-[#fff] flex items-center">
            Become Seller <IoIosArrowForward className="ml-1" />
          </h1>
        </Link>
      </div>
      <br />
      <br />
      <div className="flex w-full justify-center 800px:hidden">
        {isAuthenticated ? (
          <Link to="/profile">
            <div className="border-[3px] border-[#3bc177] w-[50px] h-[50px] rounded-full overflow-hidden">
              <img src={`${backend_url}${user.avatar}`} />
            </div>
          </Link>
        ) : (
          <>
            <Link
              className="text-[18px] font-[600] pr-[10px] text-[#000000b7]"
              to="/login"
            >
              Login /
            </Link>
            <Link
              className="text-[18px] font-[600] pr-[10px] text-[#000000b7]"
              to="sign-up"
            >
              Sign up
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
