import { API } from "@/app/api";


export const getMyProfile = async () => {
    const token = localStorage.getItem('jwt_token');
    const response = await fetch(API.admins.me, {
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

export const uploadAdminAvatar = async (formData: any) => {
    const token = localStorage.getItem('jwt_token');
    const response = await fetch(API.admins.avatar, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body: formData
    });

    if (!response.ok) {
        throw new Error('Failed to get projects');
    }

    return await response.json();

}