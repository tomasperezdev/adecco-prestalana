"use client";

import { Provider } from "react-redux";
import { store } from "./";
import { useEffect } from "react";
import { setFavoriteProduct } from "./products/products";
import { LocalStorageType } from "@/utils/constants";

interface Props {
  children: React.ReactNode;
}

export const Providers = ({ children }: Props) => {
  useEffect(() => {
    const favorites = JSON.parse(
      localStorage.getItem(LocalStorageType.FAVORITES) ?? "{}"
    );
    store.dispatch(setFavoriteProduct(favorites));
  }, []);

  return <Provider store={store}>{children}</Provider>;
};
