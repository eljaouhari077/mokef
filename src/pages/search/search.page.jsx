import React from "react";
import { FirebaseContext } from "../../firebase";

import { getAllAnnounces, getUserFromRef } from "../../utils/dao";
import { getStorageFile } from "../../utils/storage";
import SearchForm from "./search-form/search-form";
import Announces from "./announces/announces";

function SearchPage() {
  const [announces, setAnnounces] = React.useState([]);
  const fb = React.useContext(FirebaseContext);

  React.useEffect(() => {
    getAnnounces();
    // eslint-disable-next-line
  }, []);

  const getAnnounces = async () => {
    const announcesRefs = await getAllAnnounces(fb);
    const allAnnounces = announcesRefs.docs.map((announce) => announce.data());
    const allAnnouncesWithUserData = await Promise.all(
      allAnnounces.map((announce) =>
        getUserFromRef(fb, announce.user).then((user) => ({
          ...announce,
          user: user.data(),
        }))
      )
    );
    const allAnnouncesWithUserDataAndImageURL = await Promise.all(
      allAnnouncesWithUserData.map((announce) =>
        getStorageFile(fb, announce.user.avatarURL).then((avatarURL) => ({
          ...announce,
          user: { ...announce.user, avatarURL },
        }))
      )
    );

    setAnnounces(allAnnouncesWithUserDataAndImageURL);
  };

  return (
    <>
      {announces.length > 0 && (
        <div>
          <SearchForm />
          <Announces announces={announces} />
        </div>
      )}
    </>
  );
}

export default SearchPage;
