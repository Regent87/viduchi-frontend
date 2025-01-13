import { API } from "@/app/api";
import { ProjectModel } from "@/interfaces/project.interface";

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