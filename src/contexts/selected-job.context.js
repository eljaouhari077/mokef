import React from "react";

export const SelectedJobContext = React.createContext(null);

export default ({ children }) => {
  const [selectedJob, setSelectedJob] = React.useState(null);

  return (
    <SelectedJobContext.Provider value={{ selectedJob, setSelectedJob }}>
      {children}
    </SelectedJobContext.Provider>
  );
};
