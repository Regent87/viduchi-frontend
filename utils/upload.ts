import {
    ADD_AUDIO,
    ADD_IMAGE,
    ADD_TEXT,
    ADD_VIDEO,
    dispatch
  } from "@designcombo/events";
  import { generateId } from "@designcombo/timeline";

export const handleAddAudio = async (file: File) => {
    dispatch(ADD_AUDIO, {
      payload: {
        id: generateId(),
        details: {
          src:  URL.createObjectURL(file),
          volume: 50
        }
      }
    });
  };


 export const handleFileUpload = async (file: File) => {
    // const resourceId = "VMJQit9N0hJaCAss";
    const resourceId = generateId();
console.log(file);

if (file.type == 'video/mp4') {
  dispatch(ADD_VIDEO, {
    payload: {
      id: resourceId,
      display: {
        from: 2000,
        to: 7000
      },
      details: {
        src: URL.createObjectURL(file),
        name: file.name
      },
      metadata: {
        resourceId
      }
    }
  });
} 

if (file.type == 'audio/mpeg') {

   handleAddAudio(file);


}

   
  };