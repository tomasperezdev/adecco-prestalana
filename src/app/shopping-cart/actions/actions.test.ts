import { CookieType } from "@/utils/constants";
import * as cookiesNext from "cookies-next";
import * as actions from "./actions";

jest.mock("cookies-next");
afterEach(() => {
  jest.clearAllMocks();
});
describe("getCookieCart", () => {
  it("should return an empty object if the CART cookie does not exist", () => {
    const cookiesNextHasCookie = jest
      .spyOn(cookiesNext, "hasCookie")
      .mockImplementation(() => false);

    const result = actions.getCookieCart();

    expect(cookiesNext.hasCookie).toHaveBeenCalledWith(CookieType.CART);
    expect(result).toEqual({});
    cookiesNextHasCookie.mockRestore();
  });

  it("should return the parsed value of the CART cookie if it exists", () => {
    const cookiesNextHasCookie = jest
      .spyOn(cookiesNext, "hasCookie")
      .mockImplementation(() => true);
    const getCookie = jest.spyOn(cookiesNext, "getCookie").mockImplementation(() => JSON.stringify({ "1": 2, "2": 3 }));

    const result = actions.getCookieCart();

    expect(cookiesNext.hasCookie).toHaveBeenCalledWith(CookieType.CART);
    expect(cookiesNext.getCookie).toHaveBeenCalledWith(CookieType.CART);
    expect(result).toEqual({ "1": 2, "2": 3 });
    cookiesNextHasCookie.mockRestore();
    getCookie.mockRestore();
  });
});

 describe("addProductToCart", () => {
  it("should add a product to the CART cookie", () => {
    const id = "1";
    const cookieCart = { "1": 2 };

    
    const getCookieCart = jest.spyOn(actions, "getCookieCart").mockImplementation(() => cookieCart);
    actions.addProductToCart(id);

    expect(getCookieCart).toHaveBeenCalled();
    expect(cookiesNext.setCookie).toHaveBeenCalledWith(CookieType.CART, JSON.stringify({ "1": 3 }));
    getCookieCart.mockRestore();
  });

  it("should create a new entry in the CART cookie if the product does not exist", () => {
    const id = "2";
    const cookieCart = { "1": 2 };

    const getCookieCart = jest.spyOn(actions, "getCookieCart").mockImplementation(() => cookieCart);

    actions.addProductToCart(id);

    expect(getCookieCart).toHaveBeenCalled();
    expect(cookiesNext.setCookie).toHaveBeenCalledWith(CookieType.CART, JSON.stringify({ "1": 2, "2": 1 }));
    getCookieCart.mockRestore();
  });
});

describe("removeProductFromCart", () => {
  it("should not modify the CART cookie if the product does not exist", () => {
    const id = "3";
    const cookieCart = { "1": 2, "2": 3 };

    const getCookieCart = jest.spyOn(actions, "getCookieCart").mockImplementation(() => cookieCart);

    actions.removeProductFromCart(id);

    expect(getCookieCart).toHaveBeenCalled();
    expect(cookiesNext.setCookie).not.toHaveBeenCalled();
    getCookieCart.mockRestore();
  });
  it("should remove a product from the CART cookie", () => {
    const id = "1";
    const cookieCart = { "1": 2, "2": 3 };

    const getCookieCart = jest.spyOn(actions, "getCookieCart").mockImplementation(() => cookieCart);

    actions.removeProductFromCart(id);

    expect(getCookieCart).toHaveBeenCalled();
    expect(cookiesNext.setCookie).toHaveBeenCalledWith(CookieType.CART, JSON.stringify({ "2": 3 }));
    getCookieCart.mockRestore();
  });

  
});

describe("removeSingleItemFromCart", () => {
  it("should remove a single item from the CART cookie", () => {
    const id = "1";
    const cookieCart = { "1": 2, "2": 3 };

    const getCookieCart = jest.spyOn(actions, "getCookieCart").mockImplementation(() => cookieCart);

    actions.removeSingleItemFromCart(id);

    expect(getCookieCart).toHaveBeenCalled();
    expect(cookiesNext.setCookie).toHaveBeenCalledWith(CookieType.CART, JSON.stringify({ "1": 1, "2": 3 }));
    getCookieCart.mockRestore();
  });

  it("should remove the product from the CART cookie if there is only one item", () => {
    const id = "2";
    const cookieCart = { "2": 1 };

    const getCookieCart = jest.spyOn(actions, "getCookieCart").mockImplementation(() => cookieCart);

    actions.removeSingleItemFromCart(id);

    expect(getCookieCart).toHaveBeenCalled();
    expect(cookiesNext.setCookie).toHaveBeenCalledWith(CookieType.CART, JSON.stringify({}));
    getCookieCart.mockRestore();
  });

  it("should not modify the CART cookie if the product does not exist", () => {
    const id = "3";
    const cookieCart = { "1": 2, "2": 3 };

    const getCookieCart = jest.spyOn(actions, "getCookieCart").mockImplementation(() => cookieCart);

    actions.removeSingleItemFromCart(id);

    expect(getCookieCart).toHaveBeenCalled();
    expect(cookiesNext.setCookie).not.toHaveBeenCalled();
    getCookieCart.mockRestore();
  });
});