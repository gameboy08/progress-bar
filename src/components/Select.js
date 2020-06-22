import React from "react";
import PropTypes from "prop-types";
export default function Select({ bars, selected, handleSelect }) {
  if (bars.length === 0) return null;
  const renderSelect = (bars) => {
    return bars.map((_, index) => (
      <option key={index} value={index}>{`#progress ${index}`}</option>
    ));
  };
  return (
    <select value={selected} data-testid="select" onChange={handleSelect}>
      {renderSelect(bars)}
    </select>
  );
}

Select.propTypes = {
  bars: PropTypes.array.isRequired,
  selected: PropTypes.number.isRequired,
  handleSelect: PropTypes.func.isRequired,
};
