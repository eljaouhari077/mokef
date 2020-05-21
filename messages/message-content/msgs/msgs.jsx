import React from "react";
import CurrentUserMsg from "./current-user-msg/current-user-msg";
import OtherUserMsg from "./other-user-msg/other-user-msg";

const MSGs = () => {
  return (
    <div>
      <CurrentUserMsg />
      <OtherUserMsg />
    </div>
  );
};

export default MSGs;
