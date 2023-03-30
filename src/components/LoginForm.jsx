import { useNavigate } from 'react-router-dom';
import Input from "./Input";
import classes from "./LoginForm.module.css";

function LoginForm() {
  const navigate = useNavigate();

  function onSubmitHandler(event) {
    event.preventDefault();
    // Login Logic
    navigate("/dashboard");
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
