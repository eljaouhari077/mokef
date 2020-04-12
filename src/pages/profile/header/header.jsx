import React from "react";
import moment from "moment";

import Avatar from "../../../assets/anonymous.png";
import { Flex } from "../../../components/shared/shared.styled";
import { MdLocationOn } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { Rate } from "antd";
import { SImage, Root, UserInfo, Span } from "./header.styled";
import { UserContext } from "../../../contexts/user-context";
import { getStorageFile } from "../../../utils/storage";
import { FirebaseContext } from "../../../firebase";

const Header = () => {
  const [avatar, setAvatar] = React.useState(Avatar);
  const { user } = React.useContext(UserContext);
  const fb = React.useContext(FirebaseContext);

  React.useEffect(() => {
    getAvatar();
  }, []);

  const getUserElapsedTime = () => {
    const userCreatedAt = moment.unix(user.created_at.seconds);
    return moment().diff(userCreatedAt, "hours");
  };
  const getAvatar = () => {
    if (!user.avatarURL) return;

    return getStorageFile(fb, user.avatarURL).then((url) => {
      setAvatar(url);
    });
  };

  return (
    <Root>
      <Flex justify="center" align="center">
        <SImage src={avatar} alt="Avatar" />
        <UserInfo>
          <h3>{user.fullName}</h3>
          <Flex align="baseline">
            <Rate disabled defaultValue={4.5} allowHalf={true} />
            <Span>
              4.6 <span>(211)</span>
            </Span>
          </Flex>
          <div>
            <MdLocationOn />
            <Span>{user.ville}</Span>
          </div>
          <div>
            <FaUserAlt />
            <Span>Membre depuis {getUserElapsedTime()}h</Span>
          </div>
        </UserInfo>
      </Flex>
    </Root>
  );
};

export default Header;
