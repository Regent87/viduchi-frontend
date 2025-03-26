import { API } from "../../app/api";
import { ProjectModel } from "@/interfaces/project.interface";
import { ITrack, ITrackItem } from "@designcombo/timeline";


export const updateProjectTitle = async (id: number, title: string) => {
    const token = localStorage.getItem('jwt_token');

    const response = await fetch(API.projects.editTitle(id), {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(title),

    });

    if (!response.ok) {
        throw new Error('Failed to update project');
    }

    return true;
};

export const createProject = async (title: string) => {
    const token = localStorage.getItem('jwt_token');

    const response = await fetch(API.projects.create, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title }),
    });

    if (!response.ok) {
        throw new Error('Failed to create project');
    }

    return await response.json();
};

export const getProjects = async (): Promise<ProjectModel[]> => {
    const token = localStorage.getItem('jwt_token');

    const response = await fetch(API.projects.list, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        },
    });

    if (!response.ok) {
        throw new Error('Failed to get projects');
    }

    return await response.json();
};

export const addProjectVideo = async (id: number, formData: any) => {
    const token = localStorage.getItem('jwt_token');

    const response = await fetch(API.projects.addVideo(id), {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body: formData,
    });

    if (!response.ok) {
        throw new Error('Failed to get projects');
    }

    return await response.json();
};

export const addProjectAudio = async (id: number, formData: any) => {
    const token = localStorage.getItem('jwt_token');

    const response = await fetch(API.projects.addAudio(id), {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body: formData,
    });

    if (!response.ok) {
        throw new Error('Failed to add audio');
    }

    return await response.json();
};

export const deleteProject = async (id: number): Promise<any> => {
    const token = localStorage.getItem('jwt_token');

    const response = await fetch(API.projects.delete(id), {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        },
    });

    if (!response.ok) {
        console.log("response");
        console.log(response);
        throw new Error('Failed to delete project');
    }

    return {message: "Project deleted"};
};

export const getAllAudios = async (id: number) => {
    const token = localStorage.getItem('jwt_token');

    const response = await fetch(API.projects.audios(id), {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Access-Control-Allow-Origin': 'https://api-dev.viduchi.ru'
        },
    });

    if (!response.ok) {
        throw new Error('Failed to get audios');
    }

    return await response.json();
}

export const getAllVideos = async (id: number) => {
    const token = localStorage.getItem('jwt_token');

    const response = await fetch(API.projects.videos(id), {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Access-Control-Allow-Origin': 'https://api-dev.viduchi.ru'
        },
    });

    if (!response.ok) {
        throw new Error('Failed to get audios');
    }

    return await response.json();
}


export const deleteVideoFromProject = async (id: number, videoId: number) => {
    const token = localStorage.getItem('jwt_token');

    const response = await fetch(API.projects.deleteVideo(id, videoId), {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Access-Control-Allow-Origin': 'https://api-dev.viduchi.ru'
        },
    });

    if (!response.ok) {
        throw new Error('Failed to delete video');
    }

    return {message: "Video file was deleted"};
}

export const deleteAudioFromProject = async (id: number, audioId: number) => {
    const token = localStorage.getItem('jwt_token');

    const response = await fetch(API.projects.deleteAudio(id, audioId), {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Access-Control-Allow-Origin': 'https://api-dev.viduchi.ru'
        },
    });

    if (!response.ok) {
        throw new Error('Failed to delete audio');
    }

    return {message: "Audio file was deleted"};
}

export const getAllSteps = async (id: number) => {
    const token = localStorage.getItem('jwt_token');

    const response = await fetch(API.projects.getSteps(id), {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Access-Control-Allow-Origin': 'https://api-dev.viduchi.ru'
        },
    });

    if (!response.ok) {
        throw new Error('Failed to get steps of project');
    }

    return response.json();
}



export const generateSteps = async (id: number) => {
    const token = localStorage.getItem('jwt_token');

    const response = await fetch(API.projects.generateSteps(id), {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Access-Control-Allow-Origin': 'https://api-dev.viduchi.ru'
        },
    });

    if (!response.ok) {
        throw new Error('Failed to generate steps of project');
    }

    return await response.json();
}

export const addStepsToProject = async (id: number, steps: any) => {
    const token = localStorage.getItem('jwt_token');

    const response = await fetch(API.projects.addSteps(id), {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'https://api-dev.viduchi.ru'
        },
        body: JSON.stringify({ steps }),
    });

    if (!response.ok) {
        throw new Error('Failed to generate steps of project');
    }

    return await response.json();
}

export const updateStep = async (id: number, stepId: number, step: any) => {
    const token = localStorage.getItem('jwt_token');

    const response = await fetch(API.projects.updateStep(id, stepId), {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'https://api-dev.viduchi.ru'
        },
        body: JSON.stringify({ step }),
    });

    if (!response.ok) {
        throw new Error('Failed to generate steps of project');
    }

    return await response.json();
}

export const transcribeVideo = async (id: number, videoId: number) => {
    const token = localStorage.getItem('jwt_token');

    const response = await fetch(API.projects.transcribeVideo(id, videoId), {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Access-Control-Allow-Origin': 'https://api-dev.viduchi.ru'
        },
    });

    if (!response.ok) {
        throw new Error('Failed to transcribe video of project');
    }

    return response.json();

}

export const transcribeAudio = async (id: number, audioId: number) => {
    const token = localStorage.getItem('jwt_token');

    const response = await fetch(API.projects.transcribeAudio(id, audioId), {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Access-Control-Allow-Origin': 'https://api-test.viduchi.ru'
        },
    });

    if (!response.ok) {
        throw new Error('Failed to transcribe audio of project');
    }

    return response.json();

}

export const addSubtitlesToProject = async (id: number, subtitles: any) => {
    const token = localStorage.getItem('jwt_token');

    const response = await fetch(API.projects.addSubtitles(id), {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            //  'Access-Control-Allow-Origin': 'https://api-test.viduchi.ru'
        },
        body: JSON.stringify({ subtitles }),
      
   
    });

    if (!response.ok) {
        throw new Error('Failed to add subtitles to project');
    }

    return response.json();
}


export const getProjectById = async (id: number) => {
    const token = localStorage.getItem('jwt_token');

    const response = await fetch(API.projects.byId(id), {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        },
    });

    if (!response.ok) {
        throw new Error('Failed to get project');
    }

    return await response.json();
};

export const saveProjectTimeline = async (id: number, tracks: ITrack[], trackItemIds: string[], trackItemsMap: Record<string, ITrackItem>, fps: number, duration: number, max_video_width: number, max_video_height: number) => {
    const token = localStorage.getItem('jwt_token');

    const response = await fetch(API.projects.saveTimeline(id), {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tracks, trackItemIds, trackItemsMap, fps, duration, max_video_width, max_video_height }),
    });

    if (!response.ok) {
        throw new Error('Failed to save data of project');
    }

    return await response.json();
}


export const extractAudioFromProjectVideo = async (projectId: number, videoId: number) => {
    const token = localStorage.getItem('jwt_token');

    // const response = await fetch(API.projects.extractAudioFromVideo(projectId, videoId), {
    //     method: 'GET',
    //     headers: {
    //         'Authorization': `Bearer ${token}`
    //     },
    // });

    let blob = await fetch(API.projects.extractAudioFromVideo(projectId, videoId), {
        method: "GET",
       headers: {
           'Authorization': `Bearer ${token}`
       },
      }).then(r => r.blob());
  
      console.log("BLOB FROM SERVER: ", blob)
      let fileOfBlob = new File([blob], 'audio.wav', { type: "audio/mpeg" });
    //  let fileOfBlob = new File([blob], 'audio.wav');
      console.log("AUDIO FILE FROM BLOB: ", fileOfBlob)
  
      return fileOfBlob;

}

/*
FOR SERVER NODEJS RENDERING
*/

export const getProjectByIdForRendering = async (id: number, jwt_token: string) => {
    const token = jwt_token;

    const response = await fetch(`https://api-dev.viduchi.ru/admin-api/v1/projects/${id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        },
    });

    if (!response.ok) {
        throw new Error('Failed to get project');
    }

    return await response.json();
};