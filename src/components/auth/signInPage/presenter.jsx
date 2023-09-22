import React from "react";

const Presenter = (props) => {

  const {
    history,
    email,
    password,
    setEmail,
    setPassword,
    handleSignIn
  } = props;

  return (
    <div>
      <div>
        <div>
          Login
        </div>
        <div>
          <input 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />          
        </div>
        <div>
          <input 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />                 
        </div>
        <div>
          <button onClick={handleSignIn}>Sign In</button>
        </div>
        <div>
          <button onClick={() => history.push("/signUp")}>Sign Up</button>
        </div>
      </div>
    </div>
  );
};

export default Presenter;
