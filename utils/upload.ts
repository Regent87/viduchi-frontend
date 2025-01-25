import { addProjectVideo } from "@/api/client/projects";
import { IVideo } from "@/interfaces/video.interface";
import {
    ADD_AUDIO,
    ADD_IMAGE,
    ADD_TEXT,
    ADD_VIDEO,
    dispatch
  } from "@designcombo/events";
  import { generateId } from "@designcombo/timeline";


  // добавить видео с сервера в плеер
  export const handelAddVideoFromServer = async (url: string) => {
    dispatch(ADD_VIDEO, {
      payload: {
        id: generateId(),
        display: {
          from: 2000,
          to: 7000
        },
        details: {
           src: url,
        //  src: uploadedFile.url,
        //  name: uploadedFile.title,
        // name: file.name,
          volume: 100
        },
        metadata: {
          url
        }
      }
    });
  }

  // добавить аудио в плеер с сервера
  export const handleAddAudioFromServer = async (url: string) => {
    dispatch(ADD_AUDIO, {
      payload: {
        id: generateId(),
        details: {
          src: url,
          volume: 100
        }
      }
    })
  }


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


 export const handleFileUpload = async (file: File, projectId: number) => {
    // const resourceId = "VMJQit9N0hJaCAss";
    // загружаем файл на сервер
 //   const uploadedFile: any = await addProjectVideo(projectId, file);

    const resourceId = generateId();
 //  const resourceId = uploadedFile.id;
// console.log(file);

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
      //  src: uploadedFile.url,
      //  name: uploadedFile.title,
      name: file.name,
        volume: 0
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