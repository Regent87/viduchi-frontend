import { VideoItemCardProps } from "./VideoItemCard.props";
import styles from './VideoItemCard.module.css';
import addMediaIcon from './add_media.png';
import deleteMediaIcon from './delete_media.png';
import { useState } from "react";
import Image from "next/image";


export const VideoItemCard = ({ videoItem, onDelete, className, ...props }: VideoItemCardProps): JSX.Element => {


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

{ isMediaFileDeleteMenuOpen && <Image 
onClick={() => {
 console.log('cliked')
    onDelete(videoItem.url)

}}
className={styles.deleteVideo} src={deleteMediaIcon} alt="Delete file" /> }
</>
    )
}