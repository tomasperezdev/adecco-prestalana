import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { Cart, Product } from "./interfaces";
import { ProductInCart } from "@/app/cart/page";
import { CookieType } from "./constants";
import { CookieStoreMockType } from "@/__mocks__/MockedProductsData";

export const convertArrayToObject = (array: Product[]) => {
    const initialValue: { [key: string]: Product } = {};
    return array.reduce((obj, item) => {
      return {
        ...obj,
        [item.name]: item,
      };
    }, initialValue);
  };

export   const moveSelectedFavoriteToNewPosition = (currentPos: number, newPos: number, favorites : Product[]) => {
    const newFavorites = [...favorites];
    const [movedItem] = newFavorites.splice(currentPos, 1);
    newFavorites.splice(newPos, 0, movedItem);
    return convertArrayToObject(newFavorites);
};

export const getTotalProductCountInCart = (cart: Cart): number => {
  let items = 0;
  Object.values(cart).forEach((value) => {
    items += value as number;
  });

  return items;
};

export const getCookieParsed = (cookieName: CookieType, cookieStore: ReadonlyRequestCookies | CookieStoreMockType, fallback: string) => {
  return JSON.parse(cookieStore.get(cookieName)?.value ?? fallback);
}

export const jsonParseCookie = (cookie: string | null, fallback: string) => {
  return JSON.parse(cookie ?? fallback);
}

export const getProductsInCart = (cart: Cart, products: Product[]): ProductInCart[] => {
  const productsInCart: ProductInCart[] = [];
  for (const id of Object.keys(cart)) {
    const product = products.find((prod) => {
      return prod.id == id;
    });
    if (product) {
      productsInCart.push({ product: product, quantity: cart[id] });
    }
  }

  return productsInCart;
};