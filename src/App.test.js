import React from "react";
import {
  render,
  cleanup,
  fireEvent,
  waitForDomChange,
  act,
} from "@testing-library/react";
import App from "./App";
import { calPercent } from "./utils";

global.fetch = require("jest-fetch-mock");
beforeAll(() => {
  jest.useFakeTimers();
});
afterAll(() => {
  cleanup();
  jest.useRealTimers();
});

const fakeRes = {
  bars: [18, 76, 84, 48],
  buttons: [46, 31, -44, -47],
  limit: 200,
};
it("<App/>", async () => {
  fetch.mockResponseOnce(JSON.stringify(fakeRes));
  const { getByTestId, getAllByTestId } = render(<App />);
  await waitForDomChange();
  const { bars, limit, buttons } = fakeRes
  expect(getAllByTestId("progressBarContainer").length).toBe(
    bars.length
  );
  getAllByTestId("achievedProgress").forEach((node) => {
    expect(node.getAttribute("style")).toBe("width: 0%;");
  });

  act(() => {
    jest.advanceTimersByTime(300);
  });

  getAllByTestId("achievedProgress").forEach((node, index) => {
    expect(node.getAttribute("style")).toBe(
      `width: ${calPercent(bars[index], limit)}%;`
    );
  });
  fireEvent.click(getByTestId("ctrlButton1"));
  expect(getAllByTestId("achievedProgress")[0].getAttribute("style")).toBe(
    `width: ${
      calPercent(bars[0], limit) +
      calPercent(buttons[1], limit)
    }%;`
  );
});
