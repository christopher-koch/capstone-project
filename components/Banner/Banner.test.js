import { render, screen } from "@testing-library/react";
import Banner from ".";
import "@testing-library/jest-dom";

test("renders a heading", () => {
  render(<Banner />);
  const heading = screen.getByRole("heading", {
    name: /AMAZING! AMAZING! AMAZING! AMAZING! AMAZING!/i,
  });
  expect(heading).toBeInTheDocument();
});
