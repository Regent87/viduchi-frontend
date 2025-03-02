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
import { convertTimeToStep, convertToSubtitles, parseSubtitlesToJson } from "@/utils/subtitles";
import { addStepsToProject, addSubtitlesToProject, generateSteps, getAllSteps } from "@/api/client/projects";
import { StepItem } from "./StepItem/StepItem";
import { SubtitleItem } from "./SubtitleItem/SubtitleItem";
import { createInstruction } from "@/api/client/instructions";

export interface Istep {
  start: number;
  text: string;
}

export interface Isubtitle {
  id: string;
  text: string;
  timeline: string;
}

export const SubtitlesEditor =  ({project, className, ...props }: SubtitlesEditorProps ) => {

  const [isLoading, setIsLoading] = useState(false);
  const [isInstructionLoading, setIsInstructionLoading] = useState(false);
  const [isInstructionError, setIsInstructionError] = useState(false);
  const [isError, setIsError] = useState(false);

  // Zustand store
  const subtitles_zustand =useStore((state) => state.subtitles);
  const setAllSubtitles = useStore((state) => state.setAllSubtitles); 

  const steps_zustand =useStore((state) => state.steps);
  const setAllSteps = useStore((state) => state.setAllSteps); 
  const setStepsToStore = useStore((state) => state.setSteps); 

  const selectedSubtitles = useStore((state) => state.selectedSubtitles); 

  const removeAllSelectedSubtitles = useStore((state) => state.removeAllSelectedSubtitles); 

  const removeAllSubtitles = useStore((state) => state.removeAllSubtitles); 

  const removeAllSteps = useStore((state) => state.removeAllSteps); 
  
  const setAllLastCheckedSubtitles = useStore((state) => state.setAllLastCheckedSubtitles); 

  const videoIdoForInstruction = useStore((state) => state.videoIdForInstruction);

  const setVideoIdForInstruction = useStore((state) => state.setVideoIdForInstruction);

  const removeAllTracks = useStore((state) => state.removeAllTracks);

  const storeSubtitles = useStore((state) => state.subtitles);
  const setStoreSubtitles = useStore((state) => state.setSubtitles);

    const [projectName, setProjectName] = useState("");
      const [isUploadMediaOpen, setIsUploadMediaOpen] = useState(true);
      const [isShown, setIsShown] = useState(false);

      const [isAddStepShown, setIsAddStepShown] = useState(false);

      const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);

const [currentSubtitleText, setCurrentSubtitleText ] = useState("");

// -------------------------store ends


const [ instructionName, setInstructionName ] = useState("Инструкция 1")

console.log("VIDEO ID FO INSTRUCION from zustand: ", videoIdoForInstruction)




// НУЖНО СОЗДАВАТЬ ИНСТРУККЦИЮ В КОМПОНЕНТЕ ИНСТРУКЦИЙ
// СНАЧАЛА СДЕЛАТЬ РЕНДЕРИНГ ВИДОСА И ПОТОМ СОЗДАТЬ ИНСТРУКЦИЮ
// НУЖНО ПЕРЕДАТЬ В КАЧЕСТВЕ ПАРАМЕТРОВ id проекта
// создание инструкции
  async function handleNewInstruction() {

    setIsInstructionLoading(true);
    // если айди видео из зустанда равно нулю, то выводим ошибку
    if (videoIdoForInstruction === 0) {
      setIsInstructionError(true);
    } else {
      console.log("STEPS FROM ZUSTAND: ", steps_zustand);
      console.log("SUBTITLES_FROM_ZUSTAND: ", subtitles_zustand);
      console.log("VIDEO ID TO UPLOAD FROM ZUSTAND: ", videoIdoForInstruction);
      console.log("INSTRICTION NAME: ", instructionName);
      // 1. Привести субтитлы в строку с помощью функции 
      const subtitles_to_upload = convertToSubtitles(subtitles_zustand);
      console.log("Subtitles in string: ", subtitles_to_upload);
      //2 сделать запрос на создание инструкции
      const new_instr = await createInstruction(instructionName, steps_zustand, videoIdoForInstruction);

      // если у нас не создана интсрукция, то выбрасываем ошибку
      if (!new_instr) {
        setIsInstructionError(true);
        setIsInstructionLoading(false);
      } else {
        console.log("НОВАЯ ИНСТРУКЦИЯ: ", new_instr);
        // удалить номер видоса для инструкции и стора
        setVideoIdForInstruction(0);

        // сохранить все треки из редактора на сервер
        // очистить все треки из редактора проекта
        removeAllTracks();
        // сохранить измененные субтитры в project
        // const new_subtitles = await addSubtitlesToProject( project.id, String(subtitles_to_upload));
        // сохранить измененные шаги в project
        // const new_steps = await addStepsToProject(project.id, steps_zustand);
        // сохрфнить изменненый timeline в project
        // очистить все шаги и субтитлы
        removeAllSubtitles();
        removeAllSteps();

        // 3. перебросить в раздел /instructions
        setIsInstructionLoading(false);
        router.push('/instructions');



      }


    }





  }


  // генерация шагов
  const createNewSteps = async () => {
    setIsLoading(true);
    // генерируем шаги и получаем ответ сервера
const generatedStepsResponse = await generateSteps(project.id); 
console.log("GOT RESPONSE FROM SERVER STEPS: ", generatedStepsResponse)
    // получаем шаги с сервера
  const gotSteps = await getAllSteps(project.id);
  console.log("GENERATED STEPS: ", gotSteps);
  if (gotSteps.length > 0) {
 // ставим шаги в zustand
 setAllSteps(gotSteps);
 console.log("NEW GENERATED STEPS FROM ZUSTAND", steps_zustand)
 setIsLoading(false);
  } else {
    setIsLoading(false);
   // setIsError(true);
  }
   
  }






      /*
МОКОВЫЕ ДАЕЕЫЕ СУБТИТРОВ

      */

// const subtitlesString = "1\n00:00:00,000 --> 00:00:02,500\nWelcome to the Example Subtitle File!\n\n2\n00:00:03,000 --> 00:00:06,000\nThis is a demonstration of SRT subtitles.\n\n3\n00:00:07,000 --> 00:00:10,500\nYou can use SRT files to add subtitles to your videos.\n\n4\n00:00:12,000 --> 00:00:15,000\nEach subtitle entry consists of a number, a timecode, and the subtitle text.";


// const jsonSubtitles = parseSubtitlesToJson(subtitlesString);

 
      const router = useRouter();

      const goToVideoEditor = () => {
		router.push('/editor/' + project.id);
	};

      // субтитлы и шаги
      const [subtitles, setSubtitles] = useState<any>([]);
      const [steps, setSteps] = useState<any>([]);
      const [rawSteps, setRawSteps] = useState<any>({});
      const [toggle, setToggle] = useState(true);


     


      // добавляем новый шаг вручную
      const addStep = () => {
        // вытаскиваем и трансформируем даныне из первого отмеченного субтитла
        const newStepStart: number = convertTimeToStep(selectedSubtitles[0].timeline);
       
        const newStep: Istep = {
          start: newStepStart,
          text: "Новый шаг"
        };
        // добавляем шаг в стор
        setStepsToStore(newStep);
        console.log("NES STEPS IN STORE: ", steps_zustand);

        // добавляем субтитлы как ранее добавленные для отражения в UI серым цветом
        setAllLastCheckedSubtitles(selectedSubtitles);

        // удаляем выбранные субтитлы из стора
        removeAllSelectedSubtitles();

    
// Get the div element
let divElement = document.getElementById('steplist');
// Scroll to the bottom of the div
divElement!.scrollIntoView(false);
       
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
        // првоеряем есть ли субтитлы в сторе и если есть, то ничего не делаем
        // если субтитлов в сторе нет, тогда добавляем их из проекта.
       if ( subtitles_zustand.length < 1) {
        let subtitlesFromServer: any = parseSubtitlesToJson(project.subtitles!);
        setAllSubtitles(subtitlesFromServer);
       }
    }, [])

    useEffect(() => {
           const fetchSteps = async () => {
          const stepsFromServer = await getAllSteps(project.id);
          console.log("STEPS FROM FATCH RQ: ", stepsFromServer)
          // const steps = stepsFromServer;

          // если шаги в сторе пустые, то загружаем шаги из базы данных
if (steps_zustand.length < 1) {
  setAllSteps(stepsFromServer);
}
         
         // setSteps(rawSteps.steps)
        }
         fetchSteps();
        
    }, [])


// console.log("STEPS FROM ZUSTAND: ", steps_zustand)



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
     /&nbsp; <input type="text" value={instructionName} onChange={(e) => setInstructionName(e.target.value)} />
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
    {
      !isInstructionLoading && (
        <button
        onClick={handleNewInstruction}
        className={styles.generate_button} >Опубликовать инструкцию</button>
      )
    }

{
  isInstructionLoading && (
    <p>Пожалуйста, подождите. Идет создание инструкции.</p>
  )
 }
  
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
             steps_zustand.length > 0 && (<h3>Шаги:</h3>) 
            }

<div id="steplist" className={styles.stepList}>
{
steps_zustand && steps_zustand.map((step: any, idx: number) => (
   <StepItem
   key={idx}
   id={step.start}
   step={step} />

  ))
}
</div>


 {
  isLoading && (
    <p>Пожалуйста, подождите. Идет генерация шагов.</p>
  )
 }



{
  isError && (
    <p className="red">Произошла ошибка во время генерации шагов. Пожалуйста, повторите еще.</p>
  )
 }

{
  isInstructionError && (
    <p className="red">Произошла ошибка во время добавления инструкции.</p>
  )
 }
              

               
               
               {
    !isLoading && !isInstructionLoading && (
      <>
       <button
                onClick={() => {
                  if( selectedSubtitles.length != 2 ) {
                    setIsAddStepShown(true);
                  } else {
                    addStep()
                  }
                } }
                className={styles.add_button} >Добавить шаг</button>

<button
      onClick={createNewSteps}
      className={styles.generate_button}>Сгенерировать шаги</button>
      </>
    
    )
  }


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