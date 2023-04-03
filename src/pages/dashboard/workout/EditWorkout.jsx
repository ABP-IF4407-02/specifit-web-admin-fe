import WorkoutForm from "../../../components/workout/WorkoutForm";
import { useParams } from "react-router-dom";

function EditWorkout() {
  const { id } = useParams();
  return <WorkoutForm id={id} />;
}

export default EditWorkout;
