import { Header, Tabs, Posts } from "./components";
import styles from "./App.module.scss";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";

function App() {
  return (
    <Provider store={store}>
      <Header />
      <main className={styles.main} data-testid="main">
        <Tabs />
        <Posts />
      </main>
    </Provider>
  )
}

export default App
