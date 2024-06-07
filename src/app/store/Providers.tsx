"use client";

import { Provider } from "react-redux";
import { store } from "./";
import { useEffect } from "react";
import { setFavoriteProduct } from "./products/products";
import { jsonParseCookie } from "@/utils/functions";
import { getCookie } from "cookies-next";
import { CookieType } from "@/utils/constants";
import { Favorites } from "@/utils/interfaces";

interface Props {
  children: React.ReactNode;
}

export const Providers = ({ children }: Props) => {
  useEffect(() => {
    const favorites = jsonParseCookie(
      getCookie(CookieType.FAVORITES) as string,
      "{}"
    ) as Favorites;
    store.dispatch(setFavoriteProduct(favorites));
  }, []);

  return <Provider store={store}>{children}</Provider>;
};
