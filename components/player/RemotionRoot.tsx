import { Composition } from "remotion";
import CompositionVideos from "./composition";
 
export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        component={CompositionVideos}
        durationInFrames={300}
        width={1080}
        height={1080}
        fps={30}
        id="myComp"
        defaultProps={{}}
      />
      {/* Additional compositions can be rendered */}
    </>
  );
};