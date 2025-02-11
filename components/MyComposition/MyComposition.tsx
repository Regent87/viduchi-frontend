import {AbsoluteFill, Video} from 'remotion';
import { MyAudio } from '../MyAudio/MyAudio';
 
type VideoProps = {
  videoURL: string;
};
 
export const MyComposition: React.FC<VideoProps> = ({videoURL}) => {
  return (

     <AbsoluteFill>
      <Video src={videoURL} />
     </AbsoluteFill>
  );
};