import { cookies } from 'next/headers';
import { API } from "@/app/api";
import { ProjectModel } from "@/interfaces/project.interface";

export const getProjectById = async (id: number): Promise<ProjectModel> => {
    const cookieStore = await cookies();
    const token = cookieStore.get('jwt_token')?.value;

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