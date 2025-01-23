import { DetailedHTMLProps, HTMLAttributes, useState } from "react";
import useStore from "@/store/store";
import { IconButton } from "../ui/iconButton";
import { handleFileUpload } from "@/utils/upload";
import styles from "./VideoItemCardFromServer.module.css";

import AddFileIcon from './add.svg';
import RemoveFileIcon from './remove.svg';
import { extractAudio } from "@/utils/extract-audio-from-video";



interface VideoItemCardProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  videoItem: any;
  projectId: number;
}

export const VideoItemCardFromServer = ({ videoItem, projectId }: VideoItemCardProps) => {
  const [isMediaFileDeleteMenuOpen, setIsMediaFileDeleteMenuOpen] =
    useState(false);

  const deleteUploadedFile = useStore((state) => state.deleteUploadedFile);

  function handleShowAddDeleteMediaFile() {
    setIsMediaFileDeleteMenuOpen(true);
  }

  function handleHideAddDeleteMediaFile() {
    setIsMediaFileDeleteMenuOpen(false);
    // setTimeout(() => {
    //   setIsMediaFileDeleteMenuOpen(false);
    // }, 1000);
  }

  return (
    <div
      onMouseEnter={handleShowAddDeleteMediaFile}
      onMouseLeave={handleHideAddDeleteMediaFile}
      className={styles.videoItem}
    >
      
      {isMediaFileDeleteMenuOpen && (
        <div className={styles.deleteVideo}>
          <RemoveFileIcon  onClick={() => deleteUploadedFile(videoItem.url)} />

          

        </div>
      )}
      {isMediaFileDeleteMenuOpen && (
        <div className={styles.addVideo}>

          <AddFileIcon 

     
         onClick={() => handleFileUpload(videoItem, projectId)}
           />

        
        
        </div>
      )}
      <video>
        <source src={videoItem.video_url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* <p className={styles.title}>{videoItem.name}</p> */}
    </div>
  );
};
