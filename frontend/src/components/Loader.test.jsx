import { render, screen } from "@testing-library/react";
import Loader from "./Loader";

test("renders loading message", () => {
  render(<Loader />);
  expect(screen.getByText(/Loading/i)).toBeInTheDocument();
});
