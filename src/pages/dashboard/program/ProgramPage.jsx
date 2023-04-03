import { programCards } from "../../../../dummy_data/program";
import ProgramCardList from "../../../components/program/ProgramCardList";

function ProgramPage() {
  return <ProgramCardList cards={programCards} />;
}

export default ProgramPage;
