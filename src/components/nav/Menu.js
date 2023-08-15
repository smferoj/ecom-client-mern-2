import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import useCategory from "../../hooks/useCategory";
import { Badge } from "antd";
import { useCart } from "../../context/cart";
import Search from "../forms/search/Search";

import logo from "../../images/logo.png";
import './menu.css'

const Menu = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const categories = useCategory();
  const navigate = useNavigate();

  const logout = () => {
    setAuth({ ...auth, user: null, token: '' });
    localStorage.removeItem('auth');
    navigate('/login');
  };

      return (
   
          <div className="nav_container">
              <div className="left_col">
                <div className="d-flex align-items-center">
                  <NavLink className="navbar-brand" to="/">
                    <img src={logo} alt="Logo" style={{ maxHeight: '50px' }} />
                  </NavLink>
                  <ul className="nav">
                    <li className="nav-item">
                      <NavLink className="nav-link" aria-current="page" to="/">
                        HOME
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" aria-current="page" to="/shop">
                        SHOP
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <Badge count={cart?.length >= 1 ? cart.length:0} offset={[-5, 11]} showZero={true} >
                        <NavLink className="nav-link mt-1" to="/cart">
                          CART
                        </NavLink>
                      </Badge>
                    </li>
                    {!auth?.user ? (
                      <>
                        <li className="nav-item">
                          <NavLink className="nav-link" to="/login">
                            LOGIN
                          </NavLink>
                        </li>
                        <li className="nav-item">
                          <NavLink className="nav-link" to="/register">
                            REGISTER
                          </NavLink>
                        </li>
                      </>
                    ) : (
                      <li className="nav-item dropdown">
                        <a
                          className="nav-link dropdown-toggle"
                          href="#"
                          id="navbarDropdown"
                          role="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          {auth?.user?.name?.toUpperCase()}
                        </a>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                          <li>
                            <NavLink className="dropdown-item" to={`/dashboard/${auth?.user?.role === 1 ? 'admin' : 'user'}`}>
                              Dashboard
                            </NavLink>
                          </li>
                          <li>
                            <a className="dropdown-item" href="#" onClick={logout}>
                              Logout
                            </a>
                          </li>
                        </ul>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
              <div className="right_col">
                <Search />
              </div>
            </div>
      
  );
};

export default Menu;

  /* 
        
       
        /* <div className="dropdown">
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
        </div> */
        
        
