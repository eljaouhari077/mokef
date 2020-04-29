import React from "react";
import Image from "react-image";
import { Card } from "antd";
import Cover from "../../../assets/sabbath.jpg";
import PropTypes from "prop-types";
import { getStorageFile } from "../../../utils/storage";
import { FirebaseContext } from "../../../firebase";

const Announce = ({ title, imageURL }) => {
  const fb = React.useContext(FirebaseContext);
  const [img, setImg] = React.useState(Cover);

  React.useEffect(() => {
    if (imageURL) {
      getStorageFile(fb, imageURL).then((val) => setImg(val));
    }
    // eslint-disable-next-line
  }, []);

  return (
    <Card style={{ margin: "1.5rem 0" }} cover={<Image src={img} />}>
      <Card.Meta title={title} />
    </Card>
  );
};

Announce.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Announce;
