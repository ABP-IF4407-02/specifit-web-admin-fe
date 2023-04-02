import { TailSpin } from "react-loader-spinner";
import classes from "./Loading.module.css";

function LoadingSpinner() {
  return (
    <div className={classes.loadingCircleContainer}>
      <TailSpin
        height="80"
        width="80"
        color="#FF810D"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
}

export default LoadingSpinner;
