import { API } from "../../app/api";
import { Istep } from "@/components/SubtitlesEditor/SubtitlesEditor";
import { ProjectModel } from "@/interfaces/project.interface";
import { ITrack, ITrackItem, IVideo } from "@designcombo/timeline";
import { json } from "stream/consumers";

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

    return await response.json();

}


export const addSubtitlesToProject = async (id: number, subtitles: string) => {
    const token = localStorage.getItem('jwt_token');
    const response = await fetch(API.projects.addSubtitles(id), {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            // 'Access-Control-Allow-Origin': 'https://api-dev.viduchi.ru'
        },
        body: JSON.stringify({ subtitles }),
    });

    if (!response.ok) {
        throw new Error('Failed to generate steps of project');
    }

    return await response.json();

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

export const saveProjectTimeline = async (id: number, tracks: ITrack[], trackItemIds: string[], trackItemsMap: Record<string, ITrackItem>, fps: number, duration: number) => {
    const token = localStorage.getItem('jwt_token');
    const response = await fetch(API.projects.saveTimeline(id), {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            // 'Access-Control-Allow-Origin': 'https://api-dev.viduchi.ru'
        },
        body: JSON.stringify({ tracks, trackItemIds, trackItemsMap, fps, duration }),
    });

    if (!response.ok) {
        throw new Error('Failed to save data of project');
    }

    return await response.json();
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