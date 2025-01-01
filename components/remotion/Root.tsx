import React from 'react';
import {Composition} from 'remotion';
import {MyVideo} from './Composition';
import { Player } from "@remotion/player";
 
export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Empty"
        component={MyVideo}
        durationInFrames={60}
        fps={30}
        width={1280}
        height={720}
      />
       <Player
        style={{
            width: '100%',
            height: '100%'
        }}
          component={MyVideo}
          durationInFrames={120}
          compositionWidth={1920}
          compositionHeight={1080}
          fps={30}
          inputProps={{videoURL: "https://api-dev.viduchi.ru/files/viduchi-docker/6a16fed5-ac15-431a-ba5e-6eb07753c87a?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=82PpmDyMI2KniS4DuqVB%2F20241230%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20241230T153520Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=ad70d628cc981fa2f84ee4d05f37b7d788dc5adeb0fa22a6b07e98cdcadb76cd"}}
          controls
        />
    </>
  );
};