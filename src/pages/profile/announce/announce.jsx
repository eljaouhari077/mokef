import React from "react";
import Image from "react-image";
import { Card } from "antd";
import Cover from "../../../assets/notfound.jpg";
import PropTypes from "prop-types";
import { getStorageFile } from "../../../utils/storage";
import { FirebaseContext } from "../../../firebase";
import { withRouter } from "react-router-dom";
import styled from "styled-components";

const SCard = styled(Card)`
  width: 100%;
  cursor: pointer;

  img {
    height: 15rem;
    object-fit: cover;
  }
`;

const Announce = ({ title, imageURL, uid, history }) => {
  const fb = React.useContext(FirebaseContext);
  const [img, setImg] = React.useState(Cover);

  React.useEffect(() => {
    if (imageURL) {
      getStorageFile(fb, imageURL).then((val) => setImg(val));
    }
    // eslint-disable-next-line
  }, []);

  return (
    <SCard
      style={{ margin: "1.5rem 0" }}
      onClick={() => history.push(`/announce/${uid}`)}
      cover={<Image src={img} />}
    >
      <Card.Meta title={title} />
    </SCard>
  );
};

Announce.propTypes = {
  title: PropTypes.string.isRequired,
};

export default withRouter(Announce);
