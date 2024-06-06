import { CookieStoreMockType, MockProducts } from "../__mocks__/MockedProductsData";
import { convertArrayToObject, getCookieParsed, getProductsInCart, getTotalProductCountInCart, jsonParseCookie, moveSelectedFavoriteToNewPosition } from "./functions";
import { Cart, Product } from "./interfaces";
import { CookieType } from "./constants";

describe("convertArrayToObject", () => {
  it("should convert an array of products to an object with product names as keys", () => {
    const products : Product[] = MockProducts

    const result = convertArrayToObject(products);

    expect(result).toEqual({
      "Product 1": { name: "Product 1", price: 10, id: "1", year: 2021, color: "red", pantone_value: "123"},
      "Product 2": { name: "Product 2", price: 20, id: "2", year: 2021, color: "red", pantone_value: "123"},
      "Product 3": { name: "Product 3", price: 30, id: "3", year: 2021, color: "red", pantone_value: "123"},
    });
  });
});

describe("moveSelectedFavoriteToNewPosition", () => {
  it("should move a favorite product to a new position in the favorites array", () => {
    const favorites : Product[] = MockProducts

    const result = moveSelectedFavoriteToNewPosition(0, 2, favorites);

    expect(result).toEqual(
      {"Product 1": {"color": "red", "id": "1", "name": "Product 1", "pantone_value": "123", "price": 10, "year": 2021}, 
      "Product 2": {"color": "red", "id": "2", "name": "Product 2", "pantone_value": "123", "price": 20, "year": 2021}, 
      "Product 3": {"color": "red", "id": "3", "name": "Product 3", "pantone_value": "123", "price": 30, "year": 2021}
    });
  });
});

describe("getTotalProductCountInCart", () => {
  it("should return the total count of products in the cart", () => {
    const cart : Cart = {
      "1": 2,
      "2": 3,
      "3": 1,
    };

    const result = getTotalProductCountInCart(cart);

    expect(result).toBe(6);
  });
});

describe("getCookieParsed", () => {
  it("should return the parsed value of a cookie if it exists, otherwise return the fallback value", () => {
    const cookieStore : CookieStoreMockType = {
      get: (cookieName: string) => {
        if (cookieName === CookieType.CART) {
          return { value: JSON.stringify({ key: "value" }) };
        } else {
          return undefined;
        }
      },
    }; 

    const result1 = getCookieParsed(CookieType.CART, cookieStore, "{}");
    const result2 = getCookieParsed(CookieType.PRODUCTS, cookieStore, "[]");


    expect(result1).toEqual({ key: "value" });
    expect(result2).toEqual([]);
  });
});

describe("jsonParseCookie", () => {
  it("should parse a cookie string and return the parsed value, or return the fallback value if the cookie is empty or invalid", () => {
    const cookie1 = JSON.stringify({ key: "value" });
    const cookie2 = null;

    const result1 = jsonParseCookie(cookie1, "{}");
    const result2 = jsonParseCookie(cookie2, "[]");

    expect(result1).toEqual({ key: "value" });
    expect(result2).toEqual([]);
  });
});

describe("getProductsInCart", () => {
  it("should return an array of products in the cart with their quantities", () => {
    const cart : Cart = {
      "1": 2,
      "2": 3,
    };

    const products =  MockProducts

    const result = getProductsInCart(cart, products);

    expect(result).toEqual([
      { product: { name: "Product 1", price: 10, id: "1", year: 2021, color: "red", pantone_value: "123"}, quantity: 2 },
      { product: { name: "Product 2", price: 20, id: "2", year: 2021, color: "red", pantone_value: "123"}, quantity: 3 },
    ]);
  });
});