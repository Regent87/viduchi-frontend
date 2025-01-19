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
import useStore from "../../store/store";
import useTimelineEvents from "../../hooks/use-timeline-events";

import MenuIcon from './hamburger.svg';
import FolderIcon from './folder.svg';

export const SubtitlesEditor =  ({project, className, ...props }: SubtitlesEditorProps ) => {

    const [projectName, setProjectName] = useState("");
      const [isUploadMediaOpen, setIsUploadMediaOpen] = useState(true);
      const [isShown, setIsShown] = useState(false);

      const closeDropdown = () => {
        setIsShown(false);
      };


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
                    <p>Медиа</p>
                    </span>
                   
                  </li>
                </ul>
              </nav>
            </aside>
            <div className={styles.headerWrapper}>
              <div className={styles.header}>
                <span className={styles.logo}>VIDUCHI</span>
    
                <input
                  onChange={(e) => setProjectName(e.target.value)}
                  type="text"
                  value={projectName}
                  className={styles.name}
                />
    
                <div className={styles.profile}>
                  <UserPanel />
                  <UserInfo onClick={() => setIsShown(!isShown)} />
                </div>
                {isShown && <EditorUserMenu closeDropdown={closeDropdown} />}
              </div>
{/*     
              {playerRef && !isBottomMenuUploadVideoOpen && <Timeline />}
     */}
    
    
    
            </div>
          </div>
    
          <div className={styles.videoEditorWindow}>
            <div className={styles.videoPlayer}>
              {/* <Scene stateManager={stateManager} /> */}
              <Player />
    
              {/* {playerRef && !isBottomMenuUploadVideoOpen && <PlayNavigation />} */}
    
    
            </div>
    
          
          </div>
          
    
  
   
    
 
           
    
    
    
         
    
      
         
    
     
        </>
      );

}