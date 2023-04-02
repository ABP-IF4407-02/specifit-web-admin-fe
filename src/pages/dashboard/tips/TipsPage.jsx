import CardList from "../../../components/tips/TipsCardList";
import { tipsCards } from "../../../../dummy_data/tips";

function TipsPage() {
  return <CardList cards={tipsCards} />;
}

export default TipsPage;
