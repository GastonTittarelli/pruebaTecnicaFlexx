import styles from "./navBar.module.css";

const NavBar = () => {
  return (
    <nav className={styles.navBarContainer}>
      <p className={styles.anchors}>
        Usuarios / <strong>Listado de usuarios</strong>
      </p>
    </nav>
    // Entiendo que no se hace de esta manera y que puede tomarse como una mala práctica. Lo coloque de esta forma, ya que, no tiene una funcionalidad para este caso práctico y quería mantener la vista lo más fiel posible al diseño original.
  );
};

export default NavBar;
