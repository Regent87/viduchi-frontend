import { useState, useEffect } from "react";
import useStore from "../../store/store";
import { SequenceItem } from "./sequence-item";
import { getProjectByIdForRendering } from "../../api/client/projects";

import projectData from '../../public/project.json';


type ItemType = "text" | "image" | "video" | "audio";

const CompositionVideos = () => {

  const [project, setProject] = useState<any>({});

  useEffect(() => {

    setProject(projectData);

  }, [])

  // брать данные из проекта по id. если этих данных нет, то тогда из стора

  // useEffect(() => {
  //    const fetchProject = async () => {
            
  //                       const project  = await getProjectByIdForRendering(118, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiZW1haWwiOiJpZGdlZXYua3VhbnlzaEBnbWFpbC5jb20iLCJhY2NvdW50X2lkIjoxMCwicm9sZSI6ImFkbWluIiwidXNlcl9pZCI6MSwiZmlyc3RfbmFtZSI6Ilx1MDQxYVx1MDQ0M1x1MDQzMFx1MDQzZFx1MDQ0Ylx1MDQ0OCIsImxhc3RfbmFtZSI6Ilx1MDQxMVx1MDQzNVx1MDQzYSIsInN1cm5hbWUiOiJcdTA0MThcdTA0MzRcdTA0MzNcdTA0MzVcdTA0MzVcdTA0MzIiLCJwaG9uZV9udW1iZXIiOiIrNzMyMTIzMjM0IiwiYXZhdGFyX3VybCI6Imh0dHBzOi8vYXBpLWRldi52aWR1Y2hpLnJ1L2ZpbGVzL3ZpZHVjaGktZG9ja2VyL2RhOGI0Y2M5LWMxMmUtNDQ2MS04NTYxLTkxYjI0NmNhYjQxYz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPTgyUHBtRHlNSTJLbmlTNER1cVZCJTJGMjAyNTAyMDQlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwMjA0VDEyNTIxM1omWC1BbXotRXhwaXJlcz02MDQ4MDAmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JlgtQW16LVNpZ25hdHVyZT1iODkwZjEzNjdhNWExZmM5ZjIxMzE4ZTViNDZjZGI5YTIwZjBjMDVlNjdiMDE2ZjY5OTFiMmU1Yjk4MzRlZWEwIn0sInR5cGUiOiJhY2Nlc3NfdG9rZW4iLCJleHAiOjE3NDM4NTc1MzMuMDE1NjEzfQ.-Il7FX_Jc4SFI1F3dretiseeG6QN6HI93in6lxrVkAQ");
  //                       setproject(project)
            
                       
  //                   };
  //                   fetchProject();
  // }, [])

   // const { trackItemIds, trackItemsMap, fps } = useStore();

  console.log("PROJECT FROM SERBER timeline: ", project.timeline)
  const trackItemIds = project.timeline?.trackItemIds;
  const trackItemsMap = project.timeline?.trackItemsMap;
  const fps = project.timeline?.fps;
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

export default CompositionVideos;
