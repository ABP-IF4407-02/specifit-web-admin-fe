import { useState } from "react";
import { FiSearch, FiPlus, FiChevronRight } from "react-icons/fi";
import classes from "./CardList.module.css";
import { Link } from "react-router-dom";

function CardList({ cards }) {
  const [searchTerm, setSearchTerm] = useState("");
  const filteredCards = cards.filter((card) =>
    card.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={classes.cardList}>
      <div className={classes.topContent}>
        <div className={classes.searchBar}>
          <div className={classes.searchIcon}>
            <FiSearch />
          </div>
          <input
            className={classes.searchInput}
            type="text"
            placeholder="Cari tips"
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
          <Link
            to={`${card.id}`}
            key={card.id}
            className={classes.cardLink}
          >
            <div className={classes.card} key={card.id}>
              <div className={classes.cardContent}>
                <div className={classes.title}>{card.title}</div>
                <div className={classes.description}>{card.author}</div>
              </div>
              <div className={classes.cardAction}>
                <FiChevronRight />
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className={classes.buttonContainer}>
        <button className={classes.addButton}>
          <FiPlus className={classes.addIcon} />
          Tambah Tips
        </button>
      </div>
    </div>
  );
}

export default CardList;
