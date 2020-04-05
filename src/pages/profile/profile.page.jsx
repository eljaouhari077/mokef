import React from "react";
import { IoMdInformationCircleOutline } from "react-icons/io";

import Header from "./header/header";
import ExpandableCard from "./expandable-card/expandable-card";
import { FaFileContract, FaImages, FaRegEdit } from "react-icons/fa";
import { MdRateReview } from "react-icons/md";
import Contract from "./contract/contract";
import Gallery from "./gallery/gallery";
import Reviews from "./reviews/reviews";

const ProfilePage = ({ location }) => {
  const isOwnProfile = location.pathname === "/profile";

  return (
    <div>
      <Header />
      <ExpandableCard
        isOwnProfile={isOwnProfile}
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
        isOwnProfile={isOwnProfile}
        title="Contrats"
        titleIcon={<FaFileContract style={{ fontSize: "1.5rem" }} />}
      >
        <Contract />
        <Contract />
      </ExpandableCard>

      <ExpandableCard
        isOwnProfile={isOwnProfile}
        title="Realisations"
        titleIcon={<FaImages style={{ fontSize: "1.5rem" }} />}
      >
        <Gallery />
      </ExpandableCard>

      <ExpandableCard
        isOwnProfile={isOwnProfile}
        title="Avis"
        titleIcon={<MdRateReview style={{ fontSize: "1.5rem" }} />}
      >
        <Reviews />
      </ExpandableCard>
    </div>
  );
};

export default ({ location }) => {
  return <ProfilePage location={location} />;
};
