import "./Preloader.css";

function Preloader({ className }) {
  return (
    <div
      className={className}
      role="status"
      aria-live="polite"
      aria-label="Loading content"
    >
      <div className="preloader__spinner circle-preloader"></div>
    </div>
  );
}

export default Preloader;
