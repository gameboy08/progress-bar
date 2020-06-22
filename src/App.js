import React, { useEffect, useState, useReducer } from "react";
import { ProgressBar, Select, ButtonsGroup } from "./components";
import "./App.scss";
import { FILL_PROGRESS, INIT_PROGRESS, CHANGE_PROGRESS } from "./constants";
import { calPercent } from "./utils";
const initialState = {
  bars: [],
  buttons: [],
  limit: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case INIT_PROGRESS:
      const { bars, limit, buttons } = action.payload;
      return { buttons, bars: Array(bars.length).fill(0), limit };
    case FILL_PROGRESS:
      return action.payload;
    case CHANGE_PROGRESS:
      const { val, selected } = action.payload;
      return {
        ...state,
        bars: state.bars.map((bar, index) => {
          if (index !== selected) {
            return bar;
          }
          const result = bar + val
          return result < 0 ? 0 : result;
        }),
      };
    default:
      return state;
  }
};

function App() {
  const [{ bars, buttons, limit }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const [selected, setSelect] = useState(0);
  useEffect(() => {
    fetch("http://pb-api.herokuapp.com/bars")
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: INIT_PROGRESS,
          payload: data,
        });
        setTimeout(() => {
          dispatch({
            type: FILL_PROGRESS,
            payload: data,
          });
        }, 300);
      });
  }, []);
  const renderProgressBars = () =>
    bars.map((bar, index) => {
      return <ProgressBar key={index} width={calPercent(bar, limit)} />;
    });
  const handleSelect = (e) => {
    setSelect(parseInt(e.target.value));
  };
  const btnClick = (val) => {
    dispatch({
      type: CHANGE_PROGRESS,
      payload: {
        val,
        selected,
      },
    });
  };
  return (
    <div className="App">
      <div className="container">
        {renderProgressBars()}
        <div className="controlPanel">
          <div>
            <Select
              bars={bars}
              selected={selected}
              handleSelect={handleSelect}
            />
          </div>
          <div className="buttonGroupWrapper">
            <ButtonsGroup btns={buttons} limit={limit} btnClick={btnClick} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
