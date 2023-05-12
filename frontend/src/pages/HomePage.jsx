import React from "react";
import Header from "../components/Layouts/Header";
import Hero from "../components/Home/Hero/Hero";
import Categories from "../components/Home/Categories/Categories";
import BestDeals from "../components/Home/BestDeals/BestDeals";
import FeaturedProducts from "../components/Home/FeaturedProducts/FeaturedProducts";
import Events from "../components/Home/Events/Events";
import Sponsored from "../components/Home/Sponsored/Sponsored";
import Footer from "../components/Layouts/Footer";

const HomePage = () => {
  return (
    <div>
      <Header activeHeading={1} />
      <Hero />
      <Categories />
      <BestDeals />
      <Events />
      <FeaturedProducts />
      <Sponsored />
      <Footer />
    </div>
  );
};

export default HomePage;
