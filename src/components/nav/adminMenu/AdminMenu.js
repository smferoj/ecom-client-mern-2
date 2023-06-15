import { NavLink } from "react-router-dom";
import'./adminMenu.css';
const AdminMenu=()=> {
  return (
    <>
      <div className="admin_menu">
      <div className="admin_menu_head">Admin Links</div>
      <ul className="list-group list-unstyled">
        <li>
          <NavLink className="list-group-item" to="/dashboard/admin/category">
            Create Category
          </NavLink>
        </li>
        <li>
          <NavLink className="list-group-item" to="/dashboard/admin/product">
            Create Product
          </NavLink>
        </li>
        <li>
          <NavLink className="list-group-item" to="/dashboard/admin/products">
            Edit Products
          </NavLink>
        </li>
        <li>
          <NavLink className="list-group-item" to="/dashboard/admin/orders">
            Manage orders
          </NavLink>
        </li>
      </ul>
      </div>
    </>
  );
}

export default AdminMenu;