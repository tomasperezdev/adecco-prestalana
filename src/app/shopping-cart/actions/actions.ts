import { CookieType } from "@/utils/constants";
import { jsonParseCookie } from "@/utils/functions";
import { Cart } from "@/utils/interfaces";
import { getCookie, hasCookie, setCookie } from "cookies-next";

export const getCookieCart = (): Cart => {
  if ( hasCookie(CookieType.CART) ) {
    const cookieCart = jsonParseCookie(getCookie(CookieType.CART) as string, '{}');
    return cookieCart;
  }
  return {};
}

export const addProductToCart = ( id: string ) => {

  const cookieCart = getCookieCart();

  if ( cookieCart[id] ) {
    cookieCart[id] = cookieCart[id] + 1;
  } else {
    cookieCart[id] = 1;
  }

  setCookie(CookieType.CART, JSON.stringify(cookieCart));
}

export const removeProductFromCart = ( id:string ) =>{
  const cookieCart = getCookieCart();
  if(!cookieCart[id]) return;
  delete cookieCart[id];
  setCookie(CookieType.CART, JSON.stringify(cookieCart));
}

export const removeSingleItemFromCart = ( id: string ) => {
  
  const cookieCart = getCookieCart();
  if ( !cookieCart[id] ) return;

  const itemsInCart = cookieCart[id] - 1;

  if ( itemsInCart <= 0 ) {
    delete cookieCart[id];
  } else {
    cookieCart[id] = itemsInCart;
  }

  setCookie(CookieType.CART, JSON.stringify(cookieCart));
}

