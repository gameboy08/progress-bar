import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ButtonsGroup from "./ButtonsGroup";

const props = { btns: [61, 75, 29, 69], limit: 130, btnClick: jest.fn() };

it("<ButtonsGroup/>", () => {
  const { getByTestId, container } = render(<ButtonsGroup {...props} />);
  expect(container.querySelectorAll("button").length).toBe(4);
  fireEvent.click(getByTestId("ctrlButton1"));
  expect(props.btnClick).toHaveBeenCalledWith(props.btns[1])
});
