import React from "react";
import classNames from "classnames";
import "./ProgressBar.scss";
import PropTypes from "prop-types";
export default function ProgressBar({ width }) {
  return (
    <div className="progressBarContainer" data-testid="progressBarContainer">
      <div className="progressBarWrapper">
        <div
          data-testid="achievedProgress"
          className={classNames("achievedProgress", {
              'excessProgress': width > 100
          })}
          style={{ width: `${width < 0 ? 0 : width}%` }}
        >
          <span className={classNames("progressNum", {
            'excessProgressNum': width > 100
          })}>{`${width}%`}</span>
        </div>
      </div>
    </div>
  );
}

ProgressBar.propTypes = {
    width: PropTypes.number.isRequired
}
