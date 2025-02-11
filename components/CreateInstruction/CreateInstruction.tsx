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
        console.log("FPS: ", fps);
        console.log("DURATION: ", duration);
         const savedData = await saveProjectTimeline(projectId, tracks, trackItemIds, trackItemsMap, fps, duration);
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
        onClick={() => {
          //  console.log("Создать инструкцию номер проекта: " + projectId );

            if (tracks.length < 1) {
                setIsEmptyPlayerModalOpen(true)
            } else {
             // handleSaveProjectData();
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