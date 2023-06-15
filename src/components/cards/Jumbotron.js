import'./jumbotron.css'

const Jumbotron=({
  title,
  subTitle,
}) => {
  
  return (
    <div
      className="container-fluid jumbotron"
      style={{ marginTop: "-8px", height: "120px" }}
    >
      <div className="row">
        <div className="col text-center p-2">
          <h1 className="fw-bold">{title}</h1>
           <p className="lead">{subTitle}</p>
        </div>
      </div>
    </div>
  );
}
export default Jumbotron;
