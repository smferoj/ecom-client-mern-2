import { useEffect, useState } from "react";
import "./home.css";
import axios from "axios";
import ProductCard from "../../components/cards/productCard/ProductCard";
import Carousel from "../../components/carousel/Carousel";
import Head_img_1 from "../../images/Banner_1.png";
import Head_img_2 from "../../images/Banner_2.png";


const Home = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProducts();
    getTotal();
  }, []);

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  const getTotal = async () => {
    try {
      const { data } = await axios.get("/products-count");
      setTotal(data);
    } catch (err) {
      console.log(err);
    }
  };

  const loadProducts = async () => {
    try {
      const { data } = await axios.get(`/list-products/${page}`);
      setProducts(data);
    } catch (err) {
      console.log(err);
    }
  };

  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/list-products/${page}`);
      setProducts([...products, ...data]);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const arr = [...products];
  const sortedBySold = arr?.sort((a, b) => (a.sold < b.sold ? 1 : -1));

  return (
    <div home_container>
      <div className="head_line">
        <div className="left_image">
          <img src={Head_img_1} alt="" />
        </div>
        <div className="head_desc">
        <h1> Gen <span>Style</span></h1>
        <h3> Diversity of collections</h3>
        
        </div>
        <div className="right_image">
          <img src={Head_img_2} alt="" />
        </div>
      </div>

      <div className="carousel_container">
        <Carousel />
      </div>
      {/* ==========Card related========= */}
       <div className="card_related">  
       <div className="px-2 arrival">
          <h4 className="text-center pt-2 pb-2 ">New Arrivals</h4>
          <div className="row">
            {products?.map((p) => (
              <div className="col-lg-6" key={p._id}>
                <ProductCard p={p} />
              </div>
            ))}
          </div>
        </div>

        <div className="px-2 selling">
          <h4 className="text-center pt-2 pb-2">
            Top Selling
          </h4>
          <div className="row">
            {sortedBySold?.map((p) => (
              <div className="col-lg-6" key={p._id}>
                <ProductCard p={p} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container text-center p-5">
        {products && products.length < total && (
          <button
            className="btn btn-warning"
            disabled={loading}
            onClick={(e) => {
              e.preventDefault();
              setPage(page + 1);
            }}
          >
            {loading ? "Loading..." : "Load more"}
          </button>
        )}
      </div>

      </div>
  );
};

export default Home;
