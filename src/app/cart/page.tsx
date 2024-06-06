import { cookies } from "next/headers";
import { ItemCard } from "../shopping-cart";
import { WidgetItem } from "../components";
import { Cart, Product } from "@/utils/interfaces";
import { getCookieParsed, getProductsInCart } from "@/utils/functions";
import { CookieType } from "@/utils/constants";

export const metadata = {
  title: "Carrito de compras",
  description: "Esta es la información del carrito de compras",
};

export interface ProductInCart {
  product: Product;
  quantity: number;
}

export default function CartPage() {
  const cookiesStore = cookies();
  const cart = getCookieParsed(CookieType.CART, cookiesStore, "{}") as Cart;
  const products = getCookieParsed(
    CookieType.PRODUCTS,
    cookiesStore,
    "[]"
  ) as Product[];
  const productsInCart = getProductsInCart(cart, products);
  const totalToPay = productsInCart.reduce(
    (prev, current) => current.product.price * current.quantity + prev,
    0
  );

  return (
    <div>
      <h1 className="text-5xl">Productos en el carrito</h1>
      <hr className="mb-2" />

      <div className="flex flex-col sm:flex-row gap-2 w-full">
        <div className="flex flex-col gap-2 w-full sm:w-8/12">
          {productsInCart.map(({ product, quantity }) => (
            <ItemCard key={product.id} product={product} quantity={quantity} />
          ))}
        </div>

        <div className="flex flex-col w-full sm:w-4/12">
          <WidgetItem title="Total a pagar">
            <div className="mt-2 flex justify-center gap-4">
              <h3 className="text-3xl font-bold text-gray-700">
                ${(totalToPay * 1.15).toFixed(2)}
              </h3>
            </div>
            <span className="font-bold text-center text-gray-500">
              Impuestos 15%: ${(totalToPay * 0.15).toFixed(2)}
            </span>
          </WidgetItem>
        </div>
      </div>
    </div>
  );
}
