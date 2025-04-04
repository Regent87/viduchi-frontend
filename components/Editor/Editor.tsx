"use client";

import styles from "./Editor.module.css";
import {
  ADD_AUDIO,
  ADD_IMAGE,
  ADD_TEXT,
  ADD_VIDEO,
  dispatch,
} from "@designcombo/events";
import { useState, useEffect } from "react";
import Timeline from "../../components/timeline";
import { generateId } from "@designcombo/timeline";
import { DEFAULT_FONT } from "../../constants/font";
import Player from "../../components/player/player";
import useStore from "../../store/store";
import useTimelineEvents from "../../hooks/use-timeline-events";

//  esitor data imports
import Image from "next/image";
import FolderIcon from "./folder.svg";
import { useRouter } from "next/navigation";

import { UserPanel } from "@/components/UserPanel/UserPanel";
import { UserInfo } from "@/components/UserInfo/UserInfo";
import { EditorUserMenu } from "@/components/EditorUserMenu/EditorUserMenu";
import { VideoItemCard } from "@/components/VideoItemCard/VideoItemCard";
import { AudioItemCard } from "@/components/AudioItemCard/AudioItemCard";

import MenuIcon from './hamburger.svg';
import CropIcon from "./crop.svg";
import EllypsisIcon from "./ellypsis.svg";
import SubtitlesIcon from "./cc.svg";
import HideVIdeoIcon from "./chevronDown.svg";
import kadryVideoImg from "./kadryvideo.png";
import uploadMediaPhoto from "./upload.png";
import ChevronCloseIcon from "./chevron.svg";
import PlayNavigation from "@/components/PlayNavigation/PlayNavigation";

import { EditorProps } from "./Editor.props";
import { CreateInstruction } from "../CreateInstruction/CreateInstruction";
import { RightMenu } from "./RightMenu/RightMenu";
import { addProjectAudio, addProjectVideo, extractAudioFromProjectVideo, getAllAudios, getAllVideos, getProjectById, saveProjectTimeline, transcribeAudio } from "@/api/client/projects";
import { handelAddVideoFromServer, handleAddAudioFromServer } from "@/utils/upload";
import { VideoItemCardFromServer } from "../VideoItemCardFromServer/VideoItemCardFromServer";
import { saveProjectData } from "@/utils/save_editor";
import { AudioItemCardFromServer } from "../AudioItemCardFromServer/AudioItemCardFromServer";
import { IaudioFromServer } from "@/interfaces/video.interface";
import { API } from "@/app/api";
import { extractAudio } from "@/utils/extract-audio-from-video";
import { convertTimeToStep, parseSubtitlesToJson } from "@/utils/subtitles";

// import renderedVideo from "../../out/myComp.mp4";

export const Editor =  ({project, className, ...props }: EditorProps)=> {

  // updated project to send to server
  const [updatedProject, setUpdatedProject] = useState({});

  // zustand store
  const videosFromServer = useStore((state) => state.videosFromServer);

  const setVideosFromServer = useStore((state) => state.setAllVideosFromServer);

  const tracks = useStore((state) => state.tracks);
  const trackItemIds = useStore((state) => state.trackItemIds);
  const trackItemsMap = useStore((state) => state.trackItemsMap);
  const fps = useStore((state) => state.fps);
  const duration = useStore((state) => state.duration);
  const removeAllTracks = useStore((state) => state.removeAllTracks);
  const removeAllSteps = useStore((state) => state.removeAllSteps); 
  const removeAllSubtitles = useStore((state) => state.removeAllSubtitles); 
  const setTracks = useStore((state) => state.setTracks);

  const setTrackItemsIds = useStore((state) => state.setTrackItemIds);
  const setTrackItemsMap = useStore((state) => state.setTrackItemsMap);

  const setAllSubtitles = useStore((state) => state.setAllSubtitles);
  const setAllSteps = useStore((state) => state.setAllSteps);

  const setIsSubtitlesGenerating = useStore((state) => state.setIsSubtitlesGenerating);


  const addVideoHeight = useStore((state) => state.addVideoHeight);
  const addVideoWidth = useStore((state) => state.addVideoWidth);

  const setVideoHeights = useStore((state) => state.setVideoHeights);
  const setVideoWidths = useStore((state) => state.setVideoWidths);

  const videoHeights = useStore((state) => state.videoHeights);
  const videoWidths = useStore((state) => state.videoWidths);

  const max_video_height = useStore((state) => state.max_video_height);
  const max_video_width = useStore((state) => state.max_video_width);
  const setMaxVideoHeight = useStore((state) => state.setMaxVideoHeight);
  const setMaxVideoWidth = useStore((state) => state.setMaxVideoWidth);

  // render video on nodejs server
  const handleRenderVideoOnServer = async () => {

  //   const response = await fetch('http://localhost:4000/api/rendervideo', {
  //     method: 'GET',
  // });

  // if (!response.ok) {
  //     throw new Error('Failed to render video');
  // }

  // console.log("RESPONSE FROM RENDERED FILE: ", response)

  // return response;

  fetch(API.render.renderVideo, {
    method: "GET",
    // body: JSON.stringify({ selectedDoc }),
     headers: { "content-type": "application/json" },
  })
    .then((res) => (res.ok ? res.blob() : Promise.reject(res)))
    .then((blob) => {
      const blobUrl = URL.createObjectURL(blob);
      // now do something with the URL
      console.log("BLOB: ", blob);
      console.log(" BLOB URL: ", blobUrl);
    });


}



// console.log("RENDERED VIDEO: ", renderedVideo)
  // save project to JSON server
  const handleGetAndSendProjectToServer = async () => {
    // fetch project by id to get updated data
    const fetchNewProject = async () => {
      const newProject = await getProjectById(project.id);
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

     const savedData = await saveProjectTimeline(project.id, tracks, trackItemIds, trackItemsMap, fps, duration, max_width, max_height);
    if (savedData) {
      console.log("DATA WAS SAVED TO DB FROM EDITOR");
    }

  }


  const router = useRouter();


  // загружаем аудиофайлы с сервера
const [ isAudioLoading, setIsAudioLoading ] = useState(false);
// const [ audiosFromServer, setAudiosFromServer ] = useState<any>([]);
const setAudiosFromServer = useStore((state) => state.setAllAudiosFromServer);
const audiosFromServer = useStore((state) => state.audiosFromServer);
const[ audios, setAudios ] = useState<any>([]);

 useEffect(() => {

        const fetchAudios = async () => {
          setIsAudioLoading(true);

                    const audios = await getAllAudios(project.id);
                    setAudiosFromServer(audios);

                    setIsAudioLoading(false);
                };
                fetchAudios();
               console.log("AUDIOS FROM SERVER: ", audiosFromServer)
                // if (audios.length > 0) {
                //   audios.map((audio: any) => {
                //     handleAddAudioFromServer(audio.audio_url);
                //   })
                // }

    }, [])


    // Загружаем видеофайлы с сервера
    const [ isVideoLoading, setIsVideoLoading ] = useState(false);
// const [ videosFromServer, setVideosromServer ] = useState<any>([]);
const[ videos, setVideos ] = useState<any>([]);



    useEffect(() => {

      const fetchVideos = async () => {
        setIsVideoLoading(true);

                  const videos = await getAllVideos(project.id);
                  setVideosFromServer(videos);

                  setIsVideoLoading(false);
              };
              fetchVideos();

              const fetchAudios = async () => {
                setIsVideoLoading(true);
          
                          const audios = await getAllAudios(project.id);
                          setAudiosFromServer(audios);
          
                          setIsVideoLoading(false);
                      };
                      fetchAudios();



  }, [])






  // if (videos.length) {
  //   handelAddVideoFromServer(videos[0].video_url);
  //   // videos.map((video: any) => {
  //   //   handelAddVideoFromServer(video.video_url);
  //   // })
  // }

    // если есть аудиофайлы на сервере, то добавляем их в плеер
    const addAud = () => {
  //   await handleAddAudioFromServer("https://api-dev.viduchi.ru/files/viduchi-docker/a7b5bb02-c65f-4c00-a727-06a8426186bd?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=82PpmDyMI2KniS4DuqVB%2F20250122%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250122T160501Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=799a8339128d270f9b1de6fca54b904de9bc10302570d3bf7710fe258d7c484b")

  // handelAddVideoFromServer("https://api-dev.viduchi.ru/files/viduchi-docker/9c7a217c-ed04-49cd-aedc-bc64bfdb6184?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=82PpmDyMI2KniS4DuqVB%2F20250122%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250122T175516Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=78b8e46305eddc887975d41fda93c79e9c4f34f6c668b979a5dec584e1e2861b")
    }

  //  addAud();
    // if (audios.length == 1) {
    // addAud();
    // }



  //  console.log("AUDIOS FROM SERVR:", audios)

   // handleAddAudioFromServer(audios[0].audio_url)


    // if (audios.length > 0 ) {
    // audios.map((audio: any) => {
    //    handleAddAudioFromServer(audio.audio_url);
    // })
    // }


  const [projectName, setProjectName] = useState("");
  const [isUploadMediaOpen, setIsUploadMediaOpen] = useState(true);
  const [isShown, setIsShown] = useState(false);
  // нижнее меню загрузки видео
  const [isBottomMenuUploadVideoOpen, setIsBottomMenuUploadVideoOpen] =
    useState(false);


  console.log("VIDEOS: ", videos)







    // окно субтитров
    const [isSubtitlesOpen, setIsSubtitlesOpen] = useState(true)

  const closeDropdown = () => {
    setIsShown(false);
  };



  // загрузка файлов перетаксиванием
  const [drag, setDrag] = useState(false);

  const uploadedFiles = useStore((state) => state.uploadedFiles);
  const setUploadedFiles = useStore((state) => state.setUploadedFiles);
 // console.log("zustand", uploadedFiles);

  //  subtitles
 // const isSubtitlesShown = useStore((state) => state.isSubtitlesShown);
  const setIsSubtitlesShown = useStore((state) => state.setIsSubtitlesShown);
  const isSubtitlesShown = useStore((state) => state.isSubtitlesShown);
  const [isAudioTitlesShown, setIsAudioTitlesShown] = useState(false);



  function dragStartHandler(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDrag(true);
  }

  function dragLeaveHandler(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDrag(false);
  }

  function onDropHandler(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0] as File;
    if (!file) return;

    const fileWithUrl = file as FileWithUrl;
    fileWithUrl.url = URL.createObjectURL(file);

    setUploadedFiles(fileWithUrl);
    setDrag(false);
    setIsBottomMenuUploadVideoOpen(false);
  }

  useEffect(() => {
    setProjectName(project.title);
    //  setVideoUrl("https://api-dev.viduchi.ru/files/viduchi-docker/5bd0a633-92f7-47a3-9a50-06526304a6b0?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=82PpmDyMI2KniS4DuqVB%2F20250101%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250101T061141Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=0fd294f20804f084e3042350a26b81b2209bad9b02af7a69765a087d9e65557b");
  }, []);



  // Remotion player editor data
  const { playerRef, setState } = useStore();
  useTimelineEvents();

 // const store = useStore();


useEffect(() => {
  console.log("ZUSTAND STORE TRACKS: ");
  console.log(tracks);
}, [])


  useEffect(() => {
    setIsAudioTitlesShown(isSubtitlesShown)
  }, [isSubtitlesShown, setIsAudioTitlesShown])

  const handleFileUpload = async (files: File[]) => {
    // const resourceId = "VMJQit9N0hJaCAss";
    const resourceId = generateId();
    console.log(files[0]);

    if (files[0].type == "video/mp4") {
      dispatch(ADD_VIDEO, {
        payload: {
          id: resourceId,
          display: {
            from: 2000,
            to: 7000,
          },
          details: {
            src: URL.createObjectURL(files[0]),
            name: files[0].name,
          },
          metadata: {
            resourceId,
          },
        },
      });
    }

    if (files[0].type == "audio/mpeg") {
      handleAddAudio(files);
    }
  };

  const handleFileChange = async (newFiles: File[]) => {
    const file = newFiles[0];
    if (!file) return;

    console.log("UPLOADED VIDEO FILE FROM CLIENT: ", file);
    const url = URL.createObjectURL(file);
const $video = document.createElement("video");
$video.src = url;
$video.addEventListener("loadedmetadata", function () {
 console.log("uploaded video width:", this.videoWidth);
 console.log("uploaded video height:", this.videoHeight);

 // сохранить данные ширины и высоты видео в zustand
addVideoHeight(Number(this.videoHeight));
addVideoWidth(Number(this.videoWidth));
 // при сохранении project timeline нужно будет сохранять массивы высот и ширин видосов в project timeline

});

    // загрузка файла на сервер
    // првоерить если тип файла видео то загрузить на сервер видео
if (file.type === "video/mp4") {
  // загрузить файл на сайт
  let formData = new FormData();
  formData.append("video_file", file);

  console.log("ЗАГРУЖАЕМ ФАЙЛ НА СЕРВЕР: ");

  // получаем id загруженного видоса
const uploadedFile: number = await addProjectVideo(project.id, formData);

  console.log("UPLOADED VIDEO FILE TO SERVER: ", uploadedFile);


  // если файл загружен, делаем запрос на сервер и загружаем все видосы в стор
  if (uploadedFile) {
// отделяем от видоса аудио и сохраняем на сервер

  const extractedAudio: any = await extractAudioFromProjectVideo(project.id, uploadedFile);


  console.log("EXTRACTED AUDIO FROM VIDEO FILE: ", extractedAudio);

// загружаем файл на сервер
let formDataAudio = new FormData();
 formDataAudio.append("audio_file", extractedAudio);

const resp_aud_id = await addProjectAudio(project.id, formDataAudio);


//  const resp_aud = await addProjectAudio(project.id, formDataAudio);

  // Если аудио загружено, то транскрибируем аудио и обновляем список аудио
 // if (resp_aud) {

    // транскрибируем аудио и получаем субтитры для аудио
  //  await transcribeAudio(project.id, resp_aud);

    const fetchAudios = async () => {
      setIsVideoLoading(true);

                const audios = await getAllAudios(project.id);
                setAudiosFromServer(audios);

                setIsVideoLoading(false);
            };
            fetchAudios();
  


    const fetchVideos = async () => {
      setIsVideoLoading(true);

                const videos = await getAllVideos(project.id);
                setVideosFromServer(videos);

                setIsVideoLoading(false);
            };
             fetchVideos();

// транскрибируем аудио и получаем субтитры для аудио
setIsSubtitlesGenerating(true);
// await transcribeAudio(project.id, resp_aud_id);
transcribeAudio(project.id, resp_aud_id).then(
  function() { 
    setIsSubtitlesGenerating(false);
  },
  function(error) { 
    console.log(error);
    setIsSubtitlesGenerating(false);
  }
);

 
   
  }

}

    // если аудио то загрузить аудио
    if (file.type == 'audio/mpeg') {
// загрузить файл на сайт
let formData = new FormData();
formData.append("audio_file", file);

const uploadedFile: any = await addProjectAudio(project.id, formData);
if (uploadedFile) {
  const fetchAudios = async () => {
    setIsVideoLoading(true);

              const audios = await getAllAudios(project.id);
              setAudiosFromServer(audios);

              setIsVideoLoading(false);
          };
          fetchAudios();
}

    }


    

  //  const fileWithUrl = file as FileWithUrl;
  //  fileWithUrl.url = URL.createObjectURL(file);

  //  setUploadedFiles(fileWithUrl);
    setIsBottomMenuUploadVideoOpen(false);
  };

  const handleAddImage = () => {
    dispatch(ADD_IMAGE, {
      payload: {
        id: generateId(),
        details: {
          src: "https://designcombo.imgix.net/images/sample-image.jpg",
        },
      },
    });
  };

  const handleAddVideo = () => {
    const resourceId = "VMJQit9N0hJaCAss";
    dispatch(ADD_VIDEO, {
      payload: {
        id: generateId(),
        details: {
          src: "https://designcombo.imgix.net/videos/sample-video.mp4",
          volume: 50,
        },
        metadata: {
          resourceId,
        },
      },
    });
  };
  const handleAddAudio = async (files: File[]) => {
    dispatch(ADD_AUDIO, {
      payload: {
        id: generateId(),
        details: {
          src: URL.createObjectURL(files[0]),
          volume: 100,
        },
      },
    });
  };

  const handleAddText = () => {
    dispatch(ADD_TEXT, {
      payload: {
        id: generateId(),
        details: {
          text: "Remotion",
          fontSize: 142,
          fontFamily: DEFAULT_FONT.postScriptName,
          fontUrl: DEFAULT_FONT.url,
          width: 400,
          textAlign: "left",
          color: "#ffffff",
          left: 80,
        },
      },
    });
  };

  const openLink = (url: string) => {
    window.open(url, "_blank"); // '_blank' will open the link in a new tab
  };


useEffect(() => {
 

  // если у проекта есть timeline, то загружаем в стор
  // if (project.timeline) {
  //   console.log("RROJECT TIMELINE: ", project.timeline.tracks);
  //   setTracks(project.timeline.tracks);
  //   setTrackItemsIds(project.timeline.trackItemsIds);
  //   setTrackItemsMap(project.timeline.trackItemsMap);
  // } else {
    removeAllTracks();
    removeAllSteps();
    removeAllSubtitles();
    console.log("CLEARING TRACKS FROM ZUSTAND")
    setTracks([]);
    setTrackItemsIds([]);
    setTrackItemsMap({});
    setAllSubtitles([]);
    setAllSteps([]);
    setVideoHeights([]);
    setVideoWidths([]);
    setMaxVideoHeight(0);
    setMaxVideoWidth(0);
 // }

}, [])


useEffect(() => {
  if (project.subtitles) {
    let subtitlesFromServer: any = parseSubtitlesToJson(project.subtitles!);
            setAllSubtitles(subtitlesFromServer);
  }
}, [project]);

  useEffect(() => {
    playerRef?.current?.isFullscreen
      ? setState({ playerControls: true })
      : setState({ playerControls: false });
  }, [playerRef]);

  return (
    <>
      <div className={styles.editor}>
        <aside className={styles.leftMenu}>
          <MenuIcon
          onClick={async () => {
            await handleSaveProjectData();
            removeAllTracks();
            removeAllSteps();
            removeAllSubtitles();
            router.push('/projects');
            // handleGetAndSendProjectToServer();
            // handleRenderVideoOnServer();
          }}
         // onClick={handleSaveProjectData}
       //   onClick={handleGetAndSendProjectToServer}
       // onClick={handleRenderVideoOnServer}
          />


          <nav>
            <ul>
              <li onClick={() => setIsUploadMediaOpen(!isUploadMediaOpen)}>
                <span
                className={ isUploadMediaOpen ? styles.white : styles.gray + " hovered"}>
                <FolderIcon />
                <p>Медиа</p>
                </span>

              </li>
            </ul>
          </nav>
        </aside>
        <div className={styles.headerWrapper}>
          <div className={styles.header}>
            <span
            onClick={ async () => {
              await handleSaveProjectData();
              router.push('/projects');
            }}
            className={styles.logo}>VIDUCHI</span>

            <input
              onChange={(e) => setProjectName(e.target.value)}
              type="text"
              value={projectName}
              className={styles.name}
            />

            <div className={styles.profile}>
              <UserPanel />
              <UserInfo onClick={() => setIsShown(!isShown)} />
            </div>
            {isShown && <EditorUserMenu closeDropdown={closeDropdown} />}
          </div>

          {playerRef && !isBottomMenuUploadVideoOpen && <Timeline />}




        </div>
      </div>

      <div className={styles.videoEditorWindow}>
        <div
          className={styles.videoPlayer}
         >
          {/* <Scene stateManager={stateManager} /> */}

          <Player />



          {playerRef && !isBottomMenuUploadVideoOpen && <PlayNavigation />}


        </div>

        <div className={styles.videoTopMenu}>

       {/* <CropIcon />
       <EllypsisIcon /> */}

       {/* <button
       onClick={() => {
        router.push('/subtitles/' + project.id )
       }}
       className={styles.editInstruction} >Редактировать инструкцию</button> */}

      <CreateInstruction projectId={project.id} />
   </div>
      </div>


     <RightMenu />



      {isUploadMediaOpen && (
        <div className={styles.uploadMedia}>
          <div className={styles.uploadFile}>
            <input
              style={{ display: "none" }}
              id="file-upload-handle"
              accept="*/*"
              type="file"
              onChange={(e) =>
                handleFileChange(Array.from(e.target.files || []))
              }
            />
            <label htmlFor="file-upload-handle" className={styles.uploadButton}>
              Импорт медиа
            </label>

            {/* здесь сделать иэп по коипонентам видео и аудио с сервера */}

            {
              videosFromServer.length > 0 &&
              videosFromServer.map((video: any) => (
                <VideoItemCardFromServer key={video.video_url}  videoItem={video} projectId={project.id} />

              ))
            }

            {
              audiosFromServer.length > 0 &&
              audiosFromServer.map((audio: IaudioFromServer) => (
                <AudioItemCardFromServer key={audio.audio_url}  audioItem={audio} projectId={project.id} />

              ))
            }



            {uploadedFiles.length > 0 &&
              uploadedFiles.map((uploadedFile: FileWithUrl) => {
              //  console.log(uploadedFile);
                if (uploadedFile.type === "video/mp4") {
                  return (
                    <VideoItemCard
                      key={uploadedFile.url}
                      videoItem={uploadedFile}
                      projectId={project.id}
                    />
                  );
                }

                if (uploadedFile.type === "audio/mpeg") {
                  return (
                    <AudioItemCard
                      key={uploadedFile.url}
                      audioItem={uploadedFile}
                    />
                  );
                }
                // } else if {
                //     return (<div>{uploadedFile.name}</div>)
                // } else {
                //     return (<div>{uploadedFile.name}</div>)
                // }
              })}
          </div>

          {/* if uploaded media is closed */}

          {
            // !isUploadMediaOpen && <div className={styles.dragMedia}>
            //    {playerRef && <Timeline stateManager={stateManager} />}
            // </div>
          }

          <div
          id="dragmedia"
            onDragStart={(e) => dragStartHandler(e)}
            onDragLeave={(e) => dragLeaveHandler(e)}
            onDragOver={(e) => dragStartHandler(e)}
            onDrop={(e) => onDropHandler(e)}
            className={styles.dragMedia}
            style={ videosFromServer.length > 0 || audios.length > 0 ? { display: 'none' } : { display: 'flex' } }
          >
            <Image src={uploadMediaPhoto} alt="upload media" />
            {drag ? (
              <p>
                Отпустите файлы <br /> чтобы загрузить
              </p>
            ) : (
              <p>
                Перетащите медиафайл <br /> для импорта
              </p>
            )}
          </div>
          <div
            onClick={() => setIsUploadMediaOpen(false)}
            className={styles.closeMediaMenu}
          >
            <div style={ uploadedFiles.length > 0 ? { display: 'none' } : { display: 'flex' } } className={styles.closeMediaMenuDiv}>
              <ChevronCloseIcon />
            </div>
          </div>
        </div>
      )}

      {isBottomMenuUploadVideoOpen && (
        <>
          <div
            onDragStart={(e) => dragStartHandler(e)}
            onDragLeave={(e) => dragLeaveHandler(e)}
            onDragOver={(e) => dragStartHandler(e)}
            onDrop={(e) => onDropHandler(e)}
            className={styles.bottomVideoUpload}
          >
            <Image src={kadryVideoImg} alt="kadry video" />
            {drag ? <p>Отпустите файл</p> : <p>Перетащите сюда видео</p>}
          </div>

          <div
            className={styles.hideVideoButton}
            onClick={() =>
              setIsBottomMenuUploadVideoOpen(!isBottomMenuUploadVideoOpen)
            }
          >
            <div className={styles.hideVideoButtonDiv}>
              <HideVIdeoIcon />
            </div>
          </div>
        </>
      )}
    </>
  );
}
