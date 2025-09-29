"use client";
import Link from "next/link";
import Accordion from "./Accordion";
import { GrUserAdmin } from "react-icons/gr";
import { usePathname, useRouter } from "next/navigation";
import { TbLocation } from "react-icons/tb";
import { useState } from "react";
import { IoMdMenu } from "react-icons/io";
// import { useState } from "react";

export default function Sidebar() {
  const router = useRouter();
  const [openSidebar, setOpenSidebar] = useState(true)
  const pathname = usePathname();

  const menuList = [
    {
      name: 'dashboard',
      path: '/admin/dashboard'
    },
    {
      name: 'vehicle',
      path: '/admin/vehicle'
    },
    {
      name: 'transaction',
      path: '/admin/transaction'
    }
  ]
  return (
    <div className={`${ openSidebar ? 'w-60' : 'w-0' } h-full z-40 bg-white dark:bg-[#171717]`}>
      <div className={`h-16 absolute ${ openSidebar ? 'left-60' : 'left-0' } transition-all duration-300  top-0 flex justify-center items-center px-5`}>
        <button
          onClick={ () => setOpenSidebar(!openSidebar)}
          className="cursor-pointer">
          <IoMdMenu size={30} />
        </button>
      </div>
      <div className={`${ openSidebar ? 'w-60 scale-x-100' : 'scale-x-0 origin-left' } h-full transition-all duration-300 relative border-r border-gray-200 dark:border-gray-700 p-5`}>
        <Link href="/admin/dashboard" className="font-bold text-3xl flex items-center">
          <p>VRent</p>
        </Link>
        <nav className="mt-10">
          <ul className="w-full flex flex-col gap-1">
            {menuList.map((menu) => 
            <li
              key={menu.name}
              className="w-full">
                <button
                  onClick={() => router.push(menu.path)}
                  disabled={pathname?.startsWith(menu.path)}
                  className={`${pathname?.startsWith(menu.path) ? 'bg-blue-100 dark:bg-gray-700' : ''} w-full cursor-pointer disabled:cursor-default text-left capitalize px-5 py-3 rounded hover:bg-blue-100 dark:hover:bg-gray-700`}
                >
                  {menu.name}
                </button>
            </li>)}
            <li>
              <Accordion title="Setting">
                <ul className="flex flex-col gap-1 mt-2">
                  <li className="w-full mt-1">
                    <button
                    className="w-full flex items-center gap-3 capitalize px-5 py-3 cursor-pointer rounded hover:bg-blue-50 dark:hover:bg-gray-700"
                    onClick={() => router.push("/admin/setting/admin")}>
                      <GrUserAdmin size={24} />
                      <span>Admin</span>
                    </button>
                  </li>
                  <li className="w-full">
                    <button
                    className="w-full flex items-center gap-3 capitalize px-5 py-3 cursor-pointer rounded hover:bg-blue-50 dark:hover:bg-gray-700"
                    onClick={() => router.push("/admin/setting/location")}>
                      <TbLocation size={24} />
                      <span>Location</span>
                    </button>
                  </li>
                </ul>
              </Accordion>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}


// export function changeSidebarView() {
//   setIsOp
// }