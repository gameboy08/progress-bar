import React from "react";
import { render, cleanup } from "@testing-library/react";
import ProgressBar from "./ProgressBar";

afterEach(cleanup)
describe('<ProgressBar/>', () => {
    it('with 20% width', () => {
        const { getByTestId } = render(<ProgressBar width={20} />);
        expect(getByTestId("achievedProgress").getAttribute('style')).toBe('width: 20%;')
    })
    it('with 120% width', () => {
        const { getByTestId } = render(<ProgressBar width={120} />);
        expect(getByTestId("achievedProgress").getAttribute('class')).toBe('achievedProgress excessProgress')
    })
    it('with -20% width', () => {
        const { getByTestId } = render(<ProgressBar width={-20} />);
        expect(getByTestId("achievedProgress").getAttribute('style')).toBe('width: 0%;')
    })
})
