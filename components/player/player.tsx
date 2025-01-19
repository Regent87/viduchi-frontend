"use client"

import { useEffect, useRef, useState } from "react";
import Composition from "./composition";
import { Player as RemotionPlayer, PlayerRef } from "@remotion/player";
import useStore from "../../store/store";

const Player = () => {
  const playerRef: any = useRef<PlayerRef>(null);
  const { setPlayerRef, duration, fps } = useStore();

  const [controlsVar, setControlsVar] = useState(false)

  const { setState } = useStore()

  const theState = useStore.getState();

  // theState.playerControls;

  // if (playerRef.current?.isFullscreen) {
  //   setControlsVar(true);
  // }

  useEffect(() => {
    setPlayerRef(playerRef);

  // setState({ playerControls: controlsVar })
    setControlsVar(theState.playerControls)
 
  }, [controlsVar, useStore]);



  return (
    <>
    <RemotionPlayer
      ref={playerRef}
      component={Composition}
      durationInFrames={Math.round((duration / 1000) * fps) || 5 * 30}
      compositionWidth={1100}
      compositionHeight={750}
      style={{ width: "100%", height: "100%", background: 'transparent' }}
      inputProps={{}}
      fps={fps}
      controls={false}
    />

</>
  );
};

export default Player;

