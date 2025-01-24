import { API } from "@/app/api";

export const createMentor = async (email: string, first_name: string, last_name: string, surname: string, phone_number: string) => {
    const token = localStorage.getItem('jwt_token');
    const response = await fetch(API.mentors.create, {
          method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ email, first_name, last_name, surname, phone_number }),
    });

    if (!response.ok) {
        throw new Error('Failed to create mentor');
    }

    return await response.json();
};


export const getAllMentors = async () => {
    const token = localStorage.getItem('jwt_token');
    const response = await fetch(API.mentors.list, {
          method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        
    });

    if (!response.ok) {
        throw new Error('Failed to get mentors');
    }

    return await response.json();
};


export const deleteMentor = async (id: number) => {
    const token = localStorage.getItem('jwt_token');
    const response = await fetch(API.mentors.delete(id), {
          method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        },
       
    });

    if (!response.ok) {
        throw new Error('Failed to delete mentor');
    }

    return { message: "Mentor was deleted" };
};


export const updateMentor = async (email: string, first_name: string, last_name: string, surname: string, phone_number: number) => {
    const token = localStorage.getItem('jwt_token');
    const response = await fetch(API.students.create, {
          method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ email, first_name, last_name, surname, phone_number }),
    });

    if (!response.ok) {
        throw new Error('Failed to update mentor');
    }

    return { message: "Mentor was updates" };
};