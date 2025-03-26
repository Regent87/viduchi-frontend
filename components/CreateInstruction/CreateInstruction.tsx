"use client";
import { useState } from 'react';
import styles from './CreateInstruction.module.css';
import { CreateInstructionProps } from './CreateInstruction.props';
import useStore from '@/store/store';
import { EmptyPlayerModal } from '../EmptyPlayerModal/EmptyPlayerModal';
import { GenerateSubtitlesModal } from '../GenerateSubtitlesModal/GenerateSubtitlesModal';
import { getProjectById, saveProjectTimeline } from '@/api/client/projects';
import { API } from '@/app/api';

export const CreateInstruction = ({projectId }: CreateInstructionProps ) => {

    // zustand store
  //  const tracks = useStore((state) => state.tracks);
    const trackItemIds = useStore((state) => state.trackItemIds);
    const trackItemsMap = useStore((state) => state.trackItemsMap);
    const fps = useStore((state) => state.fps);
    const duration = useStore((state) => state.duration);
    const tracks = useStore((state) => state.tracks);

  const [updatedProject, setUpdatedProject] = useState({});

   // заносим данные проекта в БД из стора
   const handleSaveProjectData = async () => {

    console.log("TRACKS IN STORE: ", tracks);
    console.log("TRACKS ITEMS IDS: ", trackItemIds);
    console.log("TRACKS ITEMS MAP: ", trackItemsMap);

    // добавим максимальную высоту и ширину видео для рендеринга
    let video_widths_arr: any = [];
let video_heights_arr: any = [];


Object.keys(trackItemsMap).forEach(function(key) {

//  console.log(key, videos[key]);

if (trackItemsMap[key].type == "video") {
// console.log(videos[key]);

// console.log(videos[key].details);
video_widths_arr.push(trackItemsMap[key].details.width);
video_heights_arr.push(trackItemsMap[key].details.height);


}

});


console.log("video heights", video_heights_arr);
console.log("video widths", video_widths_arr);
const max_width = Math.max.apply(Math, video_widths_arr);
const max_height = Math.max.apply(Math, video_heights_arr);

console.log("MAX VIDEO WITDH: ", max_width);
console.log("MAX VIDEO HEIGHT: ", max_height);

// setMaxVideoWidth(max_width);
// setMaxVideoHeight(max_height);


//  const max_width = Math.max.apply(Math, video_widths_arr);
//  const max_height = Math.max.apply(Math, video_heights_arr);

    console.log("FPS: ", fps);
    console.log("DURATION: ", duration);
    // console.log("MAX  video WIDTH IN STORE: ", max_video_width);
    // console.log("MAX VIDEO WIDTH IN STORE: ", max_video_height);

     const savedData = await saveProjectTimeline(projectId, tracks, trackItemIds, trackItemsMap, fps, duration, max_width, max_height);
    if (savedData) {
      console.log("DATA WAS SAVED TO DB FROM EDITOR");
    }

  }

      const handleGetAndSendProjectToServer = async () => {
        // fetch project by id to get updated data
        const fetchNewProject = async () => {
          const newProject = await getProjectById(projectId);
          if (newProject) {
            setUpdatedProject(newProject);
          }
        }

        fetchNewProject();

        // send updated project to server
           const response = await fetch(API.render.sendProject, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({ updatedProject }),
            });

            if (!response.ok) {
                throw new Error('Failed to send project');
            }

            return await response.json();
      }




    // данные для показа модальных окон
    const [ isEmptyPlayerModalOpen, setIsEmptyPlayerModalOpen ] = useState(false);
    const [ isGenerateSubtitlesModalOpen , setIsGenerateSubtitlesModalOpen ] = useState(false);



    const closeDropdown = () => {
        setIsEmptyPlayerModalOpen(false);
    }

    return (
     <>
        <button
        onClick={async () => {
          //  console.log("Создать инструкцию номер проекта: " + projectId );

            if (tracks.length < 1) {
                setIsEmptyPlayerModalOpen(true)
            } else {
             await handleSaveProjectData();
            //  handleGetAndSendProjectToServer();
                setIsGenerateSubtitlesModalOpen(true)
            }
        }}
        className={styles.createInstruction}
        >
        Создать инструкцию
        </button>

<EmptyPlayerModal isOpen={isEmptyPlayerModalOpen} onClose={() => {
    closeDropdown();
    setIsEmptyPlayerModalOpen(false);
    console.log("refresh");
  //  router.replace('/projects');
  }} />

<GenerateSubtitlesModal projectId={projectId} isOpen={isGenerateSubtitlesModalOpen} onClose={() => {
  //  closeDropdown();
    setIsGenerateSubtitlesModalOpen(false);
    console.log("refresh");
  //  router.replace('/projects');
  }} />

    </>

    )
}