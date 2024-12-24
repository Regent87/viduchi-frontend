import { VideoItemCardProps } from "./VideoItemCard.props";
import styles from './VideoItemCard.module.css';
import addMediaIcon from './add_media.png';
import deleteMediaIcon from './delete_media.png';
import { useState } from "react";
import Image from "next/image";


export const VIdeoItemCard = ({ videoItem, className, ...props }: VideoItemCardProps): JSX.Element => {


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
    className={styles.videoItem}>
       
        
   <video>
<source src={videoItem.url} type="video/mp4" />
Your browser does not support the video tag.
</video>
<p>{videoItem.name}</p>

</div>
{ isMediaFileDeleteMenuOpen && <Image className={styles.deleteVideo} src={deleteMediaIcon} alt="Delete file" /> }
</>
    )
}