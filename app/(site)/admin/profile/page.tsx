import { AdminMenu } from "@/components/AdminMenu/AdminMenu";
import styles from "./page.module.css";
import { AdminInfo } from "@/components/AdminInfo/AdminInfo";

export default function ProfilePage() {

    return (
       <main className={styles.admin}>
        <AdminMenu />
        <AdminInfo />
       </main>
    )
}