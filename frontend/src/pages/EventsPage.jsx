import React from "react";
import Header from "../components/Layouts/Header";
import Footer from "../components/Layouts/Footer";
import EventCard from "../components/Home/Events/EventCard";

const EventsPage = () => {
  return (
    <div>
      <Header activeHeading={4} />
      <EventCard />
      <Footer />
    </div>
  );
};

export default EventsPage;
