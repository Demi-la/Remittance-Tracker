import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: 1,
    sender: "Tope Alabi",
    recipient: "Alabi Tope",
    amount: "100,000",
  },
  {
    id: 2,
    sender: "Oluwaseun",
    recipient: "Demilade",
    amount: "40,000",
  },
  {
    id: 3,
    sender: "Adedoyin",
    recipient: "Idowu Araoyinbo",
    amount: "20,00",
  },
  {
    id: 4,
    sender: "Comfort",
    recipient: "James",
    amount: "30,000",
  },
  {
    id: 5,
    sender: "Ibrahim",
    recipient: "Ayotayo",
    amount: "15,000",
  },
];

let lastUsedId = initialState.reduce(
  (maxId, transaction) => Math.max(maxId, transaction.id),
  0
);
const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    addedTransactions: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(sender, recipient, amount, id) {
        lastUsedId++;
        return {
          payload: {
            id: lastUsedId,
            sender,
            recipient,
            amount,
          },
        };
      },
    },
    edittedTransactions: (state, action) => {
      const { id, sender, recipient, amount } = action.payload;
      const updatedTransaction = state.find(
        (transaction) => transaction.id === id
      );
      if (updatedTransaction) {
        updatedTransaction.sender = sender;
        updatedTransaction.recipient = recipient;
        updatedTransaction.amount = amount;
      }
    },
  },
});

export const { addedTransactions, edittedTransactions } =
  transactionsSlice.actions;
export const allTransactions = (state) => state.transactions;

export default transactionsSlice.reducer;
