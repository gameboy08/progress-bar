import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import Select from "./Select";

const props = {
    bars: [51, 89, 16, 70], 
    selected: 1, 
    handleSelect: jest.fn()
}
afterEach(cleanup)
it('<Select/>', () => {
    const { getByTestId, debug, container } = render(<Select {...props}/>)
    expect(container.querySelectorAll('option').length).toBe(props.bars.length)
    fireEvent.change(getByTestId('select'))
    expect(props.handleSelect).toHaveBeenCalled()
})