import { useState, useEffect } from "react";
import { useAuth } from "../../../context/auth";
import Jumbotron from "../../../components/cards/Jumbotron";
import AdminMenu from "../../../components/nav/adminMenu/AdminMenu";
import axios from "axios";
import { Link } from "react-router-dom";
import moment from "moment";
import'./adminProducts.css';

const AdminProducts=()=> {
  // context
  const [auth, setAuth] = useAuth();
  // state
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const { data } = await axios.get("/products");
      setProducts(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Jumbotron
        title={`Hello ${auth?.user?.name}`}
        subTitle="Will you Modify the product!!"
      />

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="products_head">Products</div>

            {products?.map((product) => (
              <Link
                key={product._id}
                to={`/dashboard/admin/product/update/${product.slug}`}
              >
                <div className="product_card mb-3">
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img
                        src={`${process.env.REACT_APP_API}/product/photo/${product._id}`}
                        alt={product.name}
                        className="img img-fluid rounded-start"
                      />
                    </div>
                    <div className="col-md-8 card">
                      <div className="body">
                        <div className="title">{product.name}</div>
                        <p className="text">{product.description}</p>
                        <p className="text">
                          <small className="date"> Created:" "  
                             {moment(product.createdAt).format(
                              "MMMM Do YYYY, h:mm:ss a"
                            )}
                          </small>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminProducts;