const MODAL_STYLES = {
  transform: "translate(-50%, -50%)",
  top: "50%",
  left: "50%",
  width: "600px",
  // minHeight: "400px",
  height: "800px",
  // position: "fixed",
};

const CLOSE_STYLES = {
  top: "2px",
  right: "10px",
};

const Modal = ({ open, onClose, children }) => {
  if (!open) return null;
  return (
    <>
      <div
        id="modal-overlay"
        className="z-20 fixed top-0 left-0 w-full h-full bg-midnight opacity-80 transform transition duration-300 ease-in-out"
        onClick={() => onClose()}
      ></div>
      <div
        id="modal"
        style={MODAL_STYLES}
        className="modal fixed max-w-full max-h-full z-20 flex flex-col rounded-md bg-purple-dark shadow transform transition duration-1000  ease-in-out"
      >
        <button
          style={CLOSE_STYLES}
          className="bg-orange hover:bg-yellow text-white font-bold py-1 px-4 z-30 rounded absolute"
          id="close-button"
          onClick={onClose}
        >
          Close
        </button>
        <div className="absolute left-0 top-0 w-full h-full overflow-auto transition-all transform transition duration-1000 ease-in-out">
          {children}
        </div>
      </div>
    </>
  );
};

export default Modal;
