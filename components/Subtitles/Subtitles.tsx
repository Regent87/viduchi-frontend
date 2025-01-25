import { useEffect, useState } from "react";
import SubtitleSequence from "../../utils/subtitle-sequence";
import { SubtitlesCaption } from "../SubtitlesCaption/SubtitlesCaption";
import { Audio, Video } from "remotion";
import { useVideoConfig, staticFile } from "remotion";

import useStore from "@/store/store";



export const Subtitles = () => {
  const isSubtitlesShown = useStore((state) => state.isSubtitlesShown);

    const { fps } = useVideoConfig();
    let [Sequences, setSequences] = useState<any>([]);
    const [loaded, setLoaded] = useState(false);
    let subtitles = new SubtitleSequence("audio.srt"); // Your srt filename from public folder.
    useEffect(() => {
      subtitles.ready().then(() => {
        setSequences(subtitles.getSequences(<SubtitlesCaption />, fps));
        setLoaded(true);
      });
    }, []);
    return (
      <>
        {loaded && isSubtitlesShown ? (
          <>
           <Audio src={staticFile("tuyo.mp3")} /> {Sequences}

            {/* <Audio src={staticFile("tuyo.mp3")} /> {Sequences} */}
          </>
        ) : <><div></div></>}
      </>
    );
  };