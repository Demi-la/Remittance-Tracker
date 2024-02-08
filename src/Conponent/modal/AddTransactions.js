import React, { useState } from "react";
import ReactModal from "react-modal";
import { addedTransactions } from "../../redux/transactionsSlice";
import { useDispatch } from "react-redux";
import "./modal.css";

const modalStyle = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.45)",
  },
  content: {
    inset: "90px",
    width: "20rem",
    margin: "auto",
    border: "none",
    padding: "0",
  },
};
const AddTransactions = ({ isOpen, onCloseModal }) => {
  const dispatch = useDispatch();
  const [sender, setSender] = useState(" ");
  const [recipient, setRecipient] = useState(" ");
  const [amount, setAmount] = useState(" ");

  const onSenderChange = (e) => setSender(e.target.value);
  const onRecipientChange = (e) => setRecipient(e.target.value);
  const onAmountChange = (e) => setAmount(e.target.value);

  const canSubmit = Boolean(sender) && Boolean(recipient) && Boolean(amount);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (sender && recipient && amount) {
      dispatch(addedTransactions(sender, recipient, amount));
      setSender("");
      setRecipient("");
      setAmount("");
    }
    onCloseModal(false);
  };

  return (
    <ReactModal isOpen={isOpen} style={modalStyle}>
      <div className="container">
        <div className="header">
          <h2 className="modalTitle">Add Transaction</h2>
          <span onClick={() => onCloseModal(false)}>X</span>
        </div>

        <div className="ModalContent">
          <form>
            <div>
              <label htmlFor="sender">Sender</label>
              <input
                type="text"
                name="sender"
                value={sender}
                onChange={onSenderChange}
              />
            </div>
            <div>
              <label htmlFor="recipient">Recipient</label>
              <input
                type="text"
                name="recipient"
                value={recipient}
                onChange={onRecipientChange}
              />
            </div>
            <div>
              <label htmlFor="amount">Amount</label>
              <input
                type="text"
                name="amount"
                value={amount}
                onChange={onAmountChange}
              />
            </div>
            <button onClick={handleSubmit} disabled={!canSubmit} type="button" className="submitButton">
              Submit
            </button>
          </form>
        </div>
      </div>
    </ReactModal>
  );
};

export default AddTransactions;
