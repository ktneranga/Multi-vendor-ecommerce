import React, { useEffect, useState } from "react";
import styles from "../styles/styles";
import ProductCard from "../components/Layouts/ProductCard";
import { productData } from "../static/data";
import Header from "../components/Layouts/Header";
import Footer from "../components/Layouts/Footer";

const BestSellingsPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const products =
      productData && productData.sort((a, b) => b.total_sell - a.total_sell);
    setData(products);
    window.scrollTo(0, 0);
  }, []);

  //window.scrollTo(0,0)

  return (
    <div>
      <Header activeHeading={2} />
      <br />
      <br />
      <div className={`${styles.section}`}>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
          {data &&
            data.map((i, index) => <ProductCard key={index} productData={i} />)}
        </div>
        {data && data.length === 0 ? (
          <h1 className="text-center w-full pb-[110px] text-[20px]">
            No products available!
          </h1>
        ) : null}
      </div>
      <Footer />
    </div>
  );
};

export default BestSellingsPage;
