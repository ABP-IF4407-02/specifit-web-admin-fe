import TipsForm from "../../../components/TipsForm";
import { useParams } from "react-router-dom";

function EditTips() {
  const { id } = useParams();
  return <TipsForm id={id} />;
}

export default EditTips;
