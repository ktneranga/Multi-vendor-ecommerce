import React, { useState } from "react";
import { useSelector } from "react-redux";
import styles from "../../../styles/styles";
import { backend_url } from "../../../server";
import { AiOutlineCamera } from "react-icons/ai";

const UserProfile = () => {
  const { user } = useSelector((state) => state.user);

  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [phone, setPhone] = useState(user && user.phoneNumber);
  const [zip, setZip] = useState(user && user.zipCode);
  const [address1, setAddress1] = useState(user && user.address1);
  const [address2, setAddress2] = useState(user && user.address2);

  return (
    <>
      <div className="flex justify-center w-full">
        <div className="relative">
          <img
            className="w-[150px] h-[150px] rounded-full border-[3px] border-[#3ad132] object-cover"
            src={`${backend_url}/${user && user.avatar}`}
          />
          <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
            <input
              type="file"
              id="image"
              className="hidden"
              onChange={() => {}}
            />
            <label htmlFor="image">
              <AiOutlineCamera />
            </label>
          </div>
        </div>
      </div>
      <br />
      <br />
      <div className="w-full px-8">
        <form onSubmit={() => {}} aria-required={true}>
          <div className="w-full 800px:flex block pb-3">
            <div className="w-[100%] 800px:w-[50%]">
              <label className="block pb-2">Full Name</label>
              <input
                type="text"
                className={`${styles.input} w-[100%] 800px:!w-[95%] mb-4 800px:mb-0 p-2`}
                required
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            <div className="w-[100%] 800px:w-[50%]">
              <label className="block pb-2">Email Address</label>
              <input
                type="text"
                className={`${styles.input} w-[100%] 800px:!w-[95%] mb-4 800px:mb-0 p-2`}
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="w-full 800px:flex block pb-3">
            <div className="w-[100%] 800px:w-[50%]">
              <label className="block pb-2">Phone Number</label>
              <input
                type="text"
                className={`${styles.input} w-[100%] 800px:!w-[95%] mb-4 800px:mb-0 p-2`}
                required
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              />
            </div>
            <div className="w-[100%] 800px:w-[50%]">
              <label className="block pb-2">Zip Code</label>
              <input
                type="text"
                className={`${styles.input} w-[100%] 800px:!w-[95%] mb-4 800px:mb-0 p-2`}
                required
                value={zip}
                onChange={(e) => {
                  setZip(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="w-full 800px:flex block pb-3">
            <div className="w-[100%] 800px:w-[50%]">
              <label className="block pb-2">Address 1</label>
              <input
                type="text"
                className={`${styles.input} w-[100%] 800px:!w-[95%] mb-4 800px:mb-0 p-2`}
                required
                value={address1}
                onChange={(e) => {
                  setAddress1(e.target.value);
                }}
              />
            </div>
            <div className="w-[100%] 800px:w-[50%]">
              <label className="block pb-2">Address 2</label>
              <input
                type="text"
                className={`${styles.input} w-[100%] 800px:!w-[95%] mb-4 800px:mb-0 p-2`}
                required
                value={address2}
                onChange={(e) => {
                  setAddress2(e.target.value);
                }}
              />
            </div>
          </div>
          <input
            className={`w-[250px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`}
            required
            value="Update"
            type="submit"
          />
        </form>
      </div>
    </>
  );
};

export default UserProfile;
