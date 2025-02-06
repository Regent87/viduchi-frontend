import { API } from "@/app/api";

export const createInstruction = async (title: string, steps: any, video_id: number) => {
    const token = localStorage.getItem('jwt_token');
    const response = await fetch(API.instructions.create, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title, steps, video_id }),
    });

    if (!response.ok) {
        throw new Error('Failed to create instruction');
    }

    return await response.json();
};

export const getAllInstructions = async () => {
    const token = localStorage.getItem('jwt_token');
    const response = await fetch(API.instructions.list, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        },
    });

    if (!response.ok) {
        throw new Error('Failed to get instructions');
    }

    return await response.json();
};


export const getInstructionById = async (id: number) => {
    const token = localStorage.getItem('jwt_token');
    const response = await fetch(API.instructions.byId(id), {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        },
    });

    if (!response.ok) {
        throw new Error('Failed to get instruction');
    }

    return await response.json();
};


export const deleteInstruction = async (id: number) => {

    const token = localStorage.getItem('jwt_token');

    const response = await fetch(API.instructions.delete(id), {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        },
    });

    if (!response.ok) {
        console.log("response");
        console.log(response);
        throw new Error('Failed to delete instruction');
    }

    return {message: "Instruction deleted"};
};


export const updateInstructionTitle = async (id: number, title: string) => {
   
    const token = localStorage.getItem('jwt_token');
    const response = await fetch(API.instructions.editTitle(id), {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title }),
      
    });

    if (!response.ok) {
        throw new Error('Failed to update instruction');
    }

    return await response.json();
};


export const deletePositionOfInstruction = async (id: number, positionId: number) => {

    const token = localStorage.getItem('jwt_token');

    const response = await fetch(API.instructions.deletePosition(id, positionId), {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        },
    });

    if (!response.ok) {
        console.log("response");
        console.log(response);
        throw new Error('Failed to delete position of instruction');
    }

    return {message: "Instruction deleted"};
};


export const addPositionOfInstruction = async (id: number, positionId: number) => {
    const token = localStorage.getItem('jwt_token');
    const response = await fetch(API.instructions.addPosition(id, positionId), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
       
    });

    if (!response.ok) {
        throw new Error('Failed to add position to instruction');
    }

    return await response.json();
};


export const getallPositionsOfInstruction = async (id: number) => {
    const token = localStorage.getItem('jwt_token');
    const response = await fetch(API.instructions.positions(id), {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        },
    });

    if (!response.ok) {
        throw new Error('Failed to get positions of instruction');
    }

    return await response.json();
};