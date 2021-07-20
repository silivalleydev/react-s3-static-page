import React from "react";

const Presenter = (props) => {

  const {
    history
  } = props;

  return (
    <div>
      <div>
        <div>
          Login
        </div>
        <div>
          <input />          
        </div>
        <div>
          <input />          
        </div>
        <div>
          <button>Sign In</button>
        </div>
        <div>
          <button onClick={() => history.push("/signUp")}>Sign Up</button>
        </div>
      </div>
    </div>
  );
};

export default Presenter;
