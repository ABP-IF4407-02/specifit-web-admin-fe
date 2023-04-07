import WorkoutCardList from "../../../components/workout/WorkoutCardList";
import { useState, useContext, useEffect } from "react";
import AuthContext from "../../../../store/auth-context";
import axios from "axios";
import LoadingSpinner from "../../../components/ui/LoadingSpinner";

function WorkoutPage() {
  const [workoutCards, setWorkoutCards] = useState(null);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    async function getWorkouts() {
      const token = authCtx.token;
      try {
        const response = await axios.get("http://178.128.103.166/api/workout", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setWorkoutCards(response.data.data.data);
      } catch (error) {
        // Handle error
        console.error(error);
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
