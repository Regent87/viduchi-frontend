import { API } from "@/app/api";


export const getAllPositions = async () => {
    const token = localStorage.getItem('jwt_token');
    const response = await fetch(API.positions.list, {
          method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        
    });

    if (!response.ok) {
        throw new Error('Failed to get students');
    }

    return await response.json();
}