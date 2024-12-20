"use client";

import { EditorProps } from "./Editor.props";
import styles from './Editor.module.css';
import { UserPanel } from "../UserPanel/UserPanel";
import { UserInfo } from "../UserInfo/UserInfo";
import { useState } from "react";
import { EditorUserMenu } from "../EditorUserMenu/EditorUserMenu";

import burgerButton from './hamburger.png';
import folderIcon from './folder.png';
import Image from "next/image";

export const Editor = ({params, className, ...props }: EditorProps ): JSX.Element => {


    const [isShown, setIsShown] = useState(false);
    
        const closeDropdown = () => {
            setIsShown(false);
        };



    return (

        <>
        <div className={styles.editor}>

       
        <aside className={styles.leftMenu}>
           <Image src={burgerButton} alt="main menu" />
<nav>
    <ul>
        <li>
            <Image src={folderIcon} alt="folder" />
           <p>Медиа</p>
        </li>
    </ul>
</nav>
        </aside>

        <div className={styles.header}>
        <span className={styles.logo}>
VIDUCHI
        </span>

    
    <span className={styles.name}>ПРоект 1</span>

   <div className={styles.profile}>
   <UserPanel />
   <UserInfo onClick={() => setIsShown(!isShown)} />
   </div>
   {   
          isShown && (
            <EditorUserMenu closeDropdown={closeDropdown} />
          )
                
            }
       
   
    

        </div>
       

        </div>
        </>
    )
}