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

  const [inputtedSubtitles, setInputtedSubtitles] = useState([
    { text: '' }
  ])

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

console.log("SUbtitles: ", jsonSubtitles);

// const subtitlesFromServer = parseSubtitlesToJson()

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
        setSteps(steps.filter((s: any) => s.id !== stepId));

        setRawSteps(rawSteps.steps.filter((s: any) => s.id !== stepId))
      };

      const addStep = () => {
        // достать данные ндексов
        let sortedIndexes = selectedIndexes.sort(function(a, b) {
          return a - b;
        });

        const selectedSubtitles = subtitles.slice(sortedIndexes[0], sortedIndexes[1] + 1);
        const newStep: Istep = {
          id: generateId(),
          title: "Название шага",
          subtitles: selectedSubtitles
        };

        setSteps([...steps, newStep])

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


      // useEffect(() => {
      //   // get steps from database
      //  //  if (project.subtitles) {
      //    const fetchSteps = async () => {
      //     const stepsFromServer = await getAllSteps(project.id);
      //     console.log("STEPS FROM FATCH RQ: ", stepsFromServer)
      //     setSteps(stepsFromServer);
      //  // }

      

      //    console.log("Steps from server:", steps)
      //   }

      //   fetchSteps();
      // }, [])

     


    useEffect(() => {
        setProjectName(project.title);
        if( project.subtitles) {
        let subtitlesFromServer: any = parseSubtitlesToJson(project.subtitles);
        setSubtitles(subtitlesFromServer);
     
        }
    }, [])

    useEffect(() => {
           const fetchSteps = async () => {
          const stepsFromServer = await getAllSteps(project.id);
          console.log("STEPS FROM FATCH RQ: ", stepsFromServer)
          setRawSteps(stepsFromServer);
         // setSteps(rawSteps.steps)
        }
         fetchSteps();
        
    }, [])


    console.log("STEPS IN STATE: ", rawSteps)

    console.log(subtitles);


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
             steps.length < 1 && (<div>
             <p>Добавьте шаги инструкции <br /> вручную <br /> или <br /> ИИ сгенерирует их </p>
             </div>) 
            }

{ 
             rawSteps.steps && (<h3>Шаги:</h3>) 
            }


{/* {
 rawSteps.steps.map((step: any) => (
    <div key={step.id} className={styles.singleStep}>
<span style={{ cursor:"pointer" }}
onClick={() => {
 // playerRef?.current?.seekTo(step.time)
}}
>{step.text}</span>
<span> <EditIcon /> <DeleteIcon
// onclick={deleteStep(step.id)}
/> </span>
    </div>

  ))
} */}

{/*              
{
steps.length > 0 && steps.map((step: any, idx: any) => (
<div key={idx} className={styles.singleStep}>
   <span>{step.text}</span>
    <span> <EditIcon /> <DeleteIcon 
   
  //  onClick={deleteStep(step.id)}
     /> </span>  
    </div>
                ))
              } */}
              

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
    subtitles.map((subtitle: any) => (
      <div key={subtitle.id}>
 { toggle ? <p
 onClick={() => getDataFromSelectedSubtitles(subtitle.id)}
 onDoubleClick={() => setToggle(false)} id={subtitle.id} className={styles.subtitle} key={subtitle.id}>{subtitle.text}</p> : <input type="text"
 onChange={(e) => setCurrentSubtitleText(e.target.value)}
 value={subtitle} key={subtitle.id} />  }

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