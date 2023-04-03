import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";
import { IoSearch, IoAddCircle } from "react-icons/io5";
import classes from "./ProgramCardList.module.css";
import { Link } from "react-router-dom";

function ProgramCardList({ cards }) {
  const [searchTerm, setSearchTerm] = useState("");
  const filteredCards = cards.filter((card) =>
    card.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const navigate = useNavigate();

  function onCreateHandler() {
    navigate("/dashboard/program/create");
  }

  return (
    <div className={classes.cardList}>
      <div className={classes.topContent}>
        <div className={classes.searchBar}>
          <div className={classes.searchIcon}>
            <IoSearch />
          </div>
          <input
            className={classes.searchInput}
            type="text"
            placeholder="Cari program"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>
        <div className={classes.totalCount}>
          {filteredCards.length} {filteredCards.length === 1 ? "item" : "items"}
        </div>
      </div>
      <div className={classes.cardContainer}>
        {filteredCards.map((card) => (
          <Link to={`${card.id}`} key={card.id} className={classes.cardLink}>
            <div className={classes.card} key={card.id}>
              <div className={classes.cardContent}>
                <div className={classes.title}>{card.title}</div>
                <div className={classes.description}>
                  {card.ctgList.join(", ")}
                </div>
                <div
                  className={classes.other}
                >{`${card.workouts.length} Hari`}</div>
              </div>
              <div className={classes.cardAction}>
                <FiChevronRight style={{ color: "#2b2b2b" }} />
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className={classes.buttonContainer}>
        <button className={classes.addButton} onClick={onCreateHandler}>
          <IoAddCircle className={classes.addIcon} size={20} />
          Tambah Program
        </button>
      </div>
    </div>
  );
}

export default ProgramCardList;
