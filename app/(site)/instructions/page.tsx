import styles from "./page.module.css";
import { Sidebar } from "@/layout/Sidebar/Sidebar";
import { Header } from "@/layout/Header/Header";

export default function InstructionsPage() {
  return (
    <>
      <div className={styles.page}>
        <div className={styles.sidebar}>
          <Sidebar/>
        </div>
        <div className={styles.header}>
          <Header/>
        </div>
        <main className={styles.body}>
          <h1>Instructions</h1>
        </main>
      </div>
    </>
  );
}
