import TipsCardList from "../../../components/tips/TipsCardList";
import { tipsCards } from "../../../../dummy_data/tips";

function TipsPage() {
  return <TipsCardList cards={tipsCards} />;
}

export default TipsPage;
