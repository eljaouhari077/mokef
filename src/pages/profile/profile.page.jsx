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
import { syncUserOnUpdate, getUserAnnounces, getUser } from "../../utils/dao";
import { getStorageFile } from "../../utils/storage";
import { FirebaseContext } from "../../firebase";
import PicturesWall from "./gallery/pictures-wall";
import UserInfo from "../../components/user-info/user-info";
import styled from "styled-components";
import Gallery from "./gallery/gallery";

const Container = styled.div`
  max-width: 1050px;
  margin: 0 auto;

  @media (min-width: 1000px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      "info rating"
      "announces announces"
      "gallery gallery";
  }
`;

const Announces = styled.div`
  @media (min-width: 600px) {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
    grid-gap: 3rem;
  }
`;

const ProfilePage = ({ location, match }) => {
  const fb = React.useContext(FirebaseContext);
  const { user, setUser } = React.useContext(UserContext);
  const [pageUser, setPageUser] = React.useState(null);
  const [announces, setAnnounces] = React.useState(null);

  const [
    isDescriptionModalVisible,
    setIsDescriptionModalVisible,
  ] = React.useState(false);
  const isOwnProfile = location.pathname === "/profile";

  React.useEffect(() => {
    if (isOwnProfile) {
      syncUserOnUpdate(fb, user, setUser);
      getUserAnnounces(fb, user.uid).then(({ docs }) => {
        setAnnounces(docs.map((doc) => ({ ...doc.data(), uid: doc.id })));
      });
    } else {
      getUserAnnounces(fb, match.params.id).then(({ docs }) => {
        setAnnounces(docs.map((doc) => ({ ...doc.data(), uid: doc.id })));
      });
      getUser(fb, match.params.id).then((doc) => {
        Promise.all(
          doc
            .data()
            .profile.gallery.map((img) => getStorageFile(fb, `gallery/${img}`))
        ).then((res) =>
          setPageUser({
            ...doc.data(),
            profile: {
              ...doc.data().profile,
              gallery: res,
            },
          })
        );
      });
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {(isOwnProfile || pageUser) && (
        <div>
          <UserInfo userToDisplay={pageUser} />
          <Container>
            <ExpandableCard
              openModal={() => setIsDescriptionModalVisible(true)}
              showEdit
              isOwnProfile={isOwnProfile}
              title="A propos"
              area="info"
              titleIcon={
                <IoMdInformationCircleOutline style={{ fontSize: "1.8rem" }} />
              }
            >
              {isOwnProfile ? (
                user.profile.description
              ) : pageUser.profile.description ? (
                <p>{user.profile.description}</p>
              ) : (
                <Empty />
              )}
            </ExpandableCard>

            <ExpandableCard
              title="Contrats"
              area="announces"
              titleIcon={<FaFileContract style={{ fontSize: "1.5rem" }} />}
            >
              <Announces>
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
              </Announces>
            </ExpandableCard>

            <ExpandableCard
              isOwnProfile={isOwnProfile}
              title="Realisations"
              area="gallery"
              titleIcon={<FaImages style={{ fontSize: "1.5rem" }} />}
            >
              {isOwnProfile ? (
                <PicturesWall />
              ) : (
                <Gallery gallery={pageUser.profile.gallery} />
              )}
            </ExpandableCard>

            <ExpandableCard
              title="Avis"
              area="rating"
              titleIcon={<MdRateReview style={{ fontSize: "1.5rem" }} />}
            >
              <Reviews />
            </ExpandableCard>

            <DescriptionModal
              isVisible={isDescriptionModalVisible}
              closeModal={() => setIsDescriptionModalVisible(false)}
            />
          </Container>
        </div>
      )}
    </>
  );
};

ProfilePage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default ({ location, match }) => {
  return <ProfilePage location={location} match={match} />;
};
