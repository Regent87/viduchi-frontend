import { Composition } from "remotion";
import CompositionVideos from "./composition";
import useStore from "../../store/store";
import Player from "./player";
import { HelloWorld } from "./HelloWorld";
import { useState, useEffect } from "react";
import { getProjectByIdForRendering } from "../../api/client/projects";
 
export const RemotionRoot: React.FC = () => {

  const [project, setproject] = useState<any>({});

    useEffect(() => {
     const fetchProject = async () => {
            
                        const project  = await getProjectByIdForRendering(118, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiZW1haWwiOiJpZGdlZXYua3VhbnlzaEBnbWFpbC5jb20iLCJhY2NvdW50X2lkIjoxMCwicm9sZSI6ImFkbWluIiwidXNlcl9pZCI6MSwiZmlyc3RfbmFtZSI6Ilx1MDQxYVx1MDQ0M1x1MDQzMFx1MDQzZFx1MDQ0Ylx1MDQ0OCIsImxhc3RfbmFtZSI6Ilx1MDQxMVx1MDQzNVx1MDQzYSIsInN1cm5hbWUiOiJcdTA0MThcdTA0MzRcdTA0MzNcdTA0MzVcdTA0MzVcdTA0MzIiLCJwaG9uZV9udW1iZXIiOiIrNzMyMTIzMjM0IiwiYXZhdGFyX3VybCI6Imh0dHBzOi8vYXBpLWRldi52aWR1Y2hpLnJ1L2ZpbGVzL3ZpZHVjaGktZG9ja2VyL2RhOGI0Y2M5LWMxMmUtNDQ2MS04NTYxLTkxYjI0NmNhYjQxYz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPTgyUHBtRHlNSTJLbmlTNER1cVZCJTJGMjAyNTAyMDQlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwMjA0VDEyNTIxM1omWC1BbXotRXhwaXJlcz02MDQ4MDAmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JlgtQW16LVNpZ25hdHVyZT1iODkwZjEzNjdhNWExZmM5ZjIxMzE4ZTViNDZjZGI5YTIwZjBjMDVlNjdiMDE2ZjY5OTFiMmU1Yjk4MzRlZWEwIn0sInR5cGUiOiJhY2Nlc3NfdG9rZW4iLCJleHAiOjE3NDM4NTc1MzMuMDE1NjEzfQ.-Il7FX_Jc4SFI1F3dretiseeG6QN6HI93in6lxrVkAQ");
                        setproject(project)
            
                       
                    };
                    fetchProject();
  }, [])

 // const { setPlayerRef, duration, fps } = useStore();

   // console.log("PROJECT FROM SERBER timeline: ", project.timeline)
  const duration = project.timeline?.duration;
  const fps = project.timeline?.fps;
  console.log("DURATION FROM SERVER IN ROOT: ", duration)
  console.log("FPS FROM SERVER IN ROOT: ", fps)

  return (
    <>
      <Composition
        // component={CompositionVideos}
         durationInFrames={846}
         fps={30}
        // width={1920}
        // height={1080}
        // width={1080}
        // height={1080}
        // fps={30}
        // id="myComp"
        // defaultProps={{}}
id="myComp"
     //   ref={playerRef}
        component={CompositionVideos}
        // defaultProps={{
        //   titleText: "Welcome to Remotion",
        //   titleColor: "#000000",
        //   logoColor1: "#91EAE4",
        //   logoColor2: "#86A8E7",
        // }}
       // durationInFrames={Math.round((duration / 1000) * 30) || 5 * 30}
        width={1100}
        height={750}
        // style={{ width: "100%", height: "100%", background: 'transparent' }}
       // inputProps={{}}
       // fps={fps}
      //  controls={false}

      />
      {/* Additional compositions can be rendered */}
    </>
  );
};