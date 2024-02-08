import "./App.css";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import TransactionTable from "./Conponent/TransactionTable";
import { allTransactions } from "./redux/transactionsSlice";
import { useState, useEffect } from "react";
import EditTransactions from "./Conponent/modal/EditTransaction";
import Login from "./Conponent/Login";
import Edit from "./Conponent/Edit";

function App() {
  const transactions = useSelector(allTransactions);
  const data = useMemo(() => {
    return transactions.map((transaction) => ({
      id: transaction.id,
      sender: transaction.sender,
      recipient: transaction.recipient,
      amount: transaction.amount,
    }));
  }, [transactions]);
  const [openModal, setOpenModal] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [editId, setEditId] = useState(transactions[0].id);

  const handleEdit = (id) => {
    setOpenModal(true);
    setEditId(id);
  };

  const transactionsColumns = [
    {
      header: "N/O",
      accessorKey: "id",
    },

    {
      header: "Sender",
      accessorKey: "sender",
    },

    {
      header: "Recipient",
      accessorKey: "recipient",
    },
    {
      header: "Amount",
      accessorKey: "amount",
    },
    {
      header: "Action",
      accessorFn: (row) => row.id,
      cell: (info) => (
        <div className="atcionBTN">
          <Edit
            handleEdit={() => handleEdit(info.getValue())}
            id={info.getValue()}
          />

          {openModal && (
            <EditTransactions
              isOpen={openModal}
              onCloseModal={setOpenModal}
              id={editId}
            />
          )}
        </div>
      ),
    },
  ];

  useEffect(() => {
    const log = localStorage.getItem("Transactions");
    if (log === null) {
      setLoginSuccess(false);
      setLoggedIn(false);
    } else {
      setLoginSuccess(true);
      setLoggedIn(true);
    }
  }, [loggedIn]);

  const handleSubmit = (values, { setSubmitting, setErrors }) => {
    setTimeout(() => {
      if (
        values.email === "user@example.com" &&
        values.password === "1Password"
      ) {
        setLoginSuccess(true);
        localStorage.setItem("Transactions", "user@example.com");

        setTimeout(() => {
          setLoggedIn(true);
        }, 1000);
      } else {
        setErrors({
          email: "Incorrect email ",
          password: "Incorrect password",
        });
      }
      setSubmitting(false);
    }, 1000);
  };

  return (
    <div>
      <h1 id="title">Remittance Transactions</h1>

      {loggedIn ? (
        <TransactionTable data={data} columns={transactionsColumns} />
      ) : (
        <Login
          handleSubmit={(value, { setSubmitting, setErrors, resetForm }) =>
            handleSubmit(value, { setSubmitting, setErrors, resetForm })
          }
        />
      )}
    </div>
  );
}

export default App;
