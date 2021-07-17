import React from "react";

const Presenter = (props) => {
    const { handleGet, handlePost, handleDelete, handleUpdate } = props;
  return (
    <div>
      <button onClick={handleGet}>getquery</button>
      <button onClick={handlePost}>post</button>
      <button onClick={handleDelete}>delete</button>
      <button onClick={handleUpdate}>update</button>
    </div>
  );
};

export default Presenter;
