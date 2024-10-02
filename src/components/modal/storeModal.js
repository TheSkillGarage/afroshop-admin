import { createRoot } from "react-dom/client";
import React from "react";
import { ArrowRight2, storeModal } from "../../images";

// Modal Function
export const showModal = ({ title, message, onConfirm }) => {
  // Create the modal DOM element
  const modalRoot = document.createElement("div");
  modalRoot.id = "custom-modal-root";
  document.body.appendChild(modalRoot);

  // Modal Component
  const Modal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
    onClick={closeModal} // Detect click outside modal to close
    >
    <div
        className="bg-white w-[585px] max-h-[705px] rounded-lg shadow-lg flex flex-col justify-between px-14 py-32"
        onClick={(e) => e.stopPropagation()} // Prevent modal close on inside click
      >
         <div className="flex flex-col items-center text-center">
          <img src={storeModal} alt="store-modal-image" className="mb-6 w-[300px] h-[200px]" />
          <h3 className="text-[20px] font-bold mb-6">{title}</h3>
          <p className="text-[16px] mb-3 text-[#7F7F7F] flex flex-col">
            Thanks for submitting your store to Afroshop! 🎉
             <span>{message}</span>
          </p>
         
        </div>
        <div className="flex justify-center mt-3">
          <button
            className="bg-green text-white font-normal py-2 px-6 rounded w-[400px] flex items-center justify-center gap-2"
            onClick={() => {
              closeModal();
              onConfirm();
            }}
          >
             <span>Go to Dashboard</span>
            <img src={ArrowRight2} alt="arrow-right" />
          </button>
        </div>
       
      </div>
      </div>
    
  );

  // Function to close the modal
  const closeModal = () => {
    root.unmount();
    modalRoot.remove();
  };

  // Create a root and render the modal in the DOM
  const root = createRoot(modalRoot);
  root.render(<Modal />);
};
