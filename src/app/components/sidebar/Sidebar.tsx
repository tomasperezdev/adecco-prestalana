import Image from "next/image";
import { CiShoppingBasket } from "react-icons/ci";
import { IoBasketOutline, IoStarOutline } from "react-icons/io5";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import { SidebarItem } from "./SidebarItem";
import { LogoutButton } from "./LogoutButton";

const menuItems = [
  {
    icon: <IoStarOutline />,
    title: "Favoritos",
    path: "/",
  },
  {
    icon: <IoBasketOutline />,
    title: "Productos",
    path: "/products",
  },
  {
    icon: <CiShoppingBasket />,
    title: "Cart",
    path: "/cart",
  },
];

export const Sidebar = async () => {
  const session = await getServerSession(authOptions);

  const avatarUrl = session?.user?.image
    ? session.user.image
    : "https://tailus.io/sources/blocks/stats-cards/preview/images/second_user.webp";

  const userName = session?.user?.name ?? "No Name";
  const userRoles = ["client"];

  return (
    <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
      <div>
        <div className="mt-8 text-center">
          <Image
            src={avatarUrl}
            width={25}
            height={25}
            alt=""
            className="w-5 h-5 m-auto rounded-full object-cover lg:w-20 lg:h-20"
          />
          <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">
            {userName}
          </h5>
          <span className="hidden text-gray-400 lg:block capitalize">
            {userRoles.join(",")}
          </span>
        </div>

        <ul className="space-y-2 tracking-wide mt-8">
          {menuItems.map((item) => (
            <SidebarItem key={item.path} {...item} />
          ))}
        </ul>
      </div>

      <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
        <LogoutButton />
      </div>
    </aside>
  );
};
