import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Input from "./Input";
import classes from "./LoginForm.module.css";
import AuthContext from "../../../store/auth-context";
import Cookies from "js-cookie";
import axios from "axios";

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

  async function onSubmitHandler(event) {
    event.preventDefault();

    if (email.length > 0 && password.length > 0) {
      try {
        const response = await axios.post("http://178.128.103.166/api/login", {
          email: email,
          password: password,
        });

        const token = response.data.data.token;
        Cookies.set("auth", token);
        authCtx.login(token);
        navigate("/dashboard");

      } catch (error) {
        // Handle error
        console.error(error);
      }
    } else {
      console.log("Error");
    }
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
