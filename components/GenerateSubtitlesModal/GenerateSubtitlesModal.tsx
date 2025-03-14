'use client';

import { useEffect, useState } from 'react';
import styles from './GenerateSubtitlesModal.module.css';
import { Modal } from '@/components/site/ModalForm/ModalForm';
import { GenerateSubtitlesModalProps } from './GenerateSubtitlesModal.props';

// import { createProject } from '@/api/client/projects';
import { useRouter } from 'next/navigation';
import useStore from '@/store/store';
import { generateId } from '@designcombo/timeline';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { toBlobURL } from '@ffmpeg/util';
import { addProjectAudio, addProjectVideo, addSubtitlesToProject, getAllAudios, getProjectById, saveProjectTimeline, transcribeAudio, transcribeVideo } from '@/api/client/projects';
import { P } from '../P/P';
import { convertToSubtitles, parseSubtitlesToJson } from '@/utils/subtitles';
import { API } from '@/app/api';


export const GenerateSubtitlesModal = ({ projectId, isOpen, onClose }: GenerateSubtitlesModalProps) => {

const setVideoIdForInstruction = useStore((state) => state.setVideoIdForInstruction);


  const [projectName, setProjectName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const router = useRouter();


  const [updatedProject, setUpdatedProject] = useState({});

  // zustand store
  const tracks = useStore((state) => state.tracks);
  const trackItemIds = useStore((state) => state.trackItemIds);
  const trackItemsMap = useStore((state) => state.trackItemsMap);
  const fps = useStore((state) => state.fps);

  const renderedVIdeoFiles = useStore((state) => state.renderedVideoFiles);
  const setRenderedVIdeoFiles = useStore((state) => state.setRenderedVideoFiles);

  const isSubtitlesGenerating = useStore((state) => state.isSubtitlesGenerating);
  const setIsSubtitlesGenerating = useStore((state) => state.setIsSubtitlesGenerating);



  const uploadedFiles = useStore((state) => state.uploadedFiles);
  const setUploadedFiles = useStore((state) => state.setUploadedFiles);
  const videoSubtitles = useStore((state) => state.subtitles);
  const setSubtitles = useStore((state) => state.setSubtitles);

  const setAllSubtitles = useStore((state) => state.setAllSubtitles);

  const { playerRef, duration } = useStore();

  const [project, setProject] = useState<any>({});


  useEffect(() => {
    const fetchProject = async () => {
      const project: any = await getProjectById(projectId);
    setProject(project);

    }

    fetchProject();

  }, [])


  useEffect(() => {
// setIsSubtitlesGenerating(true);
if (isSubtitlesGenerating) {
  setIsLoading(true);
} else {
  setIsLoading(false);
}
  }, [isSubtitlesGenerating, isLoading])


  console.log("PROJECT FROM THEDIALOG WINDOW: ", project)
  // заносим данные проекта в БД из стора
   const handleSaveProjectData = async () => {

      console.log("TRACKS IN STORE: ", tracks);
      console.log("TRACKS ITEMS IDS: ", trackItemIds);
      console.log("TRACKS ITEMS MAP: ", trackItemsMap);
      console.log("FPS: ", fps);
      console.log("DURATION: ", duration);

      //  const savedData = await saveProjectTimeline(project.id, tracks, trackItemIds, trackItemsMap, fps, duration);
      // if (savedData) {
      //   console.log("DATA WAS SAVED TO DB FROM EDITOR");
      // }

    }


    const handleGetAndSendProjectToServer = async () => {
      // fetch project by id to get updated data
      const fetchNewProject = async () => {
        const newProject = await getProjectById(project.id);
        console.log("GOT NEW PROJECT FROM SERVER: ", newProject)
        if (newProject) {
          setUpdatedProject(newProject);
          console.log("UPDATED PROJECT FROM SERVER: ", updatedProject)
        } else {
          setUpdatedProject(project);
        }
        return newProject;
      }

      const newProject = await fetchNewProject();

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

          return await response.json();
    }



     // render video on nodejs server
  const handleRenderVideoOnServer = async () => {
    let blob = await fetch("http://localhost:4000/api/rendervideo", {
      method: "GET",
  // let blob = await fetch(API.render.renderVideo, {
      // method: "GET",
      // body: JSON.stringify({ selectedDoc }),
      //  headers: { "content-type": "application/json" },
    }).then(r => r.blob());

    console.log("BLOB FROM SERVER: ", blob)
    let fileOfBlob = new File([blob], 'rendered.mp4', { type: "video/mp4" });
    console.log("FILE FROM BLOB: ", fileOfBlob)

    return fileOfBlob;

  }


      // render audio on nodejs server
      const handleRenderAudioOnServer = async () => {
        let blob = await fetch(API.render.renderAudio, {
          method: "GET",
      // let blob = await fetch(API.render.renderVideo, {
          // method: "GET",
          // body: JSON.stringify({ selectedDoc }),
          //  headers: { "content-type": "application/json" },
        }).then(r => r.blob());
    
        console.log("BLOB FROM SERVER: ", blob)
        let fileOfBlob = new File([blob], 'rendered.mp3', { type: "audio/mpeg" });
        console.log("FILE FROM BLOB: ", fileOfBlob)
    
        return fileOfBlob;
    
      }






  const handleSubmit = async () => {
      setIsLoading(true);

      // если субтитлы уже есть
      // if (project.subtitles) {
      //   // корвртируем субтитлы из строки в массив json
      //   const subtitles_json = parseSubtitlesToJson(project.subtitles);
      //   // добавляем субтитлы в стор
      //   setAllSubtitles(subtitles_json);

      //      onClose();
      //      setIsLoading(false);
      //   router.push('/subtitles/' + projectId )
      // }

      // если субтитлов нет
      if (!project.subtitles || project.subtitles) {
        setIsLoading(true);

/*
1. сохраняем timeline проекта на сервер
2. делаем запрос на сервер json для сохранения файла проекта json в public
3. делаем запрос на рендеринг видео и получам видеофайл
4. отправляем загруженный видеофайл на сервер и получаем id
5. записываем id в стор
6. делаем транскрибацию
7. если все ок, перекидывеем на страницу редактирования субтитлов
*/

// 1. сохраняем timeline проекта на сервер
// await handleSaveProjectData();

// =====================================
// делаем проверку, если у нас всего один аудио файл, то вытаскиваем субтитры из него и добавляем субтитры в проект
let audios = tracks.filter((item: any) => item.type === "audio");
if (audios.length === 1) {

  if (audios[0].items.length == 1) {
   console.log("Split audios subtitles")
   // достаем субтитры из аудио и загружаем их в проект
// достаем id 
const audId = audios[0].items[0];
const aud_arr = audId.split("-");
const audioDbId = Number(aud_arr[1]);

// достаем все аудио из проекта
const audiosFromDb = await getAllAudios(projectId);
// достаем субтитры из первого аудио
const { subtitles } = audiosFromDb[0];
// если есть субтитры - добавляем субтитры в проект и переходим к редактированию
if (subtitles) {
  await addSubtitlesToProject(projectId, subtitles);
     // закрывем окно и переходим на редактирование
     onClose();
     setIsLoading(false);
     router.push('/subtitles/' + projectId );

} else {
  setIsLoading(false);
  setIsError(true);
}

  }
  
  if (audios[0].items.length > 1) {
   console.log("Render audios on server")
   // если у нас несколько аудио файлов, то делаем рендеринг аудио
   // рендерим все аудио на сервере

// 2. делаем запрос на сервер json для сохранения файла проекта json в public
   await handleGetAndSendProjectToServer();

   // 3. делаем запрос на рендеринг аудио и получам аудиофайл mp3. в этой же функции отправляем аудиофайл на сохранение на сервер
 const renderedFile = await handleRenderAudioOnServer();
 console.log("REDNERED FILE rETURNED FROM SERVER FUNCTION: ", renderedFile);

 const formData = new FormData();
 // formData.append('video_file', uploadedFiles[0]);
 formData.append('audio_file', renderedFile);
 console.log("FORMDATA FOR UPLOAD Rednered file: ", formData)
// загруажем аудиофайл на сервер
if (!!formData) {
  const audioId: any = await addProjectAudio(projectId, formData);
  if (!audioId) {
    setIsError(true);
  } else {

    console.log("GOT AUDIO ID: ", audioId)
    // добавляем id загруженного видео в стор
   // setVideoIdForInstruction(videoId);

    // делаем транскрибацию

        const data = await transcribeAudio(projectId, audioId);
        const { subtitles } = data;
        if (!subtitles) {
          setIsLoading(false);
          setIsError(true);
        } else {

         // получаем субтитлы
          console.log("Subtitles got: ", data.subtitles);

          // форматируем субтитры
        // const subtitles_to_upload = parseSubtitlesToJson(subtitles);
          // добавляем субтитлы в проект
          await addSubtitlesToProject(projectId, data.subtitles);
          // обновляем данные в проекте
          const newProject = await getProjectById(projectId);
          if (!newProject) {
            setIsLoading(false);
            setIsError(true);

          } else {
            // закрывем окно и переходим на редактирование
            onClose();
            setIsLoading(false);
            router.push('/subtitles/' + projectId )
          }

         }


  }
} else {
  setIsError(true);
  setIsLoading(false);

}

  }
  
  }

 

  // проверяем если formData существует
  

  



      }

      }




  return (

    <Modal
    className={styles.white}
    isOpen={isOpen} onClose={onClose} title="">
<form onSubmit={(e) => {
    e.preventDefault();
    handleSubmit();
  }}>
<div className={styles.addProject}>

{/* <input
onChange={(e: any) => setProjectName(e.target.value)}
value={projectName}
placeholder='Введите название проекта'
type="text" required /> */}

{
isLoading && !isError && (
  <p>Пожалуйста, подождите. Идет транскрибация</p>
)
}

{
!isLoading && !isError && !isSubtitlesGenerating && (
  <>
  <p>ИИ выделит аудио дорожку из видео и преобразует <br />  ее в субтитры и вы перейдете <br /> на страницу редактирования инструкции</p>

<p>В противном случае необходимо импортировать аудио</p>

</>
)
}



{
isError && (
  <p className='red'>Произошла ошибка при транскрибации. Пожалуйста, повторите запрос</p>
)
}




</div>



{
  !isLoading && !isSubtitlesGenerating && (
<div className={styles.buttons}>
<button
onClick={onClose}
className={styles.reset}>Импортировать аудио</button>
<button
type='submit'
 disabled={isLoading}
className={styles.apply}>Генерировать субтитры</button>
</div>
  )
}





</form>
        </Modal>

  );
};