import PlayIcon from './play.svg';
import PreviousIcon from './previous.svg';
import NextIcon from './next.svg';
import RefreshIcon from './refresh.svg';
import RefreshForwardIcon from './refreshForward.svg';
import MaximiseIcon from './maximise.svg';
import PauseIcon from './pause.svg';

import styles from './PlayNavigation.module.css';

// import { Button } from "../components/ui/button";
import {
  ACTIVE_SPLIT,
  LAYER_CLONE,
  LAYER_DELETE,
  PLAYER_PAUSE,
  PLAYER_PLAY,
  TIMELINE_SCALE_CHANGED,
 DRAG_START,
 DRAG_END,
 PLAYER_SEEK,
 PLAYER_TOGGLE_PLAY,

  
  dispatch,
} from "@designcombo/events";
import { frameToTimeString, getCurrentTime, timeToString } from "../../utils/time";
import useStore from "../../store/store";
import { SquareSplitHorizontal, Trash, ZoomIn, ZoomOut } from "lucide-react";
// import {
//   getFitZoomLevel,
//   getNextZoomLevel,
//   getPreviousZoomLevel,
//   getZoomByIndex,
// } from "../utils/timeline";
import { useCurrentPlayerFrame } from "../../hooks/use-current-frame";

import { useEffect, useState } from "react";
import useUpdateAnsestors from "../../hooks/use-update-ansestors";
import { ITimelineScaleState } from "@designcombo/types";

const PlayNavigation = () => {
  const [playing, setPlaying] = useState(false);
  const { setState, duration, fps, scale, playerRef, activeIds } = useStore();

  const theState = useStore.getState();

  useUpdateAnsestors({ playing, playerRef });

  const currentFrame = useCurrentPlayerFrame(playerRef!);

  const doActiveDelete = () => {
    dispatch(LAYER_DELETE);
  };

  const doActiveSplit = () => {
    dispatch(ACTIVE_SPLIT, {
      payload: {},
      options: {
        time: getCurrentTime(),
      },
    });
  };

  const changeScale = (scale: ITimelineScaleState) => {
    dispatch(TIMELINE_SCALE_CHANGED, {
      payload: {
        scale,
      },
    });
  };

  const handlePlay = () => {
    dispatch(PLAYER_PLAY);
  };

  const handlePause = () => {
    dispatch(PLAYER_PAUSE);
  };

  const maximise = () => {
    playerRef?.current?.requestFullscreen();
    setState({ playerControls: true })
    
  }

  const returnToStart = () => {
   
   playerRef?.current?.seekTo(0);
  }

  const moveToEnd = () => {
  playerRef?.current?.seekTo(duration);
  }

  const moveBack15Sec = () => {
    playerRef?.current?.seekTo(currentFrame - 15);
  }

  const moveForward15Sec = () => {
    playerRef?.current?.seekTo(currentFrame + 15);
  }



  useEffect(() => {
    playerRef?.current?.addEventListener("play", () => {
      setPlaying(true);
    });
    playerRef?.current?.addEventListener("pause", () => {
      setPlaying(false);
    });
    return () => {
      playerRef?.current?.removeEventListener("play", () => {
        setPlaying(true);
      });
      playerRef?.current?.removeEventListener("pause", () => {
        setPlaying(false);
      });
    };
  }, [playerRef]);

  return (


     <div className={styles.videoBottomMenu}>
    <span className={styles.icons}>
         <PreviousIcon
         onClick={() => {
          return returnToStart();
         }} 
         />
         </span>
         <span className={styles.icons}>
         <RefreshIcon
         onClick={moveBack15Sec}
         />
         </span>
         <span
          onClick={() => {
            if (playing) {
                   return handlePause();
                 }
               handlePlay();
             }}
         className={styles.icons}>

          {  
            playing ? (
            <PauseIcon onClick={handlePlay} />
            ) : (
<PlayIcon onClick={handlePause} />
            ) 
          }

         {/* <PlayIcon
         onClick={() => {
                     if (playing) {

                       //     return handlePause();
                       return <PauseIcon onClick={handlePause} />
                          }
                        handlePlay();
                      }}
         /> */}
         </span>
         <span className={styles.icons}>
        <RefreshForwardIcon
        onClick={moveForward15Sec}
        />
        </span>
        <span className={styles.icons}>
        <NextIcon
        onClick={moveToEnd} 
        />
        </span>
        
       <span className={styles.maximise}>
       <MaximiseIcon
       onClick={maximise}
       />
       </span>
        </div> 

    


  );
};



export default PlayNavigation;
