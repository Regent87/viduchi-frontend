import styles from './AudioItemCard.module.css'
import { AudioItemCardProps } from './AudioItemCard.props';
import addMediaIcon from './add_media.png';
import deleteMediaIcon from './delete_media.png';
import { useState } from "react";
import Image from "next/image";
import soundIcon from './sound.png';



export const AudioItemCard = ({ audioItem, className, ...props }: AudioItemCardProps): JSX.Element => {

     // showing adding and deleting media file elements
          const [isMediaFileDeleteMenuOpen, setIsMediaFileDeleteMenuOpen] = useState(false);
    
           function handleShowAddDeleteMediaFile() {
            setIsMediaFileDeleteMenuOpen(true);
           }
    
           function handleHideAddDeleteMediaFile() {
            setTimeout(() => {
                setIsMediaFileDeleteMenuOpen(false);
            }, 1000)
           
           } 

    return (
        <>
        { isMediaFileDeleteMenuOpen && <Image className={styles.addVideo} src={addMediaIcon} alt="Add file" /> }
        <div 
        onMouseEnter={handleShowAddDeleteMediaFile} 
        onMouseLeave={handleHideAddDeleteMediaFile} 
        className={styles.audioItem}> <Image src={soundIcon} alt="sound icon" /> {audioItem.name}</div>
        { isMediaFileDeleteMenuOpen && <Image className={styles.deleteVideo} src={deleteMediaIcon} alt="Delete file" /> }
        </>
    )
}