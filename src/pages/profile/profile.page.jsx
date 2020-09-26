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
    grid-template-columns: repeat(auto-fit, minmax(20rem, 30rem));
    grid-gap: 3rem;
  }
`;

const ProfilePage = ({ location, match, history }) => {
  const fb = React.useContext(FirebaseContext);
  const { user, setUser } = React.useContext(UserContext);
  const [pageUser, setPageUser] = React.useState(null);
  const [announces, setAnnounces] = React.useState(null);
  const [reviews, setReviews] = React.useState([]);
  const [avgReviews, setAvgReviews] = React.useState(0);
  const [totalReviews, setTotalReviews] = React.useState(0);

  const [
    isDescriptionModalVisible,
    setIsDescriptionModalVisible,
  ] = React.useState(false);
  const isOwnProfile = location.pathname === "/profile";

  const getAverageAndTotalReviews = (usr) => {
    if (usr.reviews) {
      let total = 0;
      for (let i = 0; i < usr.reviews.length; i++) {
        total += usr.reviews[i].rating;
      }
      setAvgReviews(total / usr.reviews.length);
      setTotalReviews(usr.reviews.length);
    }
  };

  const getReviews = (usr) => {
    if (usr.reviews) {
      return Promise.all(
        usr.reviews.map((review) => getAdditionalReviewInfo(review))
      ).then((result) => setReviews(result));
    }
  };

  const getAdditionalReviewInfo = async (review) => {
    const usr = await getUser(fb, review.userId);
    let avatarURL;

    if (usr.data().avatarURL) {
      avatarURL = await getStorageFile(fb, usr.data().avatarURL);
    }

    return {
      fullName: usr.data().fullName,
      review,
      avatarURL,
    };
  };

  React.useEffect(() => {
    if (isOwnProfile) {
      syncUserOnUpdate(fb, user, setUser);
      getUserAnnounces(fb, user.uid).then(({ docs }) => {
        setAnnounces(docs.map((doc) => ({ ...doc.data(), uid: doc.id })));
      });
      getReviews(user);
      getAverageAndTotalReviews(user);
    } else {
      if (!match.params.id) {
        return history.push("/");
      }
      getUserAnnounces(fb, match.params.id).then(({ docs }) => {
        setAnnounces(docs.map((doc) => ({ ...doc.data(), uid: doc.id })));
      });
      getUser(fb, match.params.id)
        .then((doc) => {
          getReviews(doc.data());
          getAverageAndTotalReviews(doc.data());
          if (doc.data().profile.gallery) {
            Promise.all(
              doc
                .data()
                .profile.gallery.map((img) =>
                  getStorageFile(fb, `gallery/${img}`)
                )
            ).then((res) =>
              setPageUser({
                ...doc.data(),
                profile: {
                  ...doc.data().profile,
                  gallery: res,
                },
              })
            );
          } else {
            setPageUser({
              ...doc.data(),
            })
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {(isOwnProfile || pageUser) && (
        <div>
          <UserInfo
            userToDisplay={pageUser}
            avgReviews={avgReviews}
            totalReviews={totalReviews}
          />
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
                user.profile.description || <Empty />
              ) : pageUser.profile.description ? (
                <p>{pageUser.profile.description}</p>
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
              <Reviews reviews={reviews} />
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

export default ({ location, match, history }) => {
  return <ProfilePage location={location} match={match} history={history} />;
};
