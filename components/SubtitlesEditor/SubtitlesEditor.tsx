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
import { useRouter } from 'next/navigation';
import EditIcon from "./edit.svg";
import DeleteIcon from "./delete.svg";

interface Istep {
  title: string;
  subtitles: string[];
}

export const SubtitlesEditor =  ({project, className, ...props }: SubtitlesEditorProps ) => {

    const [projectName, setProjectName] = useState("");
      const [isUploadMediaOpen, setIsUploadMediaOpen] = useState(true);
      const [isShown, setIsShown] = useState(false);

      const [isAddStepShown, setIsAddStepShown] = useState(false);

      const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);


   

      // получаем данные из двух нажатых субтитров
      const getDataFromSelectedSubtitles = (index: string) => {
        if (selectedIndexes.length < 2) {
          selectedIndexes.push(Number(index));
        const bkg: any = document.getElementById(String(index));
        
        if (bkg) {
          bkg.style.background = "blue";
          bkg.style.color = "#fff";
        }
      
        }
      }
 
      const router = useRouter();

      const goToVideoEditor = () => {
		router.push('/editor/' + project.id);
	};

      // субтитлы и шаги
      const [subtitles, setSubtitles] = useState<string[]>([]);
      const [steps, setSteps] = useState<Istep[]>([]);
      const [toggle, setToggle] = useState(true);

      const addStep = () => {
        // достать данные ндексов
        let sortedIndexes = selectedIndexes.sort(function(a, b) {
          return a - b;
        });

        const selectedSubtitles = subtitles.slice(sortedIndexes[0], sortedIndexes[1] + 1);
        const newStep: Istep = {
          title: "Назване шага",
          subtitles: selectedSubtitles
        };

        setSteps([...steps, newStep])

        console.log("steps: ", steps )
      }

      useEffect(() => {
        setSubtitles([
          'Тут первый субтитл по видосу больше текста еще тут немного',
          'Второй субтитл по видосу новый еще текста боьше и круче',
          'Третий субтитл по видосу тут еще норм текста',
          'Четвертый субтитл по видосу  еще текста побольше'
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
    onClick={goToVideoEditor}
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
             { 
             steps.length < 1 && (<div>
             <p>Добавьте шаги инструкции <br /> вручную <br /> или <br /> ИИ сгенерирует их </p>
             </div>) 
            }


             
{
steps && steps.map((step: any, idx: any) => (
<div key={idx} className={styles.singleStep}>
   <span>{idx + 1}. {step.title}</span>
    <span> <EditIcon /> <DeleteIcon /> </span>  
    </div>
                ))
              }
                <button
                onClick={() => {
                  if( selectedIndexes.length != 2 ) {
                    setIsAddStepShown(true);
                  } else {
                    addStep()
                  }
                } }
                className={styles.add_button} >Добавить шаги</button>
                <button className={styles.generate_button}>Сгенерировать шаги</button>
            </div>
    
</div>


<div className={styles.subtitles}>
  
  {
    subtitles.map((subtitle: string, idx: number) => (
      <div key={idx}>
 { toggle ? <p
 onClick={() => getDataFromSelectedSubtitles(String(idx))}
 onDoubleClick={() => setToggle(false)} id={String(idx)} className={styles.subtitle} key={idx}>{subtitle}</p> : <input type="text" value={subtitle} key={idx} />  }

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