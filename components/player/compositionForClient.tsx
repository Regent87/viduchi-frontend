import { useState, useEffect } from "react";
import useStore from "../../store/store";
import { SequenceItem } from "./sequence-item";




type ItemType = "text" | "image" | "video" | "audio";

const CompositionVideosForClient = () => {

  

  // брать данные из проекта по id. если этих данных нет, то тогда из стора



    const { trackItemIds, trackItemsMap, fps } = useStore();

  // console.log("PROJECT FROM SERBER timeline: ", project.timeline)
//   const trackItemIds = project.timeline?.trackItemIds;
//   const trackItemsMap = project.timeline?.trackItemsMap;
//   const fps = project.timeline?.fps;
 // const { trackItemIds, trackItemsMap, fps } = project.timeline;
  return (
    <>
      {trackItemIds?.map((id: any) => {
        const item = trackItemsMap[id];
        return SequenceItem[item.type as ItemType](item, {
          fps
        });
      })}
    </>
  );
};

export default CompositionVideosForClient;
