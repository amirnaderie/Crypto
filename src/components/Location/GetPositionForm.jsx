import React from "react";
import PropTypes from "prop-types";
import { usePosition } from "./usePosition";

const GetPositionForm = () => {
  const {
    latitude,
    longitude,
    timestamp,
    accuracy,
    speed,
    error,
  } = usePosition(true);

  const loader =
    !latitude && !error ? (
      <div>
        <div>Trying to fetch location...</div>
        <br />
      </div>
    ) : null;

  return (
    <div>
      {loader}
      <code>
        latitude: {latitude}
        <br />
        longitude: {longitude}
        <br />
        timestamp: {timestamp}
        <br />
        accuracy: {accuracy && `${accuracy}m`}
        <br />
        speed: {speed}
        <br />
        error: {error}
      </code>
    </div>
  );
};

GetPositionForm.propTypes = {
  watch: PropTypes.bool,
  settings: PropTypes.object,
};

export default GetPositionForm;
