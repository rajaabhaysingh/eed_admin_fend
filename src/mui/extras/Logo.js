import React from "react";

import eed_admin from "../../images/eed_admin_light.png";

const Logo = (props) => {
  return (
    <img style={{ height: "40px" }} alt="Logo" src={eed_admin} {...props} />
  );
};

export default Logo;
