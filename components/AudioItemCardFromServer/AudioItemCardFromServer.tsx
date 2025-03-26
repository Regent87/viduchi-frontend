import { useState } from "react";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import Image from "next/image";
import SoundIcon from "./sound.svg";
import { handleAddAudioFromServer, handleFileUpload } from "@/utils/upload";
import useStore from "@/store/store";
import { IconButton } from "../ui/iconButton";
import styles from "./AudioItemCardFromServer.module.css";

import AddFileIcon from './add.svg';
import RemoveFileIcon from './remove.svg';
import { IaudioFromServer } from "@/interfaces/video.interface";
import { deleteAudioFromProject, getAllAudios } from "@/api/client/projects";
import { identity } from "rxjs";

export interface AudioItemCardProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  audioItem: IaudioFromServer;
  projectId: number;
}

export const AudioItemCardFromServer= ({ audioItem, projectId }: AudioItemCardProps) => {

 // zustand store
 const setAudiosFromServer = useStore((state) => state.setAllAudiosFromServer);


 const handleDeleteAudioFromServer = async (id: number, audioId: number) => {
    await deleteAudioFromProject(id, audioId);

    const fetchAudios = async () => {
         // setIsVideoLoading(true);
        
                    const audios = await getAllAudios(projectId);
                    setAudiosFromServer(audios);
        
                 //   setIsVideoLoading(false);
                };
                fetchAudios();
 }


  const [isMediaFileDeleteMenuOpen, setIsMediaFileDeleteMenuOpen] =
    useState(false);

  const deleteUploadedFile = useStore((state) => state.deleteUploadedFile);

  function handleShowAddDeleteMediaFile() {
    setIsMediaFileDeleteMenuOpen(true);
  }

  function handleHideAddDeleteMediaFile() {
    setTimeout(() => {
      setIsMediaFileDeleteMenuOpen(false);
    }, 1000);
  }

  return (
    <div
      onMouseEnter={handleShowAddDeleteMediaFile}
      onMouseLeave={handleHideAddDeleteMediaFile}
      className={styles.audioItem}
    >
      {/* <Image src={soundIcon} alt="sound icon" /> */}
      <SoundIcon className={styles.audoiIcon} />
      <span className={styles.title}>{"audio.mp3"}</span>
      {isMediaFileDeleteMenuOpen && (
        <div className={styles.deleteAudio}>

          <RemoveFileIcon onClick={() => handleDeleteAudioFromServer(projectId, audioItem.id)} />
          {/* <IconButton
            size={24}
            onClick={() => deleteUploadedFile(audioItem.url)}
          >
            <svg width={24} height={24}>
              <use href={"sprite.svg#remove_media"} />
            </svg>
          </IconButton> */}

        </div>
      )}
      {isMediaFileDeleteMenuOpen && (
        <div className={styles.addAudio}>

          <AddFileIcon onClick={() => handleAddAudioFromServer(audioItem.audio_url, audioItem.id)} />

          {/* <IconButton size={24} onClick={() => handleFileUpload(audioItem)}>
            <svg width={24} height={24}>
              <use href={"sprite.svg#add_media"} />
            </svg>
          </IconButton> */}

        </div>
      )}
    </div>
  );
};
