import React from "react";
import { useAuth } from "../../../context/auth";
import Jumbotron from "../../../components/cards/Jumbotron";
import AdminMenu from "../../../components/nav/adminMenu/AdminMenu";
import'./adminDashboard.css'
const AdminDashboard = () => {
  const [auth, setAuth] = useAuth();

  return (
    <div>
      <Jumbotron
        title={`Hello ${auth?.user?.name}`}
        subTitle="You Can Control the Website"
      />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="admin_information">Admin Information</div>
            <ul className="list-group">
              <li className="list-group-item">{auth?.user?.name}</li>
              <li className="list-group-item">{auth?.user?.email}</li>
              <li className="list-group-item">Admin</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
