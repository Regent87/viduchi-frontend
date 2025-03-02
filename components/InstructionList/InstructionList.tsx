import styles from './InstructionList.module.css';
import cn from 'classnames';
import { InstructionListProps } from './InstructionList.props';
import { useEffect, useState } from 'react';
import { InstructionCard } from '../InstructionCard/InstructionCard';
import { getAllInstructions } from '@/api/client/instructions';
import useStore from '@/store/store';
import { InstructionNewCreationCard } from '../InstructionNewCreationCard/InstructionNewCreationCard';

import { useSearchParams } from 'next/navigation';
import { API } from '@/app/api';
import { addProjectAudio, addProjectVideo, getProjectById, transcribeVideo } from '@/api/client/projects';

export default function InstructionList({ className }: InstructionListProps)  {

    const [updatedProject, setUpdatedProject] = useState({});

   // params to render video
   const searchParams = useSearchParams();
   const projectId = searchParams.get('projectid');

    // zustand store
    const instructions = useStore((state) => state.instructions);
    const setInstructions = useStore((state) => state.setAllInstructions);

	const [isLoading, setIsLoading] = useState(false);
    // is new instruction rendering
    const [isRendering, setIsRendering] = useState(false);


    const handleRenderVideoOnServer = async () => {
        let blob = await fetch("http://localhost:4000/api/rendervideo", {
          method: "GET",
        }).then(r => r.blob());
    
        console.log("BLOB FROM SERVER: ", blob)
        let fileOfBlob = new File([blob], 'rendered.mp4', { type: "video/mp4" });
        console.log("FILE FROM BLOB: ", fileOfBlob)
    
        return fileOfBlob;
    
      }

        const handleGetAndSendProjectToServer = async (id: number) => {
            // fetch project by id to get updated data
            const fetchNewProject = async (id: number) => {
              const newProject = await getProjectById(id);
              console.log("GOT NEW PROJECT FROM SERVER: ", newProject)
              if (newProject) {
                setUpdatedProject(newProject);
                console.log("UPDATED PROJECT FROM SERVER: ", updatedProject)
              } else {
            setUpdatedProject({});
              }
              return newProject;
            }
      
            const newProject = await fetchNewProject(id);
      
            // send updated project to server
               const response = await fetch(API.render.sendProject, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    body: JSON.stringify({ updatedProject: newProject }),
                });
      
                if (!response.ok) {
                    throw new Error('Failed to send project');
                }
      
                return response.json();
          }
    

    // проерка если есть параметры projectid  то нужно сделать рендеринг видео
    // функционал рендеринга видео и создания новой инструкции
   

    useEffect(() => {

        async function createInstructionHandler(id: number) {
  // ставим заглушку
  setIsRendering(true);
  // лотправляем метаданные на сервер
  await handleGetAndSendProjectToServer(id);
   // рендерим видео
  const renderedFile = await handleRenderVideoOnServer();
  console.log("REDNERED FILE rETURNED FROM SERVER FUNCTION: ", renderedFile);
  const formData = new FormData();
  // formData.append('video_file', uploadedFiles[0]);
  formData.append('video_file', renderedFile);
  console.log("FORMDATA FOR UPLOAD Rednered file: ", formData)
  // загруажем аудиофайл на сервер

  // проверяем если formData существует

  if (!!formData) {

  } else {
     const videoId: any = await addProjectVideo(id, formData);
     console.log("GOT VIDEO ID: ", videoId)
      // добавляем id загруженного видео в стор
    //  setVideoIdForInstruction(videoId);
// ВОПРСО НУЖНО ЛИ ДЕЛАТЬ ТРАНСКРИБАЦИЮ ИЛИ ВЗЯТЬ ВСЕ ИЗ УЖЕ ИМЕЮЩИХСЯ СУБТИТОЛВ
       // делаем транскрибацию
                const data = await transcribeVideo(id, videoId);
                const { subtitles } = data;
  }

        }

        if (projectId) {
            createInstructionHandler(Number(projectId));
    
        }
    }, [projectId])

    useEffect(() => {
        const fetchInstructions = async () => {
            setIsLoading(true);
            const instructions = await getAllInstructions();
            setInstructions(instructions);
            setIsLoading(false);
        }
        fetchInstructions();
    }, [])

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<div className={cn(className, styles.instructionList)}>
			{instructions.map((instruction) => (
                <InstructionCard
                key={instruction.id}
                instructionModel={instruction} />
			))}

            {
                isRendering && (
                    <InstructionNewCreationCard />
                )
            }
		</div>
	);
};
