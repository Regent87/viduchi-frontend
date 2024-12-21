import type { Metadata } from "next";
import "../globals.css";
import { ProtectedRoute } from '@/components/site/ProtectedRoute'
import styles from "./layout.module.css";
import { Sidebar } from "@/layout/Sidebar/Sidebar";
import { Header } from "@/layout/Header/Header";

// export const metadata: Metadata = {
//   title: "Editor | Viduchi Admin",
//   description: "Viduchi Admin",
// };

export default function EditorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <ProtectedRoute>
      <div className={styles.page}>
        {/* <div className={styles.sidebar}>
          <Sidebar/>
        </div>
        <div className={styles.header}>
          <Header/>
        </div> */}
        <main className={styles.body}>
          {children}
        </main>
      </div>
    //  </ProtectedRoute>
  );
}
