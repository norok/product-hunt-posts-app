import { Header, Tabs, Posts } from "./components";
import styles from "./App.module.scss";

function App() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <Tabs />
        <Posts />
      </main>
    </>
  )
}

export default App
