import { workoutCards } from "../../../../dummy_data/workout";
import WorkoutCardList from "../../../components/workout/WorkoutCardList";

function WorkoutPage() {
  return <WorkoutCardList cards={workoutCards} />;
}

export default WorkoutPage;
