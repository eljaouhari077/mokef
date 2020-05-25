import React from "react";
import { Button } from "antd";

import UserInfo from "../../components/user-info/user-info";
import {
  AnnounceInfo,
  SImage,
  AdditionalInfo,
  SDivider,
} from "./announce.styled";
import { getAnnounce, getUserFromRef } from "../../utils/dao";
import { FirebaseContext } from "../../firebase";
import { withRouter } from "react-router-dom";
import { getStorageFile } from "../../utils/storage";
import ImagePreview from "../../components/image-preview/image-preview";
import { SelectedAnnounceContext } from "../../contexts/selected-announce-context";
import { UserContext } from "../../contexts/user-context";

function AnnouncePage({ match, history }) {
  const [announceData, setAnnounceData] = React.useState(null);
  const [announceImage, setAnnounceImage] = React.useState(null);
  const [announceOwner, setAnnounceOwner] = React.useState(null);
  const [isPreviewVisible, setIsPreviewVisible] = React.useState(null);
  const { user } = React.useContext(UserContext);
  const { setSelectedAnnounce } = React.useContext(SelectedAnnounceContext);

  const fb = React.useContext(FirebaseContext);

  React.useEffect(() => {
    getAnnounceData(match.params.id);
    // eslint-disable-next-line
  }, []);

  const isOwnAnnounce = () => announceData.user.id === user.uid;

  const getAnnounceData = async (anounceId) => {
    const result = await getAnnounce(fb, anounceId);
    if (!result.exists) {
      return history.push("/");
    }
    setAnnounceData({ ...result.data(), id: result.id });

    const owner = await getUserFromRef(fb, result.data().user);
    setAnnounceOwner({ ...owner.data(), uid: owner.id });

    if (result.data().imageURL) {
      const image = await getStorageFile(fb, result.data().imageURL);
      setAnnounceImage(image);
    }
  };

  return (
    <>
      {announceData && (
        <div>
          {announceOwner && <UserInfo userToDisplay={announceOwner} />}
          <AnnounceInfo direction="column" align="start">
            {!isOwnAnnounce() && (
              <Button
                type="primary"
                size="large"
                onClick={() => {
                  setSelectedAnnounce(announceData);
                  history.push("/paiement");
                }}
              >
                Continuer {announceData.prix}DH
              </Button>
            )}
            {announceImage && (
              <SImage
                src={announceImage}
                onClick={() => setIsPreviewVisible(true)}
                alt="Announce Picture"
              />
            )}
            <AdditionalInfo justify="center" align="center">
              <span>{announceData.category}</span>
              <SDivider type="vertical" />
              <span>{announceData.ville}</span>
            </AdditionalInfo>
            <h2>{announceData.title}</h2>
            <p>{announceData.description}</p>
          </AnnounceInfo>
          <ImagePreview
            isVisible={isPreviewVisible}
            setIsVisible={setIsPreviewVisible}
            previewImage={announceImage}
          />
        </div>
      )}
    </>
  );
}

export default withRouter(AnnouncePage);
