import React from "react";
import { IoMdInformationCircleOutline } from "react-icons/io";
import PropTypes from "prop-types";

import ExpandableCard from "./expandable-card/expandable-card";
import { FaFileContract, FaImages } from "react-icons/fa";
import { MdRateReview } from "react-icons/md";
import Announce from "./announce/announce";
import Reviews from "./reviews/reviews";
import DescriptionModal from "./modals/description.modal";
import { UserContext } from "../../contexts/user-context";
import { Empty } from "antd";
import { syncUserOnUpdate, getUserAnnounces } from "../../utils/dao";
import { FirebaseContext } from "../../firebase";
import PicturesWall from "./gallery/pictures-wall";
import UserInfo from "../../components/user-info/user-info";

const ProfilePage = ({ location }) => {
  const fb = React.useContext(FirebaseContext);
  const { user, setUser } = React.useContext(UserContext);
  const [announces, setAnnounces] = React.useState(null);

  const [
    isDescriptionModalVisible,
    setIsDescriptionModalVisible,
  ] = React.useState(false);
  const isOwnProfile = location.pathname === "/profile";

  React.useEffect(() => {
    syncUserOnUpdate(fb, user, setUser);
    getUserAnnounces(fb, user).then(({ docs }) => {
      setAnnounces(docs.map((doc) => ({ ...doc.data(), uid: doc.id })));
    });
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <UserInfo />
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
        {announces ? (
          announces.map((announce) => (
            <Announce
              key={announce.uid}
              title={announce.title}
              imageURL={announce.imageURL}
              uid={announce.uid}
            />
          ))
        ) : (
          <Empty />
        )}
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
