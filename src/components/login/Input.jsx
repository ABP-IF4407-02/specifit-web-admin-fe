import { useState } from "react";

import { IoEyeSharp, IoEyeOffSharp } from "react-icons/io5";
import classes from "./Input.module.css";
import iconstyle from "../ui/IconStyle.module.css";

function Input({ type, id, name, placeholder, isPassword, onChange }) {
  const [showPassword, setShowPassword] = useState(false);

  function handleTogglePassword() {
    setShowPassword(!showPassword);
  }

  const inputClasses = [classes.input];

  if (isPassword) {
    inputClasses.push(classes.password);
  }

  return (
    <div className={classes.inputContainer}>
      <input
        className={inputClasses.join(" ")}
        type={isPassword && showPassword ? "text" : type}
        id={id}
        name={name}
        required
        placeholder={placeholder}
        onChange={onChange}
      ></input>
      {isPassword && (
        <button
          className={classes.eyeButton}
          onClick={handleTogglePassword}
          type="button"
        >
          {showPassword ? <IoEyeSharp className={iconstyle.iconSize} /> : <IoEyeOffSharp className={iconstyle.iconSize} />}
        </button>
      )}
    </div>
  );
}

export default Input;
