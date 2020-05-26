import React from "react";
import Carousel from "react-elastic-carousel";

import Testimonial from "./testimonial/testimonial.testimonials";
import T1 from "../../../assets/testimonials/1.jpg";
import T2 from "../../../assets/testimonials/2.jpg";
import T3 from "../../../assets/testimonials/3.jpg";
import T4 from "../../../assets/testimonials/4.jpg";
import T5 from "../../../assets/testimonials/5.jpg";

const testimonials = [
  {
    name: "John Doe",
    job: "CEO",
    img: T1,
  },
  {
    name: "Ramon Schmidt",
    job: "Writer",
    img: T2,
  },
  {
    name: "Clyde Reid",
    job: "Photographist",
    img: T3,
  },
  {
    name: "Christy Thompson",
    job: "Designer",
    img: T4,
  },
  {
    name: "Pearl Rodriguez",
    job: "Advisor",
    img: T5,
  },
];

const Testimonials = () => {
  return (
    <Carousel style={{ height: "35rem", padding: "1rem" }} itemsToShow={1}>
      {testimonials.map((person, idx) => (
        <Testimonial person={person} key={idx} />
      ))}
    </Carousel>
  );
};

export default Testimonials;
