import { IoBarbellOutline, IoBulbOutline } from "react-icons/io5";
import { MdChevronRight } from "react-icons/md";
import classes from "./NavCard.module.css";
import { Link } from "react-router-dom";

function NavCard({ iconName, name, count, desc, link }) {
  let icon;
  if (iconName === "barbel") {
    icon = <IoBarbellOutline size={20} />;
  } else if (iconName === "tips") {
    icon = <IoBulbOutline size={20} />;
  }

  return (
    <Link to={link} className={classes.cardContainer}>
      <div className={classes.contentContainer}>
        <div className={classes.logoContainer}>{icon}</div>
        <div className={classes.cardContent}>
          <h1 className={classes.cardCount}>{count}</h1>
          <h2 className={classes.cardName}>{name}</h2>
          <p className={classes.cardDesc}>{desc}</p>
        </div>
      </div>
      <div className={classes.arrowIcon}>
        <MdChevronRight />
      </div>
    </Link>
  );
}

export default NavCard;
