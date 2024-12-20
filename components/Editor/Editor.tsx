import { EditorProps } from "./Editor.props";
import styles from './Editor.module.css';
import { UserPanel } from "../UserPanel/UserPanel";
import { UserInfo } from "../UserInfo/UserInfo";

export const Editor = ({params, className, ...props }: EditorProps ): JSX.Element => {


    return (

        <>
        <div className={styles.editor}>

       
        <aside className={styles.leftMenu}>
<nav>
    <ul>Menu 1</ul>
</nav>
        </aside>

        <div className={styles.header}>
        <span className={styles.logo}>
VIDUCHI
        </span>

    
    <span className={styles.name}>ПРоект 1</span>

   <div className={styles.profile}>
   <UserPanel />
   <UserInfo />
   </div>
       
   
    

        </div>
       

        </div>
        </>
    )
}