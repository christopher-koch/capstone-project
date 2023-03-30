import { render, screen } from "@testing-library/react";
import Popup from ".";
import "@testing-library/jest-dom";

test("has an alt tag", () => {
  render(<Popup />);
  const image = screen.getByRole("image", {});
  expect(image).toBeInTheDocument();
});
