import { addProjectVideo } from "@/api/client/projects";
import { IVideo, IvideoFromServer } from "@/interfaces/video.interface";
import {
    ADD_AUDIO,
    ADD_IMAGE,
    ADD_TEXT,
    ADD_VIDEO,
    dispatch
  } from "@designcombo/events";
  import { generateId } from "@designcombo/timeline";


  // добавить видео с сервера в плеер
  export const handelAddVideoFromServer = async (url: string, id: number) => {
    dispatch(ADD_VIDEO, {
      payload: {
        id: generateId() + `-${id}`,
        display: {
          from: 2000,
          to: 7000
        },
        details: {
           src: url,
        //  src: uploadedFile.url,
        //  name: uploadedFile.title,
        // name: file.name,
          volume: 0
        },
        metadata: {
          url
        }
      }
    });
  }

  // добавить аудио в плеер с сервера
  export const handleAddAudioFromServer = async (url: string, id: number) => {
    dispatch(ADD_AUDIO, {
      payload: {
        id: generateId() + `-${id}`,
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
        volume: 100
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




  export const handleVideoUploadFromServer = async (file: IvideoFromServer) => {
    dispatch(ADD_VIDEO, {
      payload: {
      //  id: resourceId,
        display: {
          from: 2000,
          to: 7000
        },
        details: {
           src: file.video_url,
          volume: 100
        },
        metadata: {
          file
        }
      }
    });
  }