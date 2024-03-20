import React from "react";
import "./index.css";
import Modal from "react-modal";
import { withRouter } from "react-router-dom";
Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    padding: "40px 20px",
  },
};

function Navbar(props) {
  const handleLogout = () => {
    const { history } = props;
    localStorage.setItem("user", null);
    history.replace("/");
    //console.log("logout click");
  };

  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className="navbar">
      <div>
        <img
          src="https://cdn-icons-png.flaticon.com/512/616/616430.png"
          className="cat-icon"
          alt="cat-icon"
        />
      </div>

      <div>
        <a onClick={openModal} href="#1" className="rules">
          Rules
        </a>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className="modal-content">
            <h2> Rules – </h2>
            <p>
              - If the card drawn from the deck is a cat card, then the card is
              removed from the deck.
            </p>
            <p>
              - If the card is exploding kitten (bomb) then the player loses the
              game.
            </p>
            <p>
              - If the card is a defusing card, then the card is removed from
              the deck. This card can be used to defuse one bomb that may come
              in subsequent cards drawn from the deck.
            </p>
            <p>
              - If the card is a shuffle card, then the game is restarted and
              the deck is filled with 5 cards again.
            </p>
            <button onClick={closeModal}>close</button>
          </div>
        </Modal>
        <button className="show-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default withRouter(Navbar);
