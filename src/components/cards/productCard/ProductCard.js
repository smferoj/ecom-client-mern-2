import { Badge } from "antd";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../../context/cart";
import './productCard.css'

const  ProductCard=({ p })=> {
  // context
  const [cart, setCart] = useCart();
  // hooks
  const navigate = useNavigate();

  return (
    <div className="card hoverable p-3">
      <Badge.Ribbon text={`${p?.sold} sold`}className="mx-2 sold_ribon">
        <Badge.Ribbon
          text={`${p?.quantity >= 1
              ? `${p?.quantity - p?.sold} in stock`
              : "Out of stock"
            }`}
          placement="start"
          className="mx-2 stock_ribon">
          
          <div className="card_image">
          <img
            className="card-img-top"
            src={`${process.env.REACT_APP_API}/product/photo/${p._id}`}
            alt={p.name}
          />
          </div>
        </Badge.Ribbon>
      </Badge.Ribbon>

      <div className="card-body">
        <h5 className="pt-2">{p?.name}</h5>
        <h6 className="bg-white text-danger">
          {p?.price?.toLocaleString("en-US", {
            style: "currency",
            currency:"BDT",
          })}
        </h6>
        <p className="card-text">{p?.description?.substring(0, 60)}...</p>
      </div>

      <div className="d-flex justify-content-between">
        <button
          className="btn btn-primary card-button"
          style={{ borderBottomLeftRadius: "5px" }}
          onClick={() => navigate(`/product/${p.slug}`)}
        >
          Details 
        </button>

        <button
          className="btn btn-outline-primary card-button"
          style={{ borderBottomRightRadius: "5px" }}
          onClick={() => {
            setCart([...cart, p]);
            localStorage.setItem("cart", JSON.stringify([...cart, p]));
            toast.success("Added to cart");
          }}
        >
          Add to Cart
        </button>
      </div>

    </div>
  );
}

export default ProductCard;