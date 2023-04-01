import CardList from "../../../components/CardList";
import { tipsCards } from "../../../../dummy_data/tips";

function TipsPage() {
  return <CardList cards={tipsCards} />;
}

export default TipsPage;
