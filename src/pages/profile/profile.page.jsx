import React from "react";
import { IoMdInformationCircleOutline } from "react-icons/io";

import Header from "./header/header";
import ExpandableCard from "./expandable-card/expandable-card";
import { FaFileContract, FaImages } from "react-icons/fa";
import { MdRateReview } from "react-icons/md";
import Contract from "./contract/contract";
import Gallery from "./gallery/gallery";
import Reviews from "./reviews/reviews";
import DescriptionModal from "./modals/description.modal";

const ProfilePage = ({ location }) => {
  const [isDescModalVisible, setIsDescModalVisible] = React.useState(false);

  const isOwnProfile = location.pathname === "/profile";

  const handleModalOpen = (modal) => {
    switch (modal) {
      case "description":
        setIsDescModalVisible(true);
        break;

      default:
        break;
    }
  };

  const handleModalClose = (modal) => {
    switch (modal) {
      case "description":
        setIsDescModalVisible(false);
        break;

      default:
        break;
    }
  };

  return (
    <div>
      <Header />
      <ExpandableCard
        handleEdit={handleModalOpen}
        modalType="description"
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

      <DescriptionModal
        isVisible={isDescModalVisible}
        handleModalClose={handleModalClose}
      />
    </div>
  );
};

export default ({ location }) => {
  return <ProfilePage location={location} />;
};
