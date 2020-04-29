import React from "react";
import { NavList } from "../navigation.styled";
import { Link } from "react-router-dom";

function LoggedOut() {
  return (
    <NavList>
      <Link to="/">Accueil</Link>
      <Link to="/login">Connexion</Link>
    </NavList>
  );
}

export default LoggedOut;
