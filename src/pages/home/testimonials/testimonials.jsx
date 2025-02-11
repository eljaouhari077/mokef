import React from "react";
import Carousel from '@brainhubeu/react-carousel';

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
    rating: 4,
  },
  {
    name: "Ramon Schmidt",
    job: "Writer",
    img: T2,
    rating: 4.5,
  },
  {
    name: "Clyde Reid",
    job: "Photographist",
    img: T3,
    rating: 5,
  },
  {
    name: "Christy Thompson",
    job: "Designer",
    img: T4,
    rating: 4.5,
  },
  {
    name: "Pearl Rodriguez",
    job: "Advisor",
    img: T5,
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <div style={{ margin: '4rem 0' }}>
      <Carousel
        plugins={['fastSwipe']}
        itemsToShow={1}
      >
        {testimonials.map((person, idx) => (
          <Testimonial person={person} key={idx} />
        ))}
      </Carousel>
    </div>
  );
};

export default Testimonials;
