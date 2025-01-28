
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