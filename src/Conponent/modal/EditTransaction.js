import React, { useState } from "react";
import ReactModal from "react-modal";
import {
  allTransactions,
  edittedTransactions,
} from "../../redux/transactionsSlice";
import { useDispatch, useSelector } from "react-redux";
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
const EditTransactions = ({ isOpen, onCloseModal, id }) => {
  const transactions = useSelector(allTransactions);

  function findTransactionById(transactions, id) {
    return transactions.find((transaction) => transaction.id === id);
  }
  let { sender, recipient, amount } = findTransactionById(transactions, id);

  const [existingSender, setSender] = useState(sender);
  const [existingRecipient, setRecipient] = useState(recipient);
  const [existingAmount, setAmount] = useState(amount);

  const onExistingSender = (e) => setSender(e.target.value);
  const onExistingRecipient = (e) => setRecipient(e.target.value);
  const onExistingAmount = (e) => setAmount(e.target.value);
  const dispatch = useDispatch();

  const handleSave = (event) => {
    event.preventDefault();
    dispatch(
      edittedTransactions({
        id: id,
        sender: existingSender,
        recipient: existingRecipient,
        amount: existingAmount,
      })
    );
    onCloseModal(false);
  };

  // const canSubmit = Boolean(sender) && Boolean(recipient) && Boolean(amount);
  return (
    <ReactModal isOpen={isOpen} style={modalStyle}>
      <div className="container">
        <div className="header">
          <h2 className="modalTitle">Edit Transaction</h2>
          <span onClick={() => onCloseModal(false)}>X</span>
        </div>

        <div className="ModalContent">
          <form>
            <div>
              <label htmlFor="sender">Sender</label>
              <input
                type="text"
                name="sender"
                value={existingSender}
                onChange={onExistingSender}
              />
            </div>
            <div>
              <label htmlFor="recipient">Recipient</label>
              <input
                type="text"
                name="recipient"
                value={existingRecipient}
                onChange={onExistingRecipient}
              />
            </div>
            <div>
              <label htmlFor="amount">Amount</label>
              <input
                type="text"
                name="amount"
                value={existingAmount}
                onChange={onExistingAmount}
              />
            </div>
            <button onClick={handleSave} type="button" className="saveButton">
              Save
            </button>
          </form>
        </div>
      </div>
    </ReactModal>
  );
};

export default EditTransactions;
