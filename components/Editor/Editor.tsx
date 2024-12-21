"use client";

import { EditorProps } from "./Editor.props";
import styles from './Editor.module.css';
import { UserPanel } from "../UserPanel/UserPanel";
import { UserInfo } from "../UserInfo/UserInfo";
import { useState } from "react";
import { EditorUserMenu } from "../EditorUserMenu/EditorUserMenu";

import burgerButton from './hamburger.png';
import folderIcon from './folder.png';
import uploadMediaPhoto from './upload.png';
import chevronClose from './chevron.png';
import Image from "next/image";

export const Editor = ({params, className, ...props }: EditorProps ): JSX.Element => {


    // загрузка файлов перетаксиванием
    const [drag, setDrag] = useState(false);

    function dragStartHandler(e: any) {
        e.preventDefault();
        setDrag(true);
    }

    function dragLeaveHandler(e: any) {
        e.preventDefault();
        setDrag(false);
    }

    function onDropHandler(e: any) {
        e.preventDefault();
        let files = [...e.dataTransfer.files];
        console.log(files);

        setDrag(false);
    }

    const [isShown, setIsShown] = useState(false);
    const [isUploadMediaOpen, setIsUploadMediaOpen] = useState(false);
    
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
        <li onClick={() => setIsUploadMediaOpen(!isUploadMediaOpen)}>
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


        {
    isUploadMediaOpen && (
        <div className={styles.uploadMedia}>
<div className={styles.uploadFile}>
<button className={styles.uploadButton}>Импорт медиа</button>
</div>
<div
onDragStart = {(e: any) => dragStartHandler(e)}
onDragLeave = {(e: any) => dragLeaveHandler(e)}
onDragOver={(e: any) => dragStartHandler(e)}
onDrop = {(e: any) => onDropHandler(e)}
className={styles.dragMedia}>
<Image src={uploadMediaPhoto} alt="upload media" />
{
    drag ? <p>Отпустите файлы <br /> чтобы загрузить</p> : <p>Перетащите медиафайл <br /> для импорта</p>
}

</div>
<div
onClick={() => setIsUploadMediaOpen(false)}
className={styles.closeMediaMenu}>
<Image src={chevronClose} alt="close" />
</div>

</div>
    )
}





        </>
    )
}