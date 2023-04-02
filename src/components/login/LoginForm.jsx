import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Input from "./Input";
import classes from "./LoginForm.module.css";
import AuthContext from "../../../store/auth-context";
import Cookies from "js-cookie";

function LoginForm() {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function emailChangeHandler(event) {
    setEmail(event.target.value);
  }

  function passwordChangeHandler(event) {
    setPassword(event.target.value);
  }

  function onSubmitHandler(event) {
    event.preventDefault();

    // Sementara
    if (email.length > 8 && password.length > 8) {
      // Dummy Token
      const token = "X0X0"

      Cookies.set("auth", token);
      authCtx.login(token);
      navigate("/dashboard");
    } else {
      console.log(email.length, password.length);
      console.log("Masukin yg bener");
    }
    
    /*
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Login failed.");
      }

      const data = await response.json();
      const token = data.token;

      // set the httpOnly cookie
      Cookies.set("auth", token, { httpOnly: true });

      // update the auth context
      authCtx.login(token);

      navigate("/dashboard");
    } catch (error) {
      alert(error.message);
    }
    */
  }

  return (
    <form onSubmit={onSubmitHandler} className={classes.loginContainer}>
      <h4 className={classes.loginTitle}>Login</h4>
      <div className={classes.formWrapper}>
        <div className={classes.inputField}>
          <label htmlFor="email" className={classes.labelName}>
            Email
          </label>
          <Input
            type="text"
            id="email"
            name="email"
            placeholder="Masukkan email"
            value={email}
            onChange={emailChangeHandler}
          ></Input>
        </div>
        <div className={classes.inputField}>
          <label htmlFor="password" className={classes.labelName}>
            Password
          </label>
          <Input
            type="password"
            id="password"
            name="password"
            placeholder="Masukkan password"
            isPassword={true}
            value={password}
            onChange={passwordChangeHandler}
          ></Input>
        </div>
        <button type="submit" className={classes.submitButton}>
          Login
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
