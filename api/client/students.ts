import { API } from "@/app/api";
import { StudentModel } from "@/interfaces/student.interface";

export const createStudent = async (email: string, first_name: string, last_name: string, surname: string) => {
    const token = localStorage.getItem('jwt_token');
    const response = await fetch(API.students.create, {
          method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ email, first_name, last_name, surname }),
    });

    if (!response.ok) {
        throw new Error('Failed to create student');
    }

    return await response.json();
}