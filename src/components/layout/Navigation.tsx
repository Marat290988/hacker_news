import styles from "./Navigation.module.css";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <header className={styles.header}>
      <Link to="/">
        <div className={styles.logo}>
          <NewspaperIcon fontSize="large" />
          Hacker News
        </div>
      </Link>
    </header>
  );
};

export default Navigation;
