import NavBar from "../Nav/NavBar";
import styles from "./header.module.css";

const Header = () => {
  return (
    <header className={styles.headerContainer}>
      <img
        className={styles.logo}
        src="/img/flexxusImg.png"
        alt="Logo de Flexxus"
      />
      <NavBar />
    </header>
  );
};

export default Header;
