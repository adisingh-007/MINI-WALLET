import { render, screen } from "@testing-library/react";
import TransactionList from "./TransactionList";

test("shows empty state when no transactions", () => {
  render(<TransactionList transactions={[]} loading={false} />);
  expect(screen.getByText(/No transactions/i)).toBeInTheDocument();
});

test("shows loader when loading", () => {
  render(<TransactionList transactions={[]} loading={true} />);
  expect(screen.getByText(/Loading/i)).toBeInTheDocument();
});
