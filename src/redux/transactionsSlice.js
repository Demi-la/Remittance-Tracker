import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("transactions")) || [
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
        localStorage.setItem("transactions", JSON.stringify(state));
      },
      prepare(sender, recipient, amount) {
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

    edittedTransactions(state, action) {
      const { id, sender, recipient, amount } = action.payload;
      const transactionIndex = state.findIndex(
        (transaction) => transaction.id === id
      );
      if (transactionIndex !== -1) {
        state[transactionIndex] = { id, sender, recipient, amount };
        localStorage.setItem("transactions", JSON.stringify(state));
      }
    },
    deleteTransactions(state, action) {
      const { id } = action.payload;
      const transactionIndex = state.findIndex(
        (transaction) => transaction.id === id
      );
      if (transactionIndex !== -1) {
        state.splice(transactionIndex, 1);
        let newId = 1;
        state.forEach((transaction) => {
          transaction.id = newId++;
        });
        lastUsedId = state.length > 0 ? state[state.length - 1].id : 0;
        localStorage.setItem("transactions", JSON.stringify(state));
      } else {
        console.error(`Transaction with id ${id} not found.`);
      }
    },
  },
});

export const { addedTransactions, edittedTransactions, deleteTransactions } =
  transactionsSlice.actions;
export const allTransactions = (state) => state.transactions;

export default transactionsSlice.reducer;
