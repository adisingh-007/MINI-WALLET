import { render, screen } from "@testing-library/react";
import TransactionItem from "./TransactionItem";

const creditTx = {
  type: "credit",
  amount: 1000,
  status: "success",
  date: new Date().toISOString()
};

const failedDebitTx = {
  type: "debit",
  amount: 500,
  fee: 10,
  status: "failed",
  date: new Date().toISOString()
};

test("renders credit transaction", () => {
  render(<TransactionItem transaction={creditTx} />);
  expect(screen.getByText(/Money Credited/i)).toBeInTheDocument();
});

test("renders failed transaction label", () => {
  render(<TransactionItem transaction={failedDebitTx} />);
  expect(screen.getByText(/Failed/i)).toBeInTheDocument();
});

test("shows fee for debit transaction", () => {
  render(<TransactionItem transaction={failedDebitTx} />);
  expect(screen.getByText(/Fee/i)).toBeInTheDocument();
});
