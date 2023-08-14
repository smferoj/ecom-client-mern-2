import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import useCategory from "../../hooks/useCategory";
import { Badge } from "antd";
import { useCart } from "../../context/cart";
import Search from "../forms/search/Search";
import { BsWhatsapp } from "react-icons/bs";
import { FaFacebookMessenger } from "react-icons/fa";
import logo from "../../images/logo.png";

const Menu = () => {
  // context
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  // hooks
  const categories = useCategory();
  const navigate = useNavigate();
  // console.log("categories in menu => ", categories);
  const logout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    navigate("/login");
  };

  return (
    <>
      <ul className="nav d-flex  shadow-lg mb-1 sticky-top bg-white pt-1 pb-1 px-4">
        <li className="nav-item">
          <NavLink className="nav-link text-dark" aria-current="page" to="/">
            <div className="max-height-100 d-flex align-items-center justify-content-center">
              <img
                src={logo}
                alt="Logo"
                className="mx-auto"
                style={{ maxHeight: "25%", maxWidth: "25%" }}
              />
            </div>
          </NavLink>
        </li>
        <div className="d-flex gap-4 align-items-center">
          <p className="">
            <a href="https://whatsapp.com" className="text-dark">
              <BsWhatsapp /> whatsapp
            </a>
          </p>
          <p>
            <a href="https://messenger.com" className="text-dark">
              <FaFacebookMessenger /> Messagner
            </a>
          </p>
        </div>

        <li className="nav-item">
          <NavLink
            className="nav-link text-dark"
            aria-current="page"
            to="/shop"
          >
            SHOP
          </NavLink>
        </li>
        {/* =========Cart================ */}
        <li className="nav-item mt-1">
          <Badge
            count={cart?.length >= 1 ? cart.length : 0}
            offset={[-5, 11]}
            showZero={true}
          >
            <NavLink
              className="nav-link text-dark"
              aria-current="page"
              to="/cart"
            >
              CART
            </NavLink>
          </Badge>
        </li>
      </ul>

      <ul className="nav d-flex justify-content-between shadow-lg mb-2 sticky-top bg-white pt-2 pb-2 px-2">
        {/* =========Categories in nav menu======== */}
        <div className="dropdown">
          <li>
            <a
              className="nav-link text-dark pointer dropdown-toggle"
              data-bs-toggle="dropdown"
            >
              CATEGORIES
            </a>
            <ul
              className="dropdown-menu"
              style={{ height: "300px", overflow: "scroll" }}
            >
              <li>
                <NavLink className="nav-link" to="/categories">
                  All Categories
                </NavLink>
              </li>
              {categories?.map((c) => (
                <li key={c._id}>
                  <NavLink className="nav-link" to={`/category/${c.slug}`}>
                    {c.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </li>
        </div>
        <Search />
        {!auth?.user ? (
          <div className="d-flex justify-content-end">
            <li className="nav-item">
              <NavLink className="nav-link text-dark" to="/login">
                LOGIN
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-dark" to="/register">
                REGISTER
              </NavLink>
            </li>
          </div>
        ) : (
          <div className="dropdown">
            <li>
              <a
                className="nav-link text-dark pointer dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                {auth?.user?.name?.toUpperCase()}
              </a>

              <ul className="dropdown-menu">
                <li>
                  <NavLink
                    className="nav-link text-dark"
                    to={`/dashboard/${
                      auth?.user?.role === 1 ? "admin" : "user"
                    }`}
                  >
                    Dashboard
                  </NavLink>
                </li>

                <li className="nav-item pointer">
                  <a onClick={logout} className="nav-link text-info">
                    Logout
                  </a>
                </li>
              </ul>
            </li>
          </div>
        )}
      </ul>
    </>
  );
};

export default Menu;
