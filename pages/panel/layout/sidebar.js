import Link from "next/link";
import React from "react";
import { push as Menu } from "react-burger-menu";
//store [state manager]
import { StoreContext } from "../../../context/store";


// Menus
const MENUS = [
  {
    name: "dashboard",
    as: "dashboard",
    href: "/panel",
    label: "Dashboard",
    icon: "fas fa-chart-pie",
  },
  {
    name: "customergroups",
    as: "admin",
    href: "/panel/customergroups",
    label: "Grupo de Clientes",
    icon: "fas fa-clone",
  },
  {
    name: "customers",
    as: "admin",
    href: "/panel/customers",
    label: "Clientes",
    icon: "fas fa-clone",
  },
  {
    name: "mtaccounts",
    as: "admin",
    href: "/panel/mtaccounts",
    label: "Cuentas MT",
    icon: "fas fa-clone",
  },
  {
    name: "sliders",
    as: "content",
    href: "/panel/sliders",
    label: "Slider",
    icon: "fas fa-bullseye",
  },
  {
    name: "users",
    as: "users",
    href: "/panel/users",
    label: "Usuarios",
    icon: "fas fa-user",
  },
  {
    name: "usergroups",
    as: "users",
    href: "/panel/usergroups",
    label: "Grupos de Usuarios",
    icon: "fas fa-user",
  },
];

function SideBar(props) {
  const { activeLink, session } = props;
  const [menus, setMenus] = React.useState(MENUS);
  const [isOpen, setOpen] = React.useState(false);
  const store = React.useContext(StoreContext);

  store.on("update-sidebarSearch", (s) => {
    console.log({s});
    if (!s || s.trim().length === 0) return MENUS;

    s = s.trim().toUpperCase();
    
    let to = setTimeout(() => {
      clearTimeout(to);
      let menus = MENUS.filter((item, k) => {
        return item.label.toUpperCase().indexOf(s) != -1;
      });
      setMenus(menus);
    }, 300);
  });

  store.on("sidebarToggle", o => {
    setOpen(o);
  });

  return (
    <>
      <Menu
        id="sidebar"
        className={
          (isOpen ? "is-open " : "is-close") +
          `sidebar bg-purple fixed z-0 h-full left-0 pt-16 flex lg:flex flex-shrink-0 flex-col w-64 transition-width duration-75`
        }
        pageWrapId="mainContent"
        noOverlay
        aria-label="Sidebar"
        isOpen={isOpen}
      >
        <div className="relative flex-1 flex flex-col min-h-0 border-r border-gray-200 pt-0">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex-1 px-3 divide-y space-y-1">
              <div className="wrapper-list-group">
                <ul flush className="list-group-nav-left" tag="div">
                  <li key="sidebar-search">
                    <form action="#" method="GET">
                      <label htmlFor="mobile-search" className="sr-only">
                        Search
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <svg
                            className="w-5 h-5 text-gray-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                          </svg>
                        </div>
                        <input
                          autoComplete="off"
                          type="text"
                          name="email"
                          id="mobile-search"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-600 focus:ring-cyan-600 block w-full pl-10 p-2.5"
                          placeholder="Search"
                          onChange={(e) => {
                            store.set("sidebarSearch", e.target.value);
                            store.emit("update-sidebarSearch", e.target.value);
                          }}
                        />
                      </div>
                    </form>
                  </li>
                  {menus.map((item, k) => {
                    const isActive = activeLink === item.name ? true : false;
                    return (
                      <li
                        key={`l${k}:${item.label}:${item.as}`}
                        active={isActive}
                        tag={item.as}
                        href={item.href}
                      >
                        <Link href={item.href}>
                          <a>
                            {item.icon && <i className={item.icon}></i>}{" "}
                            {item.label}
                          </a>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Menu>

      <div
        className="bg-gray-900 opacity-50 hidden fixed inset-0 z-10"
        id="sidebarBackdrop"
      ></div>
    </>
  );
}

export default SideBar;
