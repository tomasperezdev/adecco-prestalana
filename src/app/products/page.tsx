"use client";

import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { ProductCard } from "../components/products";
import useProductData from "@/hooks/requests";
import { getCookie } from "cookies-next";
import { CiSearch } from "react-icons/ci";
import { Product } from "@/utils/interfaces";
import { jsonParseCookie } from "@/utils/functions";
import debouce from "lodash.debounce";
import { CookieType } from "@/utils/constants";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [inputValue, setInputValue] = useState("");

  const { getProductsData } = useProductData();

  let displayProducts = products;

  useEffect(() => {
    const getProducts = async () => {
      const productList = await getProductsData();
      setProducts(productList);
    };
    if (products.length === 0) {
      const productsInCookies = jsonParseCookie(
        getCookie(CookieType.PRODUCTS) as string,
        "[]"
      ) as Product[];

      productsInCookies.length === 0
        ? getProducts()
        : setProducts(productsInCookies);
    }
  }, [getProductsData, products]);

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const renderProductList = () => {
    return displayProducts.map((product: Product) => (
      <ProductCard
        data-testid="product-card"
        product={product}
        key={product.id}
      />
    ));
  };

  if (inputValue !== "") {
    displayProducts = products.filter((product) => {
      return product.name.toLowerCase().includes(inputValue.toLowerCase());
    });
  }

  const debouncedResults = useMemo(() => {
    return debouce(onInputChange, 300);
  }, []);

  useEffect(() => {
    return () => {
      debouncedResults.cancel();
    };
  });

  return (
    <>
      <div hidden className="md:block py-2">
        <div className="relative flex items-center text-gray-400 focus-within:text-cyan-400">
          <span className="absolute left-4 h-6 flex items-center pr-3 border-r border-gray-300">
            <CiSearch />
          </span>
          <input
            onChange={(e) => {
              onInputChange(e);
            }}
            value={inputValue}
            type="search"
            name="leadingIcon"
            id="leadingIcon"
            placeholder="Filtrar productos..."
            className="w-full pl-14 pr-4 py-2.5 rounded-xl text-sm text-gray-600 outline-none border border-gray-300 focus:border-cyan-300 transition"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {renderProductList()}
      </div>
    </>
  );
}
