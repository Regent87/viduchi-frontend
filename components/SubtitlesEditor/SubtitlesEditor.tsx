"use client";

import { SubtitlesEditorProps } from "./SubtitlesEditor.props";
import styles from './SubtitlesEditor.module.css';
import { useState, useEffect } from "react";

import { UserPanel } from "@/components/UserPanel/UserPanel";
import { UserInfo } from "@/components/UserInfo/UserInfo";
import { EditorUserMenu } from "@/components/EditorUserMenu/EditorUserMenu";
import Timeline from "../../components/timeline";
import { generateId } from "@designcombo/timeline";
import { DEFAULT_FONT } from "../../constants/font";
import Player from "../../components/player/player";
import PlayNavigation from "@/components/PlayNavigation/PlayNavigation";
import useStore from "../../store/store";
import useTimelineEvents from "../../hooks/use-timeline-events";

import MenuIcon from './hamburger.svg';
import FolderIcon from './folder.svg';
import { Router } from "next/router";
import { AddStepModal } from "../AddStepModal/AddStepModal";
import { P } from "../P/P";

export const SubtitlesEditor =  ({project, className, ...props }: SubtitlesEditorProps ) => {

    const [projectName, setProjectName] = useState("");
      const [isUploadMediaOpen, setIsUploadMediaOpen] = useState(true);
      const [isShown, setIsShown] = useState(false);

      const [isAddStepShown, setIsAddStepShown] = useState(false);

      // субтитлы и шаги
      const [subtitles, setSubtitles] = useState<string[]>([]);
      const [steps, setSteps] = useState([]);
      const [toggle, setToggle] = useState(false);

      useEffect(() => {
        setSubtitles([
          'Тут первый субтитл по видосу',
          'Второй субтитл по видосу новый',
          'Третий субтитл по видосу',
          'Четвертый субтитл по видосу'
        ])
      }, [])

      const closeDropdown = () => {
        setIsShown(false);
        setIsAddStepShown(false);
      };

      const { playerRef, setState } = useStore();
      useTimelineEvents();


    useEffect(() => {
        setProjectName(project.title);
    }, [])


    return (
        <>
          <div className={styles.editor}>
        
            <aside className={styles.leftMenu}>
              <MenuIcon />
            
    
              <nav>
                <ul>
                  <li
                  // onClick={() => setIsUploadMediaOpen(!isUploadMediaOpen)}
                  >
                    <span
                    // className={ isUploadMediaOpen ? styles.white : styles.gray + " hovered"}
                    >
                     <FolderIcon /> 
                    <p>Видео</p>
                    </span>
                   
                  </li>
                </ul>
              </nav>
            </aside>

           

            <div className={styles.headerWrapper}>
              <div className={styles.header}>
                <span className={styles.logo}>VIDUCHI</span>
    
  <label>
    <span
    onClick={() => console.log("back to project")}
    className={styles.projectname}>
    { project.title }
    </span> &nbsp;
     /&nbsp; Инструкция 1
  {/* <input
                  onChange={(e) => setProjectName(e.target.value)}
                  type="text"
                  value={projectName}
                  className={styles.name}
                /> */}
  </label>
               
    
                <div className={styles.profile}>
                  <UserPanel />
                  <UserInfo onClick={() => setIsShown(!isShown)} />
                </div>


                {isShown && <EditorUserMenu closeDropdown={closeDropdown} />}
              </div>

    
    
    
            </div>
          </div>
    



          <div className={styles.videoEditorWindow}>
            <div className={styles.videoPlayer}>
              {/* <Scene stateManager={stateManager} /> */}
              <Player />
    <div className={styles.player_buttons}>
    {playerRef && <PlayNavigation />}
    </div>
          
   
   <div className={styles.gen_subtitles}>
   <button className={styles.generate_button} >Опубликовать инструкцию</button>
   </div>
    

            </div>
    


   
       
          
          </div>
          
    
  
          <div className={styles.steps}>
            <div id="create_steps" className={styles.create_steps}>
                <p>Добавьте шаги инструкции <br /> вручную <br /> или <br /> ИИ сгенерирует их </p>
                <button
                onClick={() => setIsAddStepShown(true)}
                className={styles.add_button} >Добавить шаги</button>
                <button className={styles.generate_button}>Сгенерировать шаги</button>
            </div>
    
</div>


<div className={styles.subtitles}>
  
  {
    subtitles.map((subtitle: string, idx) => (
      <div >
 { toggle ? <p onDoubleClick={() => setToggle(false)} className={styles.subtitle} key={idx}>{subtitle}</p> : <input type="text" value={subtitle} key={idx} />  }

      </div>
     
    ))
  }
 
 


</div>



{
  isAddStepShown && <AddStepModal isOpen={isAddStepShown} onClose={closeDropdown} />
}
     
        </>
      );

}