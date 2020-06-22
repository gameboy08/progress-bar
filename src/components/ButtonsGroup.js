import React from "react";
import "./ButtonsGroup.scss";
import PropTypes from "prop-types";
import { calPercent } from "../utils";
export default function ButtonsGroup({ btns, limit, btnClick }) {
  if (btns.length === 0) return null;
  const renderButtons = () => {
    return btns.map((btn, index) => {
      return (
        <button key={index} data-testid={`ctrlButton${index}`} onClick={() => {btnClick(btn)}} className="ctrlBtn">{`${calPercent(
          btn,
          limit
        )}%`}</button>
      );
    });
  };
  return <>{renderButtons()}</>;
}

ButtonsGroup.propTypes = {
    btns: PropTypes.array.isRequired, 
    limit: PropTypes.number.isRequired, 
    btnClick: PropTypes.func.isRequired
}
