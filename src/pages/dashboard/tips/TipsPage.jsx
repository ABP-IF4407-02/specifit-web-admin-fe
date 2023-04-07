import TipsCardList from "../../../components/tips/TipsCardList";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../../../store/auth-context";
import axios from "axios";
import LoadingSpinner from "../../../components/ui/LoadingSpinner";

function TipsPage() {
  const [tipsCards, setTipsCards] = useState(null);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    async function getTips() {
      const token = authCtx.token;
      try {
        const response = await axios.get("http://178.128.103.166/api/tips", {
          headers: {
            Authorization: `Bearer ${token}`, // Include the Authorization header with the Bearer token
          },
        });
        setTipsCards(response.data.data.data);
      } catch (error) {
        // Handle error
        console.error(error);
      }
    }
    getTips();
  }, []);
  return tipsCards ? <TipsCardList cards={tipsCards} /> : <LoadingSpinner />;
}

export default TipsPage;
