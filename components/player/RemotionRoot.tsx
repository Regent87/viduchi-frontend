import { Composition } from "remotion";
import CompositionVideos from "./composition";
import useStore from "../../store/store";
import Player from "./player";
import { HelloWorld } from "./HelloWorld";

 
export const RemotionRoot: React.FC = () => {

  const { setPlayerRef, duration, fps } = useStore();

  return (
    <>
      <Composition
        // component={CompositionVideos}
         durationInFrames={150}
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
     //   durationInFrames={Math.round((duration / 1000) * fps) || 5 * 30}
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