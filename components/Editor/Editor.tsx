"use client";

import { EditorProps } from "./Editor.props";
import styles from './Editor.module.css';
import { UserPanel } from "../UserPanel/UserPanel";
import { UserInfo } from "../UserInfo/UserInfo";
import { ChangeEvent, useEffect, useState, useRef } from "react";
import { EditorUserMenu } from "../EditorUserMenu/EditorUserMenu";

import burgerButton from './hamburger.png';
import FolderIcon from './folder.svg';
import uploadMediaPhoto from './upload.png';
import ChevronCloseIcon from './chevron.svg';
import Image from "next/image";
import { UploadButton } from "../UploadButton/UploadButton";
import cubeIcon from './cube.png';
import CropIcon from './crop.svg';
import EllypsisIcon from './ellypsis.svg';
import PlayIcon from './play.svg';
import PreviousIcon from './previous.svg';
import NextIcon from './next.svg';
import RefreshIcon from './refresh.svg';
import RefreshForwardIcon from './refreshForward.svg';
import SubtitlesIcon from './cc.svg';
import MaximiseIcon from './maximise.svg';
import soundIcon from './sound.png';
import HideVIdeoIcon from './chevronDown.svg';
import kadryVideoImg from './kadryvideo.png';
import addMediaIcon from './add_media.png';
import deleteMediaIcon from './delete_media.png';
import { VideoItemCard } from "../VideoItemCard/VideoItemCard";
import { AudioItemCard } from "../AudioItemCard/AudioItemCard";

import { getProjectById } from "@/api/server/projects";

// Remotion videl player
import { Track, Item } from "@/types/videoEditor..types";
import { AbsoluteFill, useCurrentFrame, Video, Sequence, OffthreadVideo } from "remotion";
import { Player } from "@remotion/player";
import { ProjectForm } from "../ProjectForm/ProjectForm";

import { MyComposition } from "../MyComposition/MyComposition";


export const Editor = ({project, className, ...props }: EditorProps ): JSX.Element => {

   console.log("Project: ")
   console.log(project)

   const [videoUrl, setVideoUrl] = useState<string | null>(null);

  // const frame = useCurrentFrame();

  //  const [project, setProject] = useState(project);

 

//    delete media file form state 
function deleteMediaFile(url: any) {
    const new_mediafiles = uploadedFiles.filter((item: any) => item.url !== url);
}

    // // showing adding and deleting media file elements
    // const [isMediaFileDeleteMenuOpen, setIsMediaFileDeleteMenuOpen] = useState(false);

    // function handleShowAddDeleteMediaFile() {
    //     setIsMediaFileDeleteMenuOpen(true);
    // }

    // handle file upload
const fileInputField: any = useRef(null);

    const [projectName, setProjectName] = useState('');

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
    const [isUploadMediaOpen, setIsUploadMediaOpen] = useState(true);
    // нижнее меню загрузки видео
    const [isBottomMenuUploadVideoOpen, setIsBottomMenuUploadVideoOpen] = useState(true)
    
        const closeDropdown = () => {
            setIsShown(false);
        };



        useEffect(() => {
            setProjectName(project.title);
            setVideoUrl("https://api-dev.viduchi.ru/files/viduchi-docker/6a16fed5-ac15-431a-ba5e-6eb07753c87a?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=82PpmDyMI2KniS4DuqVB%2F20241230%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20241230T153520Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=ad70d628cc981fa2f84ee4d05f37b7d788dc5adeb0fa22a6b07e98cdcadb76cd");
        }, [])


    return (

        <>
        <div className={styles.editor}> 
        <aside className={styles.leftMenu}>
           <Image src={burgerButton} alt="main menu" />
<nav>
    <ul>
        <li onClick={() => setIsUploadMediaOpen(!isUploadMediaOpen)}>
            <FolderIcon />
           <p>Медиа</p>
        </li>
    </ul>
</nav>
        </aside>

        <div className={styles.header}>
        <span className={styles.logo}>
VIDUCHI


        </span>

    <input
    onChange={(e: any) => setProjectName(e.target.value)}
    type='text' value={projectName} className={styles.name} />

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

{/* <ProjectForm project={project} /> */}
   
    <div className={styles.videoPlayer}>

    {videoUrl === null ? null : (
        <Player
        style={{
            width: '100%',
            height: '100%'
        }}
          component={MyComposition}
          durationInFrames={120}
          compositionWidth={1920}
          compositionHeight={1080}
          fps={30}
          inputProps={{videoURL: videoUrl}}
          controls
        />
      )}
    
</div>

<div className={styles.videoTopMenu}>
        <Image src={cubeIcon} alt="cube icon" />
        <CropIcon />
        <EllypsisIcon />
    </div>

    <div className={styles.videoBottomMenu}>
    <span className={styles.icons}>
         <PreviousIcon />
         </span>
         <span className={styles.icons}>
         <RefreshIcon />
         </span>
         <span className={styles.icons}>
         <PlayIcon />
         </span>
         <span className={styles.icons}>
        <RefreshForwardIcon />
        </span>
        <span className={styles.icons}>
        <NextIcon />
        </span>
        
       <span className={styles.maximise}>
       <MaximiseIcon />
       </span>
     
      
      
        </div>

    
</div>
{/* video editor */}

{/* right menu with subtitles */}
<div className={styles.navRight}>
<nav>
    <ul>
        <li>
          <SubtitlesIcon />
        <p>Субтитры</p>
        </li>
    </ul>
</nav>
</div>


        {
    isUploadMediaOpen && (
        <div className={styles.uploadMedia}>



<div className={styles.uploadFile}>

<input
style={{ display: 'none' }}
id ="file-upload" type='file' onChange={handleFileChange} ref={fileInputField}/>

<label htmlFor='file' className='custom-file-upload' onClick={() => fileInputField?.current?.click()}>
<button className={styles.uploadButton}>Импорт медиа</button>
        </label>

           
          


{/* <UploadButton
accept="video/mp4,video/x-m4v,video/*"
className={styles.uploadButton}
onChange={handleFileChange}
/> */}


    {
        uploadedFiles.length > 0 && uploadedFiles.map((uploadedFile: any) => {
console.log(uploadedFile)
            if (uploadedFile.type === "video/mp4") {

                return <VideoItemCard videoItem={uploadedFile} onDelete={deleteMediaFile} />
               
       

        }

        if (uploadedFile.type === "audio/mpeg") {
            return <AudioItemCard audioItem={uploadedFile} />
        }
            // } else if {
            //     return (<div>{uploadedFile.name}</div>)
            // } else {
            //     return (<div>{uploadedFile.name}</div>)
            // }
       
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
<div className={styles.closeMediaMenuDiv}>
<ChevronCloseIcon />
</div>

</div>

</div>
    )
}


{
    isBottomMenuUploadVideoOpen && <><div
    onDragStart = {(e: any) => dragStartHandler(e)}
onDragLeave = {(e: any) => dragLeaveHandler(e)}
onDragOver={(e: any) => dragStartHandler(e)}
onDrop = {(e: any) => onDropHandler(e)}
    className={styles.bottomVideoUpload}>
<Image src={kadryVideoImg} alt="kadry video" />
{ drag ? <p>Отпустите файл</p> : <p>Перетащите сюда видео</p> }
</div>


<div className={styles.hideVideoButton} onClick={() => setIsBottomMenuUploadVideoOpen(!isBottomMenuUploadVideoOpen)}>
    <div className={styles.hideVideoButtonDiv}>
    <HideVIdeoIcon />
    </div>


</div>



{/* <Image 
onClick={() => setIsBottomMenuUploadVideoOpen(!isBottomMenuUploadVideoOpen)}
className={styles.hideVideoButton} src={hideVIdeoIcon} alt="Hide ideo upload menu"/> */}


</>
}

        </>


    )
}