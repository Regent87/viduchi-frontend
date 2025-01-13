import { useState } from "react";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import Image from "next/image";
import SoundIcon from "./sound.svg";
import { handleFileUpload } from "@/utils/upload";
import useStore from "@/store/store";
import { IconButton } from "../ui/iconButton";
import styles from "./AudioItemCard.module.css";

import AddFileIcon from './add.svg';
import RemoveFileIcon from './remove.svg';

export interface AudioItemCardProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  audioItem: FileWithUrl;
}

export const AudioItemCard = ({ audioItem }: AudioItemCardProps) => {
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
      <span className={styles.title}>{audioItem.name}</span>
      {isMediaFileDeleteMenuOpen && (
        <div className={styles.deleteAudio}>

          <RemoveFileIcon onClick={() => deleteUploadedFile(audioItem.url)} />
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

          <AddFileIcon onClick={() => handleFileUpload(audioItem)} />

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
