const Modal = ({ children, overlayClickHandler, noStyling }) => {
  const handleOverlayClick = (e) => {
    if (e.target.getAttribute("class")?.includes("modal-overlay")) {
      overlayClickHandler();
    }
  };

  const classNames = ["w-full p-6 xl:p-8 xl:w-6/12"];
  if (!noStyling) {
    classNames.push(
      "bg-white shadow-md rounded border border-[rgba(0,0,0,0.1)]"
    );
  }

  return (
    <div
      className="modal-overlay flex items-center justify-center absolute bg-[rgba(255,255,255,0.8)] top-0 left-0 right-0 bottom-0 z-10"
      onClick={handleOverlayClick}
    >
      <div className={classNames.join(" ")}>{children}</div>
    </div>
  );
};

export default Modal;
