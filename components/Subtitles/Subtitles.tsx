import { useEffect, useState } from "react";
import SubtitleSequence from "../../utils/subtitle-sequence";
import { SubtitlesCaption } from "../SubtitlesCaption/SubtitlesCaption";
import { Audio, Video } from "remotion";
import { useVideoConfig, staticFile } from "remotion";

import useStore from "../../store/store";
import { convertToSubtitles } from "@/utils/subtitles";



export const Subtitles = () => {
  const isSubtitlesShown = useStore((state) => state.isSubtitlesShown);

  const tracks = useStore((state) => state.tracks);
  const trackItemsMap = useStore((state) => state.trackItemsMap);
  const subtitles_from_store = useStore((state) => state.subtitles);

  // get subtitles from first audio subtitles from store
  // let audios = tracks.filter((item: any) => item.type === "audio");
  // const audio_Id = Number(audios[0].items[0].split("-")[1]);

    const { fps } = useVideoConfig();
    let [Sequences, setSequences] = useState<any>([]);
    const [loaded, setLoaded] = useState(false);

    let audio_url = "";

    // get audio src
    Object.keys(trackItemsMap).forEach(function(key) {

      //  console.log(key, videos[key]);
      
      if (trackItemsMap[key].type == "audio") {
      // console.log(videos[key]);
      
      // console.log(videos[key].details);
      audio_url = trackItemsMap[key].details.src;
     
      
      
      }
      
      });


  //  let subtitles = new SubtitleSequence("audio.srt"); // Your srt filename from public folder.
  // convert subtitles from store to string
  let converted_subtitles = convertToSubtitles(subtitles_from_store)
  let subtitles = new SubtitleSequence(converted_subtitles); // from store

  // setSequences(subtitles.getSequences(<SubtitlesCaption />, fps));
  // setLoaded(true);

    useEffect(() => {

      setSequences(subtitles.getSequences(<SubtitlesCaption />, fps));
      setLoaded(true);
      // subtitles.ready().then(() => {
      //   setSequences(subtitles.getSequences(<SubtitlesCaption />, fps));
      //   setLoaded(true);
      // });


    }, []);


    return (
      <>
        {loaded && isSubtitlesShown ? (
          <>
           {/* <Audio src={staticFile("tuyo.mp3")} /> {Sequences} */}
           {/* <Audio src="https://api-dev.viduchi.ru/files/viduchi-docker/4d3816ae-ef27-42b0-9cb8-5111702a10dc?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=82PpmDyMI2KniS4DuqVB%2F20250125%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250125T093418Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=620ba08172a985e81cab16ef32781b77c9cc4c0e194ea55d2690f54acb050f53" />  {Sequences} */}
            {/* <Audio src={staticFile("my.mp3")} /> {Sequences} */}
            {/* <Audio src={audio_url} />  */}
            {Sequences}
          </>
        ) : <><div></div></>}
      </>
    );
  };