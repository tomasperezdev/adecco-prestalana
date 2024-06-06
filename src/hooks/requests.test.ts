import axios from "axios";
import { CookieType } from "@/utils/constants";
import useProductData from "./requests";
import { MockProducts, MockedProductsData } from "@/__mocks__/MockedProductsData";
import { Product } from "@/utils/interfaces";

jest.mock('axios', () => ({
    get: jest.fn(() => Promise.resolve(MockedProductsData))
  }));
jest.mock("cookies-next");

describe("useProductData", () => {
  describe("getProductsData", () => {
    const { setCookie } = jest.requireMock("cookies-next");
    const { getProductsData } = useProductData();
    it("should fetch products data from the API, modify the price, set the cookie, and return the products", async () => {
    const result = await getProductsData(MockedProductsData);
    expect(axios.get).toHaveBeenCalledWith("api/products");
      expect(setCookie).toHaveBeenCalledWith(
        CookieType.PRODUCTS,
        JSON.stringify(MockProducts)
      );
      expect(result).toEqual(MockProducts);
    });
    it("should call setCookie with an string", async () => {
      await getProductsData();
      expect(setCookie).toHaveBeenCalledWith(
        CookieType.PRODUCTS,
        expect.any(String)
      );
    })
  });
});