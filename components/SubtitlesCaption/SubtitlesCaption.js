import {
    useCurrentFrame, useVideoConfig,
    interpolate
  } from "remotion";
  import React from "react";
  export const SubtitlesCaption = ({ text, style }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const opacity = interpolate(frame, [0, 5], [0, 1], {
      extrapolateRight: 'clamp',
    });
  
    const styleCombined = {
      fontFamily: 'Arial',
      fontSize: '7vmin',
      textAlign: 'center',
      fontWeight: 'bold',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      color: 'white',
      textShadow: "-1px 1px 10px rgba(1, 1, 1, 0.95)",
      position: "absolute",
      bottom: "50px",
      marginBottom: '10px',
      left: "50%",
      transform: "translateX(-50%)",
      opacity,
      ...style
    };
  
    return <span style={styleCombined}>{text}</span>;
  };