import { useSearch } from "../../context/search";
 import ProductCard from "../../components/cards/productCard/ProductCard";
import Jumbotron from "../../components/cards/Jumbotron";

const Search=()=> {
  const [values, setValues] = useSearch();
  return (
    <>
      <Jumbotron
        title="Search results"
        subTitle={
          values?.results?.length < 1
            ? "No products found"
            : `Found ${values?.results?.length} products`
        }
      />

      <div className="bg-secondary">
        <div className="row">
          {values?.results?.map((p) => (
            <div key={p._id} >
              <ProductCard p={p} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Search;
