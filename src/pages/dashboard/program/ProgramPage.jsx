import { useState, useContext, useEffect } from "react";
import ProgramCardList from "../../../components/program/ProgramCardList";
import AuthContext from "../../../../store/auth-context";
import axios from "axios";
import LoadingSpinner from "../../../components/ui/LoadingSpinner";
import { ROOT } from "../../../../config/config";

function ProgramPage() {
  const [programCards, setProgramCards] = useState(null);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    async function getProgram() {
      const token = authCtx.token;
      try {
        const response = await axios.get(`${ROOT}api/workoutprogram`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProgramCards(response.data.data.data);
      } catch (error) {
        // Handle error
        alert(
          error &&
            error.response &&
            error.response.data &&
            error.response.data.data &&
            error.response.data.data.error
        );
      }
    }
    getProgram();
  }, []);
  return programCards ? (
    <ProgramCardList cards={programCards} />
  ) : (
    <LoadingSpinner />
  );
}

export default ProgramPage;
