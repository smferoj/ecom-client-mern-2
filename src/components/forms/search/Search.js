import axios from "axios";
import { useSearch } from "../../../context/search";
import { useNavigate } from "react-router-dom";

const Search=()=> {
  // hooks
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(`/products/search/${values?.keyword}`);
      // console.log(data);
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form className="d-flex flex-grow-1" onSubmit={handleSubmit}>
    <div className="flex-grow-1">
      <input
        type="search"
        style={{ borderRadius: "0px", width: "100%" }}
        className="form-control pt-2"
        placeholder="Search"
        onChange={(e) => setValues({ ...values, keyword: e.target.value })}
        value={values.keyword}
      />
    </div>
    <button
      className="btn btn-outline-info px-3"
      type="submit"
      style={{ borderRadius:"0", height:"37px"}}
    >
        Search
    </button>
  </form>
  
  );
}

export default Search;