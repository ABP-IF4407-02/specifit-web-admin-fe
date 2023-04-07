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

    if (
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) &&
      password.length > 5
    ) {
      try {
        const response = await axios.post("http://178.128.103.166/api/login", {
          email: email,
          password: password,
        });

        if (response.data.data.user.role == 2) {
          const token = response.data.data.token;
          Cookies.set("auth", token);
          authCtx.login(token);
          navigate("/dashboard");
        } else {
          alert("Silahkan login dengan akun admin.");
        }
      } catch (error) {
        alert(
          error &&
            error.response &&
            error.response.data &&
            error.response.data.data &&
            error.response.data.data.error
        );
      }
    } else {
      alert("Masukkan email dan password yang valid.");
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
