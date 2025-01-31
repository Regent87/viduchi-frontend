import { AdminMenu } from "@/components/AdminMenu/AdminMenu";
import styles from "./page.module.css";
import { Security } from "@/components/Security/Security";


export default function SecurityPage() {

    return (
       <main className={'admin'}>
        <AdminMenu />
        <Security />
       </main>
    )
}