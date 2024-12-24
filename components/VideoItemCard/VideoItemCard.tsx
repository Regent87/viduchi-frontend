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

    return (

    <div
    onMouseEnter={handleShowAddDeleteMediaFile} 
    onMouseLeave={() => setIsMediaFileDeleteMenuOpen(false)} 
    className={styles.videoItem}>
        { isMediaFileDeleteMenuOpen && <Image className={styles.addVideo} src={addMediaIcon} alt="Add file" /> }
        
   <video>
<source src={videoItem.url} type="video/mp4" />
Your browser does not support the video tag.
</video>
<p>{videoItem.name}</p>
{ isMediaFileDeleteMenuOpen && <Image className={styles.addVideo} src={deleteMediaIcon} alt="Delete file" /> }
</div>
    )
}