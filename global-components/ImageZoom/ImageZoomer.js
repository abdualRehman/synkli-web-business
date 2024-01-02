import "./ImageZoomer.css";
export const ZoomImage = ({ src, alt, onClose }) => {
  return (
    <div className="modal-zoom" onClick={onClose}>
      <span className="close" onClick={onClose}>
        &times;
      </span>
      <div
        style={{
          width: 700,
          height: 700,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <img className="modal-content" src={src} alt={alt} />
      </div>
    </div>
  );
};
