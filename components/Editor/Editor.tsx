"use client";

import { EditorProps } from "./Editor.props";
import styles from './Editor.module.css';
import { UserPanel } from "../UserPanel/UserPanel";
import { UserInfo } from "../UserInfo/UserInfo";
import { ChangeEvent, useState } from "react";
import { EditorUserMenu } from "../EditorUserMenu/EditorUserMenu";

import burgerButton from './hamburger.png';
import folderIcon from './folder.png';
import uploadMediaPhoto from './upload.png';
import chevronClose from './chevron.png';
import Image from "next/image";
import { UploadButton } from "../UploadButton/UploadButton";
import cubeIcon from './cube.png';
import cropIcon from './crop.png';
import ellypsisIcon from './ellypsis.png';
import playIcon from './play.png';
import previousIcon from './previous.png';
import nextIcon from './next.png';
import refreshIcon from './refresh.png';
import refreshForwardIcon from './refreshforward.png';


export const Editor = ({params, className, ...props }: EditorProps ): JSX.Element => {


    const [videoFilePath, setVideoFilePath] = useState(''); 
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file: any = event.target.files?.[0];
        if (!file) return;
        file.url = URL.createObjectURL(file);
        setUploadedFiles([...uploadedFiles, file]);
      //  store.addVideoResource(URL.createObjectURL(file));
      };

    const [uploadedFiles, setUploadedFiles] = useState<any>([]);
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
        let file: any = e.dataTransfer.files?.[0];
        if (!file) return;
        file.url = URL.createObjectURL(file);
        console.log(file)
      //  let files = [...e.target.files];
     //   console.log(files);
        // добавить файлы
        // вывести файлы в стейт когда они будут
        //  виедо выводить с видео тэгом
        // https://www.w3schools.com/tags/tryit.asp?filename=tryhtml5_video
       // setUploadedFiles(files[0]);
        setUploadedFiles([...uploadedFiles, file]);
// setVideoFilePath(URL.createObjectURL(file));
      //  console.log(uploadedFiles)
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

    <input type='text' value={'Проект 1'} className={styles.name} />

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
        {/* VIdeo editor */}
<div className={styles.videoEditorWindow}>


   
    <div className={styles.videoPlayer}>
    
</div>
<div className={styles.videoTopMenu}>
        <Image src={cubeIcon} alt="cube icon" />
        <Image src={cropIcon} alt="cube icon" />
        <Image src={ellypsisIcon} alt="cube icon" />
    </div>

    <div className={styles.videoBottomMenu}>
         <Image src={previousIcon}  alt='previous' />
         <Image src={refreshIcon}  alt='refresh' />
        <Image src={playIcon}  alt='play' />
        <Image src={refreshForwardIcon}  alt='refresh forward' />
        <Image src={nextIcon}  alt='next' />
        </div>

    
</div>
{/* video editor */}


        {
    isUploadMediaOpen && (
        <div className={styles.uploadMedia}>



<div className={styles.uploadFile}>
<button className={styles.uploadButton}>Импорт медиа</button>

{/* <UploadButton
accept="video/mp4,video/x-m4v,video/*"
className={styles.uploadButton}
onChange={handleFileChange}
/> */}


    {
        uploadedFiles.length > 0 && uploadedFiles.map((uploadedFile: any) => {

            return (
                <div className={styles.videoItem}>
                <video>
          <source src={uploadedFile.url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <p>{uploadedFile.name}</p>
        </div>
            )
          })

    }
      
          
        
    
    

       

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