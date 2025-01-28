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
import useTimelineEvents from "../../hooks/use-timeline-events";

import MenuIcon from './hamburger.svg';
import FolderIcon from './folder.svg';
import { Router } from "next/router";
import { AddStepModal } from "../AddStepModal/AddStepModal";
import { useRouter } from 'next/navigation';
import EditIcon from "./edit.svg";
import DeleteIcon from "./delete.svg";

import useStore from '@/store/store';
import { parseSubtitlesToJson } from "@/utils/subtitles";
import { getAllSteps } from "@/api/client/projects";
import { StepItem } from "./StepItem/StepItem";
import { SubtitleItem } from "./SubtitleItem/SubtitleItem";

export interface Istep {
  id: number;
  start: number;
  text: string;
}

export interface Isubtitle {
  id: string;
  text: string;
  timeline: string;
}

export const SubtitlesEditor =  ({project, className, ...props }: SubtitlesEditorProps ) => {


  // Zustand store
  const subtitles_zustand =useStore((state) => state.subtitles);
  const setAllSubtitles = useStore((state) => state.setAllSubtitles); 

  const steps_zustand =useStore((state) => state.steps);
  const setAllSteps = useStore((state) => state.setAllSteps); 



/*
TODO:
- в useEffect взять с сервера и записать в стор zustand шаги и субтитлы
- вывести каждый субтитл и шаг в отдальный компонент и там его редактировать и удалять через zustand
- добавить на кнопку генерации шагов 

*/


  const storeSubtitles = useStore((state) => state.subtitles);
  const setStoreSubtitles = useStore((state) => state.setSubtitles);

    const [projectName, setProjectName] = useState("");
      const [isUploadMediaOpen, setIsUploadMediaOpen] = useState(true);
      const [isShown, setIsShown] = useState(false);

      const [isAddStepShown, setIsAddStepShown] = useState(false);

      const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);

const [currentSubtitleText, setCurrentSubtitleText ] = useState("");

      /*
МОКОВЫЕ ДАЕЕЫЕ СУБТИТРОВ

      */

const subtitlesString = "1\n00:00:00,000 --> 00:00:02,500\nWelcome to the Example Subtitle File!\n\n2\n00:00:03,000 --> 00:00:06,000\nThis is a demonstration of SRT subtitles.\n\n3\n00:00:07,000 --> 00:00:10,500\nYou can use SRT files to add subtitles to your videos.\n\n4\n00:00:12,000 --> 00:00:15,000\nEach subtitle entry consists of a number, a timecode, and the subtitle text.";


const jsonSubtitles = parseSubtitlesToJson(subtitlesString);



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
      const [subtitles, setSubtitles] = useState<any>([]);
      const [steps, setSteps] = useState<any>([]);
      const [rawSteps, setRawSteps] = useState<any>({});
      const [toggle, setToggle] = useState(true);


      const deleteStep = (stepId: any) => {
      //  setSteps(steps.filter((s: any) => s.id !== stepId));
const newSteps = rawSteps.steps.filter((s: any) => s.id !== stepId)
console.log("New steps array: ", newSteps);
        setRawSteps(newSteps);
      };

      const addStep = () => {
        // достать данные ндексов
        let sortedIndexes = selectedIndexes.sort(function(a, b) {
          return a - b;
        });

        const selectedSubtitles = subtitles.slice(sortedIndexes[0], sortedIndexes[1] + 1);
        const newStep = {
          id: generateId(),
          title: "Название шага",
          subtitles: selectedSubtitles
        };

        setRawSteps([...rawSteps.steps, newStep])

        console.log("steps: ", steps )
      }

      useEffect(() => {
      //  setSubtitles((state) => state.subtitles)
      }, [])

      const closeDropdown = () => {
        setIsShown(false);
        setIsAddStepShown(false);
      };

      const { playerRef, setState } = useStore();
      useTimelineEvents();



    useEffect(() => {
        setProjectName(project.title);
        if( project.subtitles) {
        let subtitlesFromServer: any = parseSubtitlesToJson(project.subtitles);
      //  setSubtitles(subtitlesFromServer);      
       /*
--------------------------------------------------------
ДОБАВЛЯЕМ СУБТИТЛЫ В ZUSTAND
       */
        setAllSubtitles(subtitlesFromServer);
        }
    }, [])

    useEffect(() => {
           const fetchSteps = async () => {
          const stepsFromServer = await getAllSteps(project.id);
          console.log("STEPS FROM FATCH RQ: ", stepsFromServer)
          // const steps = stepsFromServer;
          setAllSteps(stepsFromServer);
         // setSteps(rawSteps.steps)
        }
         fetchSteps();
        
    }, [])


console.log("STEPS FROM ZUSTAND: ", steps_zustand)



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
   <button
   className={styles.generate_button} >Опубликовать инструкцию</button>
   </div>
    

            </div>
    


   
       
          
          </div>
          
    
  
          <div className={styles.steps}>
            
            <div id="create_steps" className={styles.create_steps}>
             { 
             steps_zustand.length < 1 && (<div>
             <p>Добавьте шаги инструкции <br /> вручную <br /> или <br /> ИИ сгенерирует их </p>
             </div>) 
            }

{ 
             steps_zustand && (<h3>Шаги:</h3>) 
            }


{
steps_zustand && steps_zustand.map((step: any) => (
   <StepItem
   key={step.id}
   step={step} />

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
                className={styles.add_button} >Добавить шаг</button>
                <button
                
                className={styles.generate_button}>Сгенерировать шаги</button>
            </div>
    
</div>


<div className={styles.subtitles}>
  
  {
subtitles_zustand && subtitles_zustand.map((subtitle: any) => (
      <SubtitleItem
      key={subtitle.id}
      subtitle={subtitle} />
     
    ))
  }
 
 


</div>



{
  isAddStepShown && <AddStepModal isOpen={isAddStepShown} onClose={closeDropdown} />
}
     
        </>
      );

}