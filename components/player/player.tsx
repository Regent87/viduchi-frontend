"use client"

import { useEffect, useRef, useState } from "react";
import CompositionVideos from "./composition";
import { Player as RemotionPlayer, PlayerRef } from "@remotion/player";
import useStore from "../../store/store";
import CompositionVideosForClient from "./compositionForClient";





const Player = () => {
  const playerRef: any = useRef<PlayerRef>(null);
  const { setPlayerRef, duration, fps } = useStore();

  const [controlsVar, setControlsVar] = useState(false)

  const { setState } = useStore()

  const theState = useStore.getState();

  // zustand store
const videoHeights = useStore((state) => state.videoHeights);
const videoWidths = useStore((state) => state.videoWidths);
const max_width = Math.max.apply(Math, videoWidths);
const max_height = Math.max.apply(Math, videoHeights);


  useEffect(() => {
    setPlayerRef(playerRef);

  // setState({ playerControls: controlsVar })
    setControlsVar(theState.playerControls)
 
  }, [controlsVar, useStore]);



  return (
   
    <RemotionPlayer
      ref={playerRef}
      component={CompositionVideosForClient}
    
      durationInFrames={Math.round((duration / 1000) * fps) || 5 * 30}
      // compositionWidth={1100}
      // compositionHeight={750}
      compositionWidth={1200}
      compositionHeight={750}
        style={{ width: "100%", height: "100%", backgroundColor: 'transparent'}}
      inputProps={{}}
      fps={fps}
      controls={false}
    />


  );
};

export default Player;

