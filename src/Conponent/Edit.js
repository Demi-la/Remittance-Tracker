import React from 'react'
import { FiEdit } from "react-icons/fi";

const Edit = ({id, handleEdit}) => {
  return (
    <div>
      <FiEdit onClick={() => handleEdit(id)} style={{ cursor: "pointer" }} />
    </div>
  );
}

export default Edit
