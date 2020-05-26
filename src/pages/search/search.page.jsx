import React from "react";
import { FirebaseContext } from "../../firebase";

import { getAllAnnounces, getUserFromRef } from "../../utils/dao";
import { getStorageFile } from "../../utils/storage";
import SearchForm from "./search-form/search-form";
import Announces from "../../components/announces/announces";
import { withRouter } from "react-router-dom";
import styled from "styled-components";

const MaxWidth = styled.div`
  max-width: 1050px;
  margin: 1rem auto;

  @media (max-width: 1040px) {
    margin: 0 auto;
  }
`;

function SearchPage() {
  const [announces, setAnnounces] = React.useState([]);
  const [filteredAnnounces, setFilteredAnnounces] = React.useState([]);
  const [category, setCategory] = React.useState("");
  const [searchTerm, setSearchTerm] = React.useState("Electricien");
  const [city, setCity] = React.useState("Casablanca");
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
  }, [announces, searchTerm, category, city]);

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

    const filterByCity = (listToFilter) =>
      listToFilter.filter((item) => item.ville === city);

    let filteredAnnounces_ = filterBySearchTerm(announces);
    filteredAnnounces_ = filterByCategory(filteredAnnounces_);
    filteredAnnounces_ = filterByCity(filteredAnnounces_);

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
      allAnnouncesWithUserData.map((announce) => {
        if (announce.user.avatarURL) {
          return getStorageFile(fb, announce.user.avatarURL).then(
            (avatarURL) => ({
              ...announce,
              user: { ...announce.user, avatarURL },
            })
          );
        } else {
          return announce;
        }
      })
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
            city={city}
            setCity={setCity}
          />
          <MaxWidth>
            <Announces announces={filteredAnnounces} />
          </MaxWidth>
        </div>
      )}
    </>
  );
}

export default withRouter(SearchPage);
