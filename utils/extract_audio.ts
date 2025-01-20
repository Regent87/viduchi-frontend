import { resolve } from "node:path";
import { extractAudio, getVideoMetadata } from "@remotion/renderer";
import { handleAddAudio } from "./upload";
 

// extract audio from video file
export const getAudioFromVideoAndAddToPlayer = async (videoUrl: string ) => {

    const videoSource = resolve(process.cwd(), videoUrl);
    const videoMetadata = await getVideoMetadata(videoSource);
    const audioOutput = resolve(
        process.cwd(),
        `./output-audio-path.${videoMetadata.audioFileExtension}`,
      );
    
      await extractAudio({
        videoSource,
        audioOutput,
      });

   //   handleAddAudio(audioOutput);


}



const videoSource = resolve(process.cwd(), "/Users/john/path-to-video.mp4");
 
const videoMetadata = await getVideoMetadata(videoSource);
const audioOutput = resolve(
  process.cwd(),
  `./output-audio-path.${videoMetadata.audioFileExtension}`,
);
 
await extractAudio({
  videoSource,
  audioOutput,
});