import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import { toBeInTheDocument } from "@testing-library/jest-dom/matchers";
import ProductsPage from "./page";
import { MockedProductsData } from "@/__mocks__/MockedProductsData";
import axios from "axios";

describe("ProductsPage", () => {
  expect.extend({ toBeInTheDocument });

  test("renders the search input", () => {
    render(<ProductsPage />);
    const searchInput = screen.getByPlaceholderText("Filtrar productos...");
    expect(searchInput).toBeInTheDocument();
  });

  test("filters products based on input value", async () => {
    const axioGetSpy = jest
      .spyOn(axios, "get")
      .mockResolvedValue(MockedProductsData);

    render(<ProductsPage />);
    await waitFor(() => {
      expect(
        screen.getByPlaceholderText("Filtrar productos...", { exact: false })
      ).toBeInTheDocument();
    });

    /* const searchInput = screen.getByPlaceholderText("Filtrar productos...");
    const productCards = screen.getAllByTestId("product-card");
    expect(productCards.length).toBeGreaterThan(0); */
    /*act(() => {
      fireEvent.change(searchInput, { target: { value: "Pro" } });
    });

    
     */
    axioGetSpy.mockRestore();
  });
});
