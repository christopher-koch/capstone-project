import { render, screen } from "@testing-library/react";
import SuccessInfo from ".";
import "@testing-library/jest-dom";

test("renders a heading", () => {
  render(<SuccessInfo />);
  const success = screen.getByRole("success", {});
  expect(success).toBeInTheDocument();
});
