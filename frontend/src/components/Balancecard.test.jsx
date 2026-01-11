import { render, screen } from "@testing-library/react";
import BalanceCard from "./Balancecard";

test("renders wallet balance", () => {
  render(<BalanceCard balance={5000} />);
  expect(screen.getByText(/₹/)).toBeInTheDocument();
});

test("formats balance in INR format", () => {
  render(<BalanceCard balance={123456} />);
  expect(screen.getByText(/1,23,456/)).toBeInTheDocument();
});
