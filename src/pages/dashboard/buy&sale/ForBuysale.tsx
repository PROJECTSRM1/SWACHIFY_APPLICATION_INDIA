import "./BuysaleProducts.css";

export default function Modal({ children, onClose }: any) {
  return (
    <div className="sellModalOverlay" onClick={onClose}>
      <div className="sellModalContainer" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
