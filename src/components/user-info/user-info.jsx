import React from "react";
import { Flex } from "../shared/shared.styled";
import { SImage, Span, UserInformations, Root } from "./user-info.styled";
import { Rate } from "antd";
import Avatar from "../../assets/anonymous.png";
import { UserContext } from "../../contexts/user-context";
import { FirebaseContext } from "../../firebase";
import moment from "moment";
import { getStorageFile } from "../../utils/storage";
import { MdLocationOn } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { withRouter } from "react-router-dom";

function UserInfo({
  userToDisplay,
  avgReviews,
  totalReviews,
  history,
  location,
}) {
  const [avatar, setAvatar] = React.useState(Avatar);
  const [userData, setUserData] = React.useState(null);
  const { user } = React.useContext(UserContext);
  const fb = React.useContext(FirebaseContext);

  React.useEffect(() => {
    userToDisplay ? setUserData(userToDisplay) : setUserData(user);
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    if (!userData) return;
    getAvatar();
    // eslint-disable-next-line
  }, [userData]);

  const getUserElapsedTime = () => {
    if (!userData.created_at) return 0;

    const userCreatedAt = moment.unix(userData.created_at.seconds);
    return moment().diff(userCreatedAt, "hours");
  };
  const getAvatar = () => {
    if (!userData.avatarURL) return;

    return getStorageFile(fb, userData.avatarURL).then((url) => {
      setAvatar(url);
    });
  };

  return (
    <>
      {userData && (
        <Root
          onClick={() => {
            if (!location.pathname.includes("profile"))
              history.push(`/profile/${userToDisplay.uid}`);
          }}
        >
          <Flex justify="center" align="center">
            <SImage src={avatar} alt="Avatar" />
            <UserInformations>
              <h3>{userData.fullName}</h3>
              <Flex align="baseline">
                <Rate disabled defaultValue={avgReviews} allowHalf={true} />
                <Span>
                  {avgReviews} <span>({totalReviews})</span>
                </Span>
              </Flex>
              <div>
                <MdLocationOn />
                <Span>{userData.ville}</Span>
              </div>
              <div>
                <FaUserAlt />
                <Span>Membre depuis {getUserElapsedTime()}h</Span>
              </div>
            </UserInformations>
          </Flex>
        </Root>
      )}
    </>
  );
}

export default withRouter(UserInfo);
