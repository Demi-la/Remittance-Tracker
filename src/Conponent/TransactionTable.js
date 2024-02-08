import React from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import AddTransactions from "./modal/AddTransactions";
import { CiSearch } from "react-icons/ci";
import "./table.css";

const TransactionTable = ({ data, columns }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [filtering, setFiltering] = useState("");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter: filtering,
    },
    onGlobalFilterChange: setFiltering,
  });
  return (
    <div>
      <div className="actions">
        <div className="searchWrapper">
          <input
            type="text"
            value={filtering}
            placeholder="Search....."
            onChange={(e) => setFiltering(e.target.value)}
            className="searchInput"
          />
          <button className="searchBTN">
            <CiSearch />
          </button>
        </div>
        <button
        className="addButton"
          onClick={() => {
            setModalOpen(true);
          }}
        >
          Add Transaction
        </button>
        {modalOpen && (
          <AddTransactions isOpen={modalOpen} onCloseModal={setModalOpen} />
        )}
      </div>
      <div className="container">
        <table className="w3-table-all">
          <thead className="tableHeader">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody className="tableBody">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionTable;
