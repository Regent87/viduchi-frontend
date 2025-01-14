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
import burgerButton from "./hamburger.png";

import { UserPanel } from "@/components/UserPanel/UserPanel";
import { UserInfo } from "@/components/UserInfo/UserInfo";
import { EditorUserMenu } from "@/components/EditorUserMenu/EditorUserMenu";
import { VideoItemCard } from "@/components/VideoItemCard/VideoItemCard";
import { AudioItemCard } from "@/components/AudioItemCard/AudioItemCard";

import CropIcon from "./crop.svg";
import EllypsisIcon from "./ellypsis.svg";
import SubtitlesIcon from "./cc.svg";
import HideVIdeoIcon from "./chevronDown.svg";
import kadryVideoImg from "./kadryvideo.png";
import uploadMediaPhoto from "./upload.png";
import ChevronCloseIcon from "./chevron.svg";
import PlayNavigation from "@/components/PlayNavigation/PlayNavigation";

import { EditorProps } from "./Editor.props";


export const Editor =  ({project, className, ...props }: EditorProps ): JSX.Element => {
  //  components data
  

// const project = {
//     id: 3,
//     title: "Сварка",
//   };

  console.log(useStore.getState());

  // const handleUploadedFileChange = (newFiles: File[]) => {
  //   console.log("Нажади на загрузку файла в проигрыватель")
  //   console.log(newFiles)
  //   handleFileUpload(newFiles);
  // };

  const [projectName, setProjectName] = useState("");
  const [isUploadMediaOpen, setIsUploadMediaOpen] = useState(true);
  const [isShown, setIsShown] = useState(false);
  // нижнее меню загрузки видео
  const [isBottomMenuUploadVideoOpen, setIsBottomMenuUploadVideoOpen] =
    useState(true);

  const closeDropdown = () => {
    setIsShown(false);
  };

  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file: any = event.target.files?.[0];
  //   if (!file) return;
  //   file.url = URL.createObjectURL(file);
  //   setUploadedFiles([...uploadedFiles, file]);
  // //  store.addVideoResource(URL.createObjectURL(file));
  // };

  // загрузка файлов перетаксиванием
  const [drag, setDrag] = useState(false);

  const uploadedFiles = useStore((state) => state.uploadedFiles);
  const setUploadedFiles = useStore((state) => state.setUploadedFiles);
  console.log("zustand", uploadedFiles);

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

  const handleFileChange = (newFiles: File[]) => {
    const file = newFiles[0];
    if (!file) return;

    const fileWithUrl = file as FileWithUrl;
    fileWithUrl.url = URL.createObjectURL(file);

    setUploadedFiles(fileWithUrl);
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
          volume: 50,
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
    playerRef?.current?.isFullscreen
      ? setState({ playerControls: true })
      : setState({ playerControls: false });
  }, [playerRef]);

  return (
    <>
      <div className={styles.editor}>
        <aside className={styles.leftMenu}>
          <Image src={burgerButton} alt="main menu" />
          <nav>
            <ul>
              <li onClick={() => setIsUploadMediaOpen(!isUploadMediaOpen)}>
                <FolderIcon />
                <p>Медиа</p>
              </li>
            </ul>
          </nav>
        </aside>
        <div className={styles.headerWrapper}>
          <div className={styles.header}>
            <span className={styles.logo}>VIDUCHI</span>

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
        <div className={styles.videoPlayer}>
          {/* <Scene stateManager={stateManager} /> */}
          <Player />

          {playerRef && !isBottomMenuUploadVideoOpen && <PlayNavigation />}


        </div>

        {/* <div className={styles.videoTopMenu}>
       <Image src={cubeIcon} alt="cube icon" />
       <CropIcon />
       <EllypsisIcon />
   </div> */}
      </div>

      {/* right menu with subtitles */}
      <div className={styles.navRight}>
        <nav>
          <ul>
            <li>
              <SubtitlesIcon />
              <p>Субтитры</p>
            </li>
          </ul>
        </nav>
      </div>

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

            {uploadedFiles.length > 0 &&
              uploadedFiles.map((uploadedFile: FileWithUrl) => {
                console.log(uploadedFile);
                if (uploadedFile.type === "video/mp4") {
                  return (
                    <VideoItemCard
                      key={uploadedFile.url}
                      videoItem={uploadedFile}
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
            onDragStart={(e) => dragStartHandler(e)}
            onDragLeave={(e) => dragLeaveHandler(e)}
            onDragOver={(e) => dragStartHandler(e)}
            onDrop={(e) => onDropHandler(e)}
            className={styles.dragMedia}
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
            <div className={styles.closeMediaMenuDiv}>
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
