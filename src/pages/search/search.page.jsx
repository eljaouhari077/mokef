import React from "react";
import { FirebaseContext } from "../../firebase";

import { getAllAnnounces, getUserFromRef } from "../../utils/dao";
import { getStorageFile } from "../../utils/storage";
import SearchForm from "./search-form/search-form";
import Announces from "./announces/announces";

function SearchPage() {
  const [announces, setAnnounces] = React.useState([]);
  const [filteredAnnounces, setFilteredAnnounces] = React.useState([]);
  const [isFiltering, setIsFiltering] = React.useState(false);
  const [filters, setFilters] = React.useState({
    category: "Electricien",
    searchTerm: "",
    price: {
      min: 0,
      max: 10000,
    },
    rating: {
      min: 0,
      max: 5,
    },
    city: "Casablanca",
  });
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
  }, [announces, filters]);

  const updateFilteredAnnounces = () => {
    const filterBySearchTerm = (listToFilter) =>
      listToFilter.filter(
        (item) =>
          item.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
          item.description
            .toLowerCase()
            .includes(filters.searchTerm.toLowerCase())
      );
    const filterByCategory = (listToFilter) =>
      listToFilter.filter((item) => item.category === filters.category);
    const filterByPrice = (listToFilter) =>
      listToFilter.filter(
        (item) =>
          item.price >= filters.price.min && item.price <= filters.price.max
      );
    const filterByRating = (listToFilter) =>
      listToFilter.filter(
        (item) =>
          item.user.rating >= filters.rating.min &&
          item.user.rating <= filters.rating.max
      );
    const filterByCity = (listToFilter) => {
      listToFilter.filter((item) => item.ville === filters.city);
    };

    let filteredAnnounces_ = filterBySearchTerm(announces);
    filteredAnnounces_ = filterByCategory(filteredAnnounces_);

    if (isFiltering) {
      filteredAnnounces_ = filterByPrice(filteredAnnounces_);
      filteredAnnounces_ = filterByRating(filteredAnnounces_);
      filteredAnnounces_ = filterByCity(filteredAnnounces_);
    }

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
            filters={filters}
            setFilters={setFilters}
            isFiltering={isFiltering}
            setIsFiltering={setIsFiltering}
          />
          <Announces announces={filteredAnnounces} />
        </div>
      )}
    </>
  );
}

export default SearchPage;
