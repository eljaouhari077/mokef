import React from "react";
import MediaQuery from "react-responsive";
const breakpoints = {
  desktop: "(min-width: 1025px)",
  laptop: "(max-width: 1024px)",
  tablet: "(min-width: 768px)",
  phone: "(max-width: 600px)",
};

export default function Breakpoint(props) {
  const breakpoint = breakpoints[props.name] || breakpoints.desktop;
  return (
    <MediaQuery {...props} query={breakpoint}>
      {props.children}
    </MediaQuery>
  );
}
