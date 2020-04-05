import React from "react";
import { IoMdInformationCircleOutline } from "react-icons/io";

import Header from "./header/header";
import ExpandableCard from "./expandable-card/expandable-card";
import { FaFileContract, FaImages } from "react-icons/fa";
import { MdRateReview } from "react-icons/md";
import Contract from "./contract/contract";
import Gallery from "./gallery/gallery";
import Reviews from "./reviews/reviews";

const ProfilePage = () => {
  return (
    <div>
      <Header />
      <ExpandableCard
        title="A propos"
        titleIcon={
          <IoMdInformationCircleOutline style={{ fontSize: "1.8rem" }} />
        }
      >
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis
          corrupti totam alias quae non suscipit consequatur sequi eum est
          excepturi!
        </p>
      </ExpandableCard>

      <ExpandableCard
        title="Contrats"
        titleIcon={<FaFileContract style={{ fontSize: "1.5rem" }} />}
      >
        <Contract />
        <Contract />
      </ExpandableCard>

      <ExpandableCard
        title="Realisations"
        titleIcon={<FaImages style={{ fontSize: "1.5rem" }} />}
      >
        <Gallery />
      </ExpandableCard>

      <ExpandableCard
        title="Avis"
        titleIcon={<MdRateReview style={{ fontSize: "1.5rem" }} />}
      >
        <Reviews />
      </ExpandableCard>
    </div>
  );
};

export default ProfilePage;
