import { Isubtitle } from "@/components/SubtitlesEditor/SubtitlesEditor";

export const parseSubtitlesToJson = (subtitles: string) => {

const subtitlesArray = subtitles.split("\n\n");

// console.log(subtitlesArray[0]);

const subtitlesItems = [];

for (let i = 0; i <= subtitlesArray.length - 1; i++) {
   let data = subtitlesArray[i].split("\n");
   let subtitle = {
    id: data[0],
    timeline: data[1],
    text: data[2]
   };
   subtitlesItems.push(subtitle);
}

// console.log(subtitlesItems);
return subtitlesItems;
}


export function convertToSubtitles(segments: Isubtitle[]): string {
   return segments
       .map((segment: Isubtitle) => `${segment.id}\n${segment.timeline}\n${segment.text}`)
       .join('\n\n');
}


export const convertTimeToStep = (timeline: string) => {

   const time = timeline.split(' --> ');
   // разделяем по :
   const timeArr = String(time[0]).split(":");
   
   const hours = timeArr[0];
   const minutes = timeArr[1];
   const seconds = timeArr[2];
   // replace socneds comma to dot
   let mySeconds = seconds;
   let newSecondsString = mySeconds.replace(/,/g, ".");
   
   // count all time together
   const allTImeInSeconds = (Number(hours) * 60 * 60) + (Number(minutes) * 60) + Number(newSecondsString);
   
   console.log(allTImeInSeconds);
   return allTImeInSeconds;
   
   }