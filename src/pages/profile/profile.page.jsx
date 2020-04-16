import React from "react";
import { IoMdInformationCircleOutline } from "react-icons/io";
import PropTypes from "prop-types";

import Header from "./header/header";
import ExpandableCard from "./expandable-card/expandable-card";
import { FaFileContract, FaImages } from "react-icons/fa";
import { MdRateReview } from "react-icons/md";
import Contract from "./contract/contract";
import Reviews from "./reviews/reviews";
import DescriptionModal from "./modals/description.modal";
import { UserContext } from "../../contexts/user-context";
import { Empty } from "antd";
import { syncUserOnUpdate } from "../../utils/dao";
import { FirebaseContext } from "../../firebase";
import PicturesWall from "./gallery/pictures-wall";

const ProfilePage = ({ location }) => {
  const fb = React.useContext(FirebaseContext);
  const { user, setUser } = React.useContext(UserContext);
  const [
    isDescriptionModalVisible,
    setIsDescriptionModalVisible,
  ] = React.useState(false);
  const isOwnProfile = location.pathname === "/profile";

  React.useEffect(() => {
    syncUserOnUpdate(fb, user, setUser);
    // eslint-disable-next-line
  }, []);

  const [user, setUser] = React.useState(null);

  return (
    <div>
      <Header />
      <ExpandableCard
        openModal={() => setIsDescriptionModalVisible(true)}
        showEdit
        isOwnProfile={isOwnProfile}
        title="A propos"
        titleIcon={
          <IoMdInformationCircleOutline style={{ fontSize: "1.8rem" }} />
        }
      >
        {user.profile.description ? (
          <p>{user.profile.description}</p>
        ) : (
          <Empty />
        )}
      </ExpandableCard>

      <ExpandableCard
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
        <PicturesWall />
      </ExpandableCard>

      <ExpandableCard
        title="Avis"
        titleIcon={<MdRateReview style={{ fontSize: "1.5rem" }} />}
      >
        <Reviews />
      </ExpandableCard>

      <DescriptionModal
        isVisible={isDescriptionModalVisible}
        closeModal={() => setIsDescriptionModalVisible(false)}
      />
    </div>
  );
};

ProfilePage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default ({ location }) => {
  return <ProfilePage location={location} />;
};
