import "./Preloader.css";

function Preloader({ className }) {
  return (
    <div className={className}>
      <div className="preloader__spinner circle-preloader"></div>
    </div>
  );
}

export default Preloader;
