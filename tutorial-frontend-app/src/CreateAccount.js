import { useState } from "react";
import { useAuth } from "./AuthProvider.js";

const CreateAccount = () => {
  const [input, setInput] = useState({
    username: "",
    password: "",
    email: ""
  });

  const [err, setErr] = useState("");

  const auth = useAuth();

  const handleSubmitEvent = async (e) => {
    setErr("");
    e.preventDefault();
    // !TODO: beter validation
    if (input.username === "" || input.password === "" || input.email === ""){
	alert("All fields must be filled");
	return;
    }
    const response = await fetch("http://localhost:3002/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });
    const response_json = await response.json();
    if (response_json['message'] === 'Registration Successful') {
      auth.loginAction({username: input.username, password:input.password});
      return;
    }
    else if(response_json['err']){
      setErr(response_json['err']);
    }
    else{
      setErr("please provide a valid input");
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
    <form onSubmit={handleSubmitEvent}>
      {
	      err !== "" ? <p className="error-message">{err}</p>: <></>
      }
      <div className="form_control">
        <label htmlFor="user-email">Email:</label>
        <input
          type="email"
          id="user-email"
          name="email"
          placeholder="example@yahoo.com"
          aria-describedby="user-email"
          aria-invalid="false"
          onChange={handleInput}
        />
        <div id="user-email" className="sr-only">
          Please enter a valid username. It must contain at least 6 characters.
        </div>
      </div>
      <div className="form_control">
	  <label htmlFor="user-name">User Name:</label>
	  <input
	    type="text"
	    id="username"
	    name="username"
	    onChange={handleInput}
	  />
	  <div id="user-name" className="sr-only">
	    Please enter a valid user name
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
  );
};

export default CreateAccount;

