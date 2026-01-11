import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import TransferMoney from "./TransferMoney";
import api from "../services/api";


vi.mock("../services/api", () => ({
  default: {
    post: vi.fn(() => Promise.resolve({ data: {} }))
  }
}));

test("successful transfer confirmation flow", async () => {
  const mockTransfer = vi.fn(() => true);

  render(
    <TransferMoney balance={10000} onTransfer={mockTransfer} />
  );

  fireEvent.change(
    screen.getByPlaceholderText(/Recipient/i),
    { target: { value: "Rahul" } }
  );

  fireEvent.change(
    screen.getByPlaceholderText(/Amount/i),
    { target: { value: "500" } }
  );

  fireEvent.click(screen.getByText(/Continue/i));
  fireEvent.click(screen.getByText(/Confirm/i));

  await waitFor(() => {
    expect(mockTransfer).toHaveBeenCalled();
  });
});
