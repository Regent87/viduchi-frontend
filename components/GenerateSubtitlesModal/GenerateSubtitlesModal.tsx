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
import { addProjectVideo, addSubtitlesToProject, getProjectById, transcribeVideo } from '@/api/client/projects';
import { P } from '../P/P';
import { parseSubtitlesToJson } from '@/utils/subtitles';


export const GenerateSubtitlesModal = ({ projectId, isOpen, onClose }: GenerateSubtitlesModalProps) => {

const setVideoIdForInstruction = useStore((state) => state.setVideoIdForInstruction);


  const [projectName, setProjectName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const router = useRouter();

  // zustand store
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






  const handleSubmit = async () => {
      setIsLoading(true);

      // если субтитлы уже есть
      if (project.subtitles) {
        // корвртируем субтитлы из строки в массив json
        const subtitles_json = parseSubtitlesToJson(project.subtitles);
        // добавляем субтитлы в стор
        setAllSubtitles(subtitles_json);

           onClose();
           setIsLoading(false);
        router.push('/subtitles/' + projectId )
      }

      // если субтитлов нет
      if (!project.subtitles) {
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

  // загружаем видеофайл  - заглушка
  console.log("uploadedfiles : ", uploadedFiles);
  const formData = new FormData();
  formData.append('video_file', uploadedFiles[0]);
  // загруажем видеофайл на сервер
  const videoId: any = await addProjectVideo(projectId, formData); 
  if (!videoId) {
    setIsError(true);
  } else {

    console.log("GOT VIDEO ID: ", videoId)
    // добавляем id загруженного видео в стор
    setVideoIdForInstruction(videoId);

    // делаем транскрибацию
 
        const data = await transcribeVideo(projectId, videoId);
        const { subtitles } = data;
        if (!subtitles) {
          setIsLoading(false);
          setIsError(true);
        } else {
          
         // получаем субтитлы
          console.log("Subtitles got: ", subtitles);
          // добавляем субтитлы в проект
      
          // обновляем данные в проекте
          const newProject = await getProjectById(projectId);
          if (!newProject.subtitles) {
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
!isLoading && !isError && (
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
  !isLoading && (
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