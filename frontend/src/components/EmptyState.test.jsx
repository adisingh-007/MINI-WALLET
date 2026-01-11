import { render, screen } from "@testing-library/react";
import EmptyState from "./EmptyState";

test("renders empty state message", () => {
  render(<EmptyState message="No data" />);
  expect(screen.getByText("No data")).toBeInTheDocument();
});
