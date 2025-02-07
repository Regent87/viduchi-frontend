import { useEffect, useState } from "react";
import SubtitleSequence from "../../utils/subtitle-sequence";
import { SubtitlesCaption } from "../SubtitlesCaption/SubtitlesCaption";
import { Audio, Video } from "remotion";
import { useVideoConfig, staticFile } from "remotion";

import useStore from "../../store/store";



export const Subtitles = () => {
  const isSubtitlesShown = useStore((state) => state.isSubtitlesShown);

  const tracks = useStore((state) => state.tracks);

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
           {/* <Audio src={staticFile("tuyo.mp3")} /> {Sequences} */}
           {/* <Audio src="https://api-dev.viduchi.ru/files/viduchi-docker/4d3816ae-ef27-42b0-9cb8-5111702a10dc?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=82PpmDyMI2KniS4DuqVB%2F20250125%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250125T093418Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=620ba08172a985e81cab16ef32781b77c9cc4c0e194ea55d2690f54acb050f53" />  {Sequences} */}
            <Audio src={staticFile("my.mp3")} /> {Sequences}
          </>
        ) : <><div></div></>}
      </>
    );
  };