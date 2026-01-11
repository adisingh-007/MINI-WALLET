import { render, screen } from "@testing-library/react";
import Sidebar from "./Sidebar";
import { BrowserRouter } from "react-router-dom";

test("renders sidebar navigation links", () => {
  render(
    <BrowserRouter>
      <Sidebar />
    </BrowserRouter>
  );

  expect(
    screen.getByRole("link", { name: /dashboard/i })
  ).toBeInTheDocument();

  expect(
    screen.getByRole("link", { name: /add/i })
  ).toBeInTheDocument();

  expect(
    screen.getByRole("link", { name: /transfer/i })
  ).toBeInTheDocument();

  expect(
    screen.getByRole("link", { name: /history/i })
  ).toBeInTheDocument();
});
