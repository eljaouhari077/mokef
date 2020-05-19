import React from "react";
import Carousel from "react-elastic-carousel";
import Testimonial from "./testimonial/testimonial.testimonials";

const Testimonials = () => {
  return (
    <Carousel style={{ height: "35rem", padding: "1rem" }} itemsToShow={1}>
      <Testimonial />
      <Testimonial />
      <Testimonial />
      <Testimonial />
      <Testimonial />
    </Carousel>
  );
};

export default Testimonials;
