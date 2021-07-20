import React from "react";

const Presenter = (props) => {

  const {
    email,
    password,
    setEmail,
    setPassword,
    handleSignUp
  } = props;

  return (
    <div>
      <div>
        Email:
        <input 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        Password:
        <input 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleSignUp}>회원가입</button>
    </div>
  );
};

export default Presenter;
