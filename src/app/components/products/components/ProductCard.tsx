"use client";
import {
  IoAddCircleOutline,
  IoHeart,
  IoHeartOutline,
  IoTrashOutline,
} from "react-icons/io5";
import { useRouter } from "next/navigation";
import {
  addProductToCart,
  removeProductFromCart,
} from "@/app/shopping-cart/actions/actions";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { toggleFavorite } from "@/app/store/products/products";
import { Product } from "@/utils/interfaces";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const router = useRouter();

  const { id, name, year, color, pantone_value, price } = product;

  const isFavorite = useAppSelector(
    (state) => !!state.products.favorites[name]
  );
  const dispatch = useAppDispatch();

  const onToggle = () => {
    if (isFavorite) {
      const answer = prompt(
        `¿Estás seguro que deseas eliminar este producto de tus favoritos? Escribe el año '${year}' para confirmar`
      );
      if (Number(answer) != year) {
        if (answer !== null)
          alert("El nombre ingresado no coincide con el nombre del producto");
        return;
      }
    }
    dispatch(toggleFavorite(product));
  };

  const onAddToCart = () => {
    addProductToCart(id);
    router.refresh();
  };

  const onRemoveFromCart = () => {
    removeProductFromCart(id);
    router.refresh();
  };

  return (
    <div className="shadow rounded-lg max-w-sm bg-gray-800 border-gray-100">
      {/* Product Color */}
      <div className="p-2 w-50 h-50" style={{ backgroundColor: color }}></div>

      {/* Title */}
      <div className="px-5 pb-5">
        <h3 className="font-semibold text-xl tracking-tight text-white capitalize">
          {name} - {year}
        </h3>

        {/* Pantone Value */}
        <p className="text-sm text-gray-400">{pantone_value}</p>

        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between">
          <span className="text-2xl text-white font-bold">
            ${price.toFixed(2)}
          </span>
          <div
            onClick={onToggle}
            className="px-4 py-2  flex items-center cursor-pointer"
          >
            <div className="text-red-600 hover:bg-gray-100 rounded">
              {isFavorite ? <IoHeart /> : <IoHeartOutline />}
            </div>
          </div>

          <div className="flex">
            <button
              onClick={onAddToCart}
              className="text-white mr-2  focus:ring-4 font-medium rounded-lg text-sm px-3 py-3 text-center bg-green-600 hover:bg-green-700 focus:ring-green-800"
            >
              <IoAddCircleOutline size={20} />
            </button>
            <button
              onClick={onRemoveFromCart}
              className="text-white focus:ring-4  font-medium rounded-lg text-sm px-3 py-3 text-center bg-red-600 hover:bg-red-700 focus:ring-red-800"
            >
              <IoTrashOutline size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
