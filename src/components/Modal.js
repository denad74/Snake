
import React from "react";
import "./Modal.css";



const Modal = ({ setIsGameStart, score }) => {
  return (
    <>
      <div className='darkBG'/>
      <div className="centered">
        <div className="modal">
          <div className="modalHeader">
            <h5 className="heading">SNAKE GAME</h5>
          </div>
          <div className="modalContent">
            Score: {score}
          </div>
          <div className="modalActions">
            <div className="actionsContainer">
              <button
                className="playBtn"
                onClick={() => setIsGameStart(true)}
              >
                PLAY SNAKE
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;