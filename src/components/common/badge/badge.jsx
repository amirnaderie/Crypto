import React, { Fragment } from "react";
import './badge.css';
const MyBadge = ({value,icon}) => {
  return (
    <Fragment>
    {(value && value!==0) && <div className="badge-block">
      <div className={`svg_icons ${icon?icon:"file"} `}></div>
      <span className="e-badge e-badge-danger e-badge-overlap e-badge-notification e-badge-circle">
       {value}
      </span>
    </div>}
    </Fragment>
    
  );
};

export default MyBadge;
