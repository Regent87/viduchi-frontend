import { API } from "@/app/api";
import { Istep } from "@/components/SubtitlesEditor/SubtitlesEditor";
import { ProjectModel } from "@/interfaces/project.interface";
import { IVideo } from "@designcombo/timeline";

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


export const addProjectVideo = async (id: number, file: File): Promise<IVideo> => {
    const token = localStorage.getItem('jwt_token');
    const response = await fetch(API.projects.addVideo(id), {
        method: 'POST',
        body: file,
        headers: {
            'Authorization': `Bearer ${token}`
        },
    });

    if (!response.ok) {
        throw new Error('Failed to get projects');
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

    return await response.json();

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
            'Access-Control-Allow-Origin': 'https://api-dev.viduchi.ru'
        },
        body: JSON.stringify({ steps }),
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
            'Access-Control-Allow-Origin': 'https://api-dev.viduchi.ru'
        },
        body: JSON.stringify({ subtitles }),
    });

    if (!response.ok) {
        throw new Error('Failed to generate steps of project');
    }

    return await response.json();

}


export const saveProjectTimeline = () => {

}