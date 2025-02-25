import styles from './app.module.css'
import Header from './components/Header/Header.jsx'
import Main from './components/Main/Main.jsx'

function App() {

  return (
    <div className={styles.App}>
      <Header/>
      <Main/>
    </div>
  )
}

export default App
