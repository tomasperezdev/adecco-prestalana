import { CookieType } from "@/utils/constants";
import { getCookieParsed, getTotalProductCountInCart } from "@/utils/functions";
import { cookies } from "next/headers";
import Link from "next/link";
import { CiMenuBurger, CiShoppingBasket } from "react-icons/ci";

export const TopMenu = () => {
  const cookieStore = cookies();
  const cart = getCookieParsed(CookieType.CART, cookieStore, "{}");
  const totalItems = getTotalProductCountInCart(cart);

  return (
    <div className="sticky z-10 top-0 h-16 border-b bg-white lg:py-2.5">
      <div className="px-6 flex items-center justify-between space-x-4">
        <h5 hidden className="text-2xl text-gray-600 font-medium lg:block">
          Admin de Productos
        </h5>
        <button className="w-12 h-16 -mr-2 border-r lg:hidden">
          <CiMenuBurger size={30} />
        </button>
        <div className="flex space-x-2">
          <Link
            href={"/cart"}
            className="p-2 flex items-center justify-center h-10 rounded-xl border bg-gray-100 focus:bg-gray-100 active:bg-gray-200"
          >
            {totalItems > 0 && (
              <span className="text-sm mr-2 text-blue-800 font-bold">
                {totalItems}
              </span>
            )}

            <CiShoppingBasket size={25} />
          </Link>
        </div>
      </div>
    </div>
  );
};
