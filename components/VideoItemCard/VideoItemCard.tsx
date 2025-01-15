import { DetailedHTMLProps, HTMLAttributes, useState } from "react";
import useStore from "@/store/store";
import { IconButton } from "../ui/iconButton";
import { handleFileUpload } from "@/utils/upload";
import styles from "./VideoItemCard.module.css";

import AddFileIcon from './add.svg';
import RemoveFileIcon from './remove.svg';

interface VideoItemCardProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  videoItem: FileWithUrl;
  projectId: number;
}

export const VideoItemCard = ({ videoItem, projectId }: VideoItemCardProps) => {
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

          {/* <IconButton
            size={24}
            onClick={() => deleteUploadedFile(videoItem.url)}
          >
            <svg width={24} height={24}>
              <use href={"sprite.svg#remove_media"} />
            </svg>
          </IconButton> */}

        </div>
      )}
      {isMediaFileDeleteMenuOpen && (
        <div className={styles.addVideo}>

          <AddFileIcon onClick={() => handleFileUpload(videoItem, projectId)} />

          {/* <IconButton size={24} onClick={() => handleFileUpload(videoItem)}>
            <svg width={24} height={24}>
              <use href={"sprite.svg#add_media"} />
            </svg>
          </IconButton> */}
        
        </div>
      )}
      <video>
        <source src={videoItem.url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <p className={styles.title}>{videoItem.name}</p>
    </div>
  );
};
