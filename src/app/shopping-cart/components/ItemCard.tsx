"use client";

import { IoAddCircleOutline, IoRemove } from "react-icons/io5";
import { addProductToCart, removeSingleItemFromCart } from "../actions/actions";
import { useRouter } from "next/navigation";
import { Product } from "@/utils/interfaces";

interface Props {
  product: Product;
  quantity: number;
}

export const ItemCard = ({ product, quantity }: Props) => {
  const router = useRouter();

  function onAddToCart() {
    addProductToCart(product.id);
    router.refresh();
  }

  function onRemoveItem() {
    removeSingleItemFromCart(product.id);
    router.refresh();
  }

  return (
    <div className="flex items-center shadow rounded-lg w-full bg-gray-800 border-gray-100">
      <div
        className="p-2 w-50 h-full"
        style={{ backgroundColor: product.color }}
      ></div>
      <div className="px-5 pb-5 w-full flex flex-col mt-2">
        <a href="#">
          <h3 className="font-semibold text-xl tracking-tight text-white capitalize">
            {product.name} -{" "}
            <small className="text-sm">${product.price.toFixed(2)}</small>
          </h3>
        </a>
        <div className="flex flex-col items-start justify-between">
          <span className="text-white dark:text-white">
            Cantidad: {quantity}
          </span>
          <span className="font-bold text-white">
            Total: ${(product.price * quantity).toFixed(2)}
          </span>
        </div>
      </div>

      <div className="flex p-5 items-center justify-center">
        <button
          onClick={onAddToCart}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <IoAddCircleOutline size={20} />
        </button>
        <span className="text-2xl text-white mx-10">{quantity}</span>
        <button
          onClick={onRemoveItem}
          className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-3 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
        >
          <IoRemove size={20} />
        </button>
      </div>
    </div>
  );
};
