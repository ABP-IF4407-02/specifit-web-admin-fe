import LoginForm from "../../components/login/LoginForm";
import classes from "./LoginPage.module.css";
import specifitLogo from "../../assets/specifit-logo-login.png"

function LoginPage() {
  return (
    <div className={classes.pageContainer}>
      <img className={classes.logoImage} src={specifitLogo} alt="Specifit Logo"></img>
      <LoginForm />
    </div>
  );
}

export default LoginPage;
