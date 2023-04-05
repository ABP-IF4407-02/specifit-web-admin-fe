import ProgramForm from "../../../components/program/ProgramForm";
import { useParams } from "react-router-dom";

function EditProgram() {
  const { id } = useParams();
  return <ProgramForm id={id} />;
}

export default EditProgram;
