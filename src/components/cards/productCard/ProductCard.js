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
    <div className="card mb-2 hoverable">
      <Badge.Ribbon text={`${p?.sold} sold`} color="red" className="mx-2">
        <Badge.Ribbon
          text={`${p?.quantity >= 1
              ? `${p?.quantity - p?.sold} in stock`
              : "Out of stock"
            }`}
          placement="start"
          color="green"
          className="mx-2"
        >
          <img
            className="card-img-top"
            src={`${process.env.REACT_APP_API}/product/photo/${p._id}`}
            alt={p.name}
            style={{ height:"200px", objectFit: "cover" }}
          />
        </Badge.Ribbon>
      </Badge.Ribbon>

      <div className="card-body">
        <h5>{p?.name}</h5>
        <h4 className="fw-bold">
          {p?.price?.toLocaleString("en-US", {
            style: "currency",
            currency:"BDT",
          })}
        </h4>

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

      {/* <p>{moment(p.createdAt).fromNow()}</p>
      <p>{p.sold} sold</p> */}
    </div>
  );
}

export default ProductCard;