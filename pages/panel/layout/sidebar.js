import React from "react";
import {
  ListGroup,
  ListGroupItem,
  Nav,
  NavItem,
  NavLink,
  UncontrolledCollapse,
} from "reactstrap";

// Menus
const MENUS = [
  {
    name: "dashboard",
    as: "a",
    href: "/panel",
    label: "Dashboard",
    icon: "fas fa-chart-pie",
  },
  {
    name: "products",
    as: "a",
    href: "/panel/products",
    label: "Productos",
    icon: "fas fa-clone",
  },
  {
    name: "buttons",
    as: "a",
    href: "/panel/sliders",
    label: "Slider",
    icon: "fas fa-bullseye",
  },
  {
    name: "users",
    as: "a",
    href: "/panel/users",
    label: "Usuarios",
    icon: "fas fa-user",
  },
];

function SideBar(props) {
  const { activeLink, session } = props;
  
  return (
    <>
      <h4 className="headline">Menu</h4>
      <div className="wrapper-list-group">
        <ListGroup flush className="list-group-nav-left" tag="div">
          {MENUS.map((item, k) => {
            const isActive = activeLink === item.name ? true : false;
            return (
              <ListGroupItem
                key={`l${k}`}
                active={isActive}
                tag={item.as}
                href={item.href}
              >
                {item.icon && <i className={item.icon}></i>} {item.label}
              </ListGroupItem>
            );
          })}
        </ListGroup>
      </div>
       </>
  );
}

export default SideBar;
