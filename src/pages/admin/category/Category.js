import React, { useState, useEffect } from "react";
import "./category.css";
import { useAuth } from "../../../context/auth";
import Jumbotron from "../../../components/cards/Jumbotron";
import axios from "axios";
import toast from "react-hot-toast";
import { Modal } from "antd";
import AdminMenu from "../../../components/nav/adminMenu/AdminMenu";
import CategoryForm from "../../../components/forms/CategoryForm";

const Category = () => {
  const [auth, setAuth] = useAuth();
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatingName, setUpdatingName] = useState("");

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const { data } = await axios.get("/categories");
      setCategories(data);
    } catch (err) {
      console.log(err);
    }
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/category", { name });
      if (data?.error) {
        toast.error(data.error);
      } else {
        loadCategories();
        setName("");
        toast.success(`"${data.name}" is created`);
      }
    } catch (err) {
      console.log(err);
      toast.error("Create category failed. Try again.");
    }
  };
  // handle update
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`/category/${selected._id}`, {
        name: updatingName,
      });
      if (data?.error) {
        toast.error(data.error);
      } else {
        toast.success(`"${data.name}" is updated`);
        setSelected(null);
        setUpdatingName("");
        loadCategories();
        setVisible(false);
      }
    } catch (err) {
      console.log(err);
      toast.error("Category may already exist. Try again.");
    }
  };
  //  handle delete
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.delete(`/category/${selected._id}`);
      if (data?.error) {
        toast.error(data.error);
      } else {
        toast.success(`"${data.name}" is deleted`);
        setSelected(null);
        loadCategories();
        setVisible(false);
      }
    } catch (err) {
      console.log(err);
      toast.error("Category may already exist. Try again.");
    }
  };

  return (
    <div>
      <Jumbotron
        title={`Hello ${auth?.user?.name}`}
        subTitle="Admin Dashboard"
      />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9 category_form">
            <div className="p-3 m-2 mb-2 h4 bg-light">Manage Categories</div>
            <CategoryForm
              value={name}
              setValue={setName}
              handleSubmit={handleSubmit}
            />
            <hr />
            <div className="col">
              {categories?.map((c) => (
                <button
                  key={c._id}
                  className="btn m-3"
                  onClick={() => {
                    setVisible(true);
                    setSelected(c);
                    setUpdatingName(c.name);
                  }}
                >
                  {c.name}
                </button>
              ))}
            </div>
            <Modal
              open={visible}
              onOk={() => setVisible(false)}
              onCancel={() => setVisible(false)}
              footer={null}
            >
              <CategoryForm
                value={updatingName}
                setValue={setUpdatingName}
                handleSubmit={handleUpdate}
                buttonText="Update"
                handleDelete={handleDelete}
              />
              {/* Here handle delete pass to category form */}
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
