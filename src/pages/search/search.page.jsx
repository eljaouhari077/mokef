import React from "react";
import { FirebaseContext } from "../../firebase";

import { getAllAnnounces, getUserFromRef } from "../../utils/dao";
import { getStorageFile } from "../../utils/storage";
import SearchForm from "./search-form/search-form";
import Announces from "../../components/announces/announces";
import { withRouter } from "react-router-dom";

function SearchPage() {
  const [announces, setAnnounces] = React.useState([]);
  const [filteredAnnounces, setFilteredAnnounces] = React.useState([]);
  const [category, setCategory] = React.useState("");
  const [searchTerm, setSearchTerm] = React.useState("Electricien");
  const fb = React.useContext(FirebaseContext);

  React.useEffect(() => {
    getAnnounces();
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    if (announces) {
      updateFilteredAnnounces();
    }
    // eslint-disable-next-line
  }, [announces, searchTerm, category]);

  const updateFilteredAnnounces = () => {
    const filterBySearchTerm = (listToFilter) =>
      listToFilter.filter(
        (item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const filterByCategory = (listToFilter) =>
      listToFilter.filter((item) => item.category === category);

    let filteredAnnounces_ = filterBySearchTerm(announces);
    filteredAnnounces_ = filterByCategory(filteredAnnounces_);

    setFilteredAnnounces(filteredAnnounces_);
  };

  const getAnnounces = async () => {
    const announcesRefs = await getAllAnnounces(fb);
    const allAnnounces = announcesRefs.docs.map((announce) => ({
      ...announce.data(),
      id: announce.id,
    }));
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
          <SearchForm
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            category={category}
            setCategory={setCategory}
          />
          <Announces announces={filteredAnnounces} />
        </div>
      )}
    </>
  );
}

export default withRouter(SearchPage);
