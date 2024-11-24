import styles from "./page.module.css";
import { Sidebar } from "@/layout/Sidebar/Sidebar";
import { Header } from "@/layout/Header/Header";
import { MyVideos } from "@/layout/MyVideos/MyVideos";

export default function VideosPage() {
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
          <MyVideos />
        </main>
      </div>
    </>
  );
}
