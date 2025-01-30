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


export const GenerateSubtitlesModal = ({ projectId, isOpen, onClose }: GenerateSubtitlesModalProps) => {

const setVideoIdForInstruction = useStore((state) => state.setVideoIdForInstruction);


  const [projectName, setProjectName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const router = useRouter();

  const uploadedFiles = useStore((state) => state.uploadedFiles);

  const setUploadedFiles = useStore((state) => state.setUploadedFiles);

  const videoSubtitles = useStore((state) => state.subtitles);
  const setSubtitles = useStore((state) => state.setSubtitles);

  const { playerRef, duration } = useStore();

  const [project, setProject] = useState<any>({});


  useEffect(() => {
    const fetchProject = async () => {
      const project: any = await getProjectById(projectId);
    setProject(project);
     
    }

    fetchProject();
    
  }, [])



    function saveCanvasToVideoWithAudioWebmMp4() {
  
      console.log('vide bagen recoring')
    //  let mp4 = this.selectedVideoFormat === 'mp4'
    let mp4 = false;
  //   getting canvas
  
  //    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  // const canvas: any = document.getElementById("vid")!;
  const canvas: any = document.getElementsByTagName("video")[0];
  // const canvas: any = playerRef?.current;
  // const canvas: any | null = document.getElementById("vid");
     // const stream = canvas.captureStream(30);
  console.log("Canvas video: ", canvas) 
      const stream = canvas!.captureStream(30)
  
  // get first audio file from site
  const first_audio = document.getElementsByTagName("audio")[0];
  console.log("First audio: ", first_audio);
  
  // get all audios 
  const audios = document.getElementsByTagName("audio");
  // console.log("AUDIOS: ", audios)
  // remove duplicates from audios
  
  /*
  ---------------------------------------------------
  
  НУЖНО ПРОВЕРЯТЬ аудио на currentSrc 
  если первые яетыре буквы currentSrc будут blob - то добавлять аудио в стрим
  
  ---------------------------------------------------
  */
  
  const new_audios = Array.from(audios);
  
  console.log("AUDIOS FROM BROWSER: ", new_audios)
  
  new_audios.forEach((audio: any) => {
  audio.id = generateId();
  })
  
  // const audips tp add 
  const audios_to_add: any = [];
  
  new_audios.forEach((audio: any) => {
  
    let txt = audio.currentSrc.split('').slice(0, 4).join('');
    console.log("TXT: ", txt);
  
   if (txt == "blob") {
    audios_to_add.push(audio);
   }
    })
  
  // audios[1].id = generateId();
  // new_audios.push(audios[1]);
  // console.log("New audios: ", new_audios)
  //const new_audios = removeDuplicates(audios);
  // console.log("audios: ", audios);
  // console.log("TRACKS: ", tracks)
  // console.log("audios: ", new_audios)
  
  // const new_audios = audios[0];
  // filter all audios
  
  // generating ids for each audio 
  // new_audios.forEach((audio: any) => {
  //   console.log("Each auido: ", audio)
    
  // } )
  
  // console.log("audios: ", new_audios)
  
  
  
   //   const audioElements = this.editorElements.filter(isEditorAudioElement)
   // console.log("Stream : ", stream)
      const audioStreams: MediaStream[] = [];
  
      audios_to_add.forEach((audio: any) => {
     //   const audioElement = document.getElementById(audio.src) as HTMLAudioElement;
    // const audioElement = document.getElementById(audio.currentSrc) as HTMLAudioElement;
     const audioElement: any = document.getElementById(audio.id);
        let ctx = new AudioContext();
        let sourceNode = ctx.createMediaElementSource(audioElement);
        let dest = ctx.createMediaStreamDestination();
        
        
          sourceNode.connect(dest);
          sourceNode.connect(ctx.destination);
          audioStreams.push(dest.stream);
    
       
      });
  
      audioStreams.forEach((audioStream) => {
        stream.addTrack(audioStream.getAudioTracks()[0]);
      });
  
      const video = document.createElement("video");
      video.srcObject = stream;
      video.height = 500;
      video.width = 800;
      // video.controls = true;
      // document.body.appendChild(video);
  
      // video.play().
      playerRef?.current?.seekTo(0);
      playerRef?.current?.play();
      
      video.play().then(() => {
        const mediaRecorder = new MediaRecorder(stream);
        const chunks: Blob[] = [];
        mediaRecorder.ondataavailable = function (e) {
          chunks.push(e.data);
          console.log("data available");
  
        };
        mediaRecorder.onstop = async function (e) {
          const blob: any = new Blob(chunks, { type: "video/webm" });
  
          if (mp4) {
            // lets use ffmpeg to convert webm to mp4
            const data = new Uint8Array(await (blob).arrayBuffer());
            const ffmpeg = new FFmpeg();
            const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.2/dist/umd"
            await ffmpeg.load({
              coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
              wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
              // workerURL: await toBlobURL(`${baseURL}/ffmpeg-core.worker.js`, 'text/javascript'),
            });
            await ffmpeg.writeFile('video.webm', data);
            await ffmpeg.exec(["-y", "-i", "video.webm", "-c", "copy", "video.mp4"]);
            // await ffmpeg.exec(["-y", "-i", "video.webm", "-c:v", "libx264", "video.mp4"]);
  
            const output = await ffmpeg.readFile('video.mp4');
            const outputBlob = new Blob([output], { type: "video/mp4" });
            const outputUrl = URL.createObjectURL(outputBlob);
            const a = document.createElement("a");
            a.download = "video.mp4";
            a.href = outputUrl;
            a.click();
  
          } else {
              console.log(blob);

             return blob;
         
              

            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "video.webm";
            a.click();
          }
        };
        mediaRecorder.start();
        setTimeout(() => {
          mediaRecorder.stop();
        }, duration);
        video.remove();
      })
    }


  const handleSubmit = async () => {
      setIsLoading(true);

      if (project.subtitles) {
           onClose();
        router.push('/subtitles/' + projectId )
      }

      // сюда поставить загруженные файлы
      console.log("uploadedfiles : ", uploadedFiles);
 
      console.log("CUrrent project: ", project)
    //  console.log("subtitles from the state: ", project.subtitles);
     // console.log("SUbtitles from STORE: ", videoSubtitles)

    //  if (!videoSubtitles) {

        const formData = new FormData();
        formData.append('video_file', uploadedFiles[0]);
         const videoId: any = await addProjectVideo(projectId, formData); 

        //  saving to zustand
      
        console.log("GOT VIDEO ID: ", videoId)
        setVideoIdForInstruction(videoId);

        // if (videoId) {
         const data = await transcribeVideo(projectId, videoId);
         const { subtitles } = data;
         console.log("Subtitles got: ", subtitles)
         // setSubtitles(subtitles.subtitles);
        // console.log("GOT SUBTITLES: ", subtitles);

        //  до сиз пор работает - получаем субтитпы
        // subtitles.subtitles - это строка формата srt
        // subtitles.transcription - это строка транскрибированного текста

        // НА СЕРВЕРЕ РАБОТАЕТ, А НА КЛИЕНТЕ НЕ РАБОТАЕТ!!!
         // сохраняем субтитры в проект - НЕ РАБОТАЕТ У МЕНЯ!!!!
         try {
          await addSubtitlesToProject(projectId, String(subtitles));
         } catch(error) {
          console.log(error);
         }
        
         onClose();
         setIsLoading(false);
         router.push('/subtitles/' + projectId )
  //    } else {
     //   onClose();
       // router.push('/subtitles/' + projectId )
      }

     
      


    

  // рендерим видос и делаем субтитры
// saveCanvasToVideoWithAudioWebmMp4();
       // TODO
              // 1. Отправить видео на сервак, сохранить его и получить id 
            
              // 2. транскрибировать видоео по его id и id проекта и получить субтитлы ответом. Сохранить субтитлы в сторе subtitles 

  //     setProjectName('');

  //     onClose();

  //   //   if (project) {
  //   //     console.log("project refresh");
  //   //     router.replace("/projects");
  //   //     router.push('/editor/' + project.id)
  //   //    // location.reload();
  //   //   }

  // //  router.push('/subtitles/' + projectId );

  //     setIsLoading(false);

  // };

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
  <p>Пожалуйста, подождите. Идет траскрибация</p>
)
}

{ 
!isLoading && !isError && (
  <>
  <p>ИИ выделит аудио дорожку из видео и преобразует <br />  ее в субтитры и вы перейдете <br /> на страницу редактирования интсрукции</p>

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



<div className={styles.buttons}>

<button
onClick={onClose}
className={styles.reset}>Импортировать аудио</button>
<button
type='submit'
// disabled={isLoading || !projectName.trim()}
className={styles.apply}>Генерировать субтитры</button>
</div>



</form>
        </Modal>

  );
};