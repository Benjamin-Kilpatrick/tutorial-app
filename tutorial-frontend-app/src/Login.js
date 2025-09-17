// https://dev.to/miracool/how-to-manage-user-authentication-with-react-js-3ic5
//



import { useState } from "react";
import { useAuth } from "./AuthProvider.js";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  const auth = useAuth();
  const navigate = useNavigate();

  const handleSubmitEvent = (e) => {
    e.preventDefault();
    if (input.username !== "" && input.password !== "") {
      auth.loginAction(input);
    }
    else{
      alert("please provide a valid input");
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
    <form onSubmit={handleSubmitEvent}>
      <div className="form_control">
        <label htmlFor="user-name">User Name:</label>
        <input
          type="text"
          id="user-name"
          name="username"
          aria-describedby="user-email"
          aria-invalid="false"
          onChange={handleInput}
        />
        <div id="user-name" className="sr-only">
          Please enter a valid username. It must contain at least 6 characters.
        </div>
      </div>
      <div className="form_control">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          aria-describedby="user-password"
          aria-invalid="false"
          onChange={handleInput}
        />
        <div id="user-password" className="sr-only">
          your password should be more than 6 character
        </div>
      </div>
      <button className="btn-submit">Submit</button>
    </form>
    <p>
	  Don't have an account?
	  <button onClick={e => navigate("/create-account")}>Create Account</button>
    </p>
    </>
  );
};

export default Login;
