import React from 'react'
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

const Edit = ({id, handleEdit, handleDelete}) => {
  return (
    <div style={{ fontSize: "1rem"}}>
      <FiEdit onClick={() => handleEdit(id)} style={{ cursor: "pointer" , marginRight: "1rem"}} />
      <MdDelete onClick={() => handleDelete(id)}/>
    </div>
  );
}

export default Edit
