import { API } from "@/app/api";
import { StudentModel } from "@/interfaces/student.interface";

export const createStudent = async (email: string, first_name: string, last_name: string, surname: string, position_id: number, phone_number: string) => {
    const token = localStorage.getItem('jwt_token');
    const response = await fetch(API.students.create, {
          method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ email, first_name, last_name, surname, position_id, phone_number }),
    });

    if (!response.ok) {
        throw new Error('Failed to create student');
    }

    return await response.json();
};


export const getAllStudents = async () => {
    const token = localStorage.getItem('jwt_token');
    const response = await fetch(API.students.list, {
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
};

export const deleteStudent = async (id: number) => {
    const token = localStorage.getItem('jwt_token');
    const response = await fetch(API.students.delete(id), {
          method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        },
       
    });

    if (!response.ok) {
        throw new Error('Failed to delete student');
    }

    return { message: "Student was deleted" };
};


export const updateStudent = async (id: number, email: string, first_name: string, last_name: string, surname: string, position_id: number, phone_number: string) => {
    const token = localStorage.getItem('jwt_token');
    const response = await fetch(API.students.update(id), {
          method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ email, first_name, last_name, surname, position_id, phone_number }),
    });

    if (!response.ok) {
        throw new Error('Failed to update student');
    }

    return await response.json();
};