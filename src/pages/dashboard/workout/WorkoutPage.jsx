import WorkoutCardList from "../../../components/workout/WorkoutCardList";
import { useState, useContext, useEffect } from "react";
import AuthContext from "../../../../store/auth-context";
import axios from "axios";
import LoadingSpinner from "../../../components/ui/LoadingSpinner";
import { ROOT } from "../../../../config/config";

function WorkoutPage() {
  const [workoutCards, setWorkoutCards] = useState(null);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    async function getWorkouts() {
      const token = authCtx.token;
      try {
        const response = await axios.get(`${ROOT}api/workout`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setWorkoutCards(response.data.data.data);
      } catch (error) {
        alert(
          error &&
            error.response &&
            error.response.data &&
            error.response.data.data &&
            error.response.data.data.error
        );
      }
    }
    getWorkouts();
  }, []);

  return workoutCards ? (
    <WorkoutCardList cards={workoutCards} />
  ) : (
    <LoadingSpinner />
  );
}

export default WorkoutPage;
