import React from "react";

const FormHeader = (props) => {
  const class1 = ["headerBox", "fcbw", "mar_l-4", `${props.cssClass}`];
  const class2 = ["borB-2", `${props.cssClass}`];

  return (
    <div className="fcol">
      <div className={`${class1.join(" ")}`}>
        <span style={{ fontSize: "1rem", fontWeight: "bold" }}>
          {props.heading}
        </span>
        {props.icon}
      </div>
      <div className={`${class2.join(" ")}`}></div>
    </div>
  );
};

export default FormHeader;
