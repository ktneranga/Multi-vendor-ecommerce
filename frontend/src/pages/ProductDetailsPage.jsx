import React, { useState, useEffect } from "react";
import Header from "../components/Layouts/Header";
import ProductDetails from "../components/Layouts/ProductDetails";
import Footer from "../components/Layouts/Footer";
import { useParams } from "react-router-dom";
import { productData } from "../static/data";
import SuggestedProducts from "../components/Product/SuggestedProducts";

const ProductDetailsPage = () => {
  const [data, setData] = useState(null);
  const { name } = useParams();

  const productName = name.replace(/-/g, " ");

  useEffect(() => {
    const product =
      productData && productData.find((i) => i.name === productName);
    setData(product);
  }, [name]);

  return (
    <div>
      <Header />
      <ProductDetails data={data} />
      {data && <SuggestedProducts data={data} />}
      <Footer />
    </div>
  );
};

export default ProductDetailsPage;
