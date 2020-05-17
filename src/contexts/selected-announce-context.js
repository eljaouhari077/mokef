import React from "react";

export const SelectedAnnounceContext = React.createContext(null);

export default ({ children }) => {
  const [selectedAnnounce, setSelectedAnnounce] = React.useState(null);

  return (
    <SelectedAnnounceContext.Provider
      value={{ selectedAnnounce, setSelectedAnnounce }}
    >
      {children}
    </SelectedAnnounceContext.Provider>
  );
};
