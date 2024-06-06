"use client";
import { ProductCard } from "./components/products";
import { useAppDispatch, useAppSelector } from "./store";
import { IoHeartOutline } from "react-icons/io5";
import Link from "next/link";
import { Draggable } from "react-drag-reorder";
import { setFavoriteProduct } from "./store/products/products";
import { moveSelectedFavoriteToNewPosition } from "@/utils/functions";
import { Product } from "@/utils/interfaces";

export default function Home() {
  const storedFavorites = useAppSelector((state) => state.products.favorites);
  const dispatch = useAppDispatch();

  const getChangedPosition = (currentPos: number, newPos: number) => {
    const newFavoritesObj = moveSelectedFavoriteToNewPosition(
      currentPos,
      newPos,
      Object.values(storedFavorites)
    );
    dispatch(setFavoriteProduct(newFavoritesObj));
  };

  return Object.values(storedFavorites).length === 0 ? (
    <NoFavorites />
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
      <Draggable onPosChange={getChangedPosition}>
        {Object.values(storedFavorites).map((product: Product) => (
          <ProductCard
            data-testid="product-card"
            product={product}
            key={product.id}
          />
        ))}
      </Draggable>
    </div>
  );
}

export const NoFavorites = () => {
  return (
    <div className="flex flex-col h-[50vh] items-center justify-center">
      <IoHeartOutline size={100} className="text-red-500" />
      <span>
        No hay favoritos, puedes agregar algunos desde la pantalla de{" "}
        <Link href="/products" className="text-blue-600">
          Productos
        </Link>
      </span>
    </div>
  );
};
