import { useEffect, useState } from "react";
import'./home.css'
import axios from "axios";
import ProductCard from "../../components/cards/productCard/ProductCard";
import Carousel from "../../components/carousel/Carousel";

const Home=()=> {
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
    <div>
        <div className="head_line">
          <h1> Gen-Style</h1>
          <h3> Diversity of collections</h3>
        </div>
      
      <div className="carousel_container">
       <Carousel/>
      </div>
     

      <div className="row m-2">
        <div className="col-md-6 px-2">
          <h2 className="p-3 mt-2 mb-2 h4 text-center arrival">
            New Arrivals
          </h2>
          <div className="row">
            {products?.map((p) => (
              <div className="col-md-6" key={p._id}>
                <ProductCard p={p} />
              </div>
            ))}
          </div>
        </div>

        <div className="col-md-6 px-2">
          <h2 className="p-3 mt-2 mb-2 h4 text-center seller">
            Top Selling
          </h2>
          <div className="row">
            {sortedBySold?.map((p) => (
              <div className="col-md-6" key={p._id}>
                <ProductCard p={p} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container text-center p-5">
        {products && products.length < total && (
          <button
            className="btn btn-warning btn-lg col-md-6"
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
}

export default Home;