import React from "react";

export const UserContext = React.createContext(null);

export default ({ children }) => {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
