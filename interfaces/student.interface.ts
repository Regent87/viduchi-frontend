import { StringifyOptions } from "querystring";

export interface StudentModel {
	account_id: number;
	email: string;
	role: string;
	user_id: number;
    first_name: string;
    last_name: string;
    surname: string;
    phone: string;
}

interface Iposition {
    id: number;
    title: string;
}

export interface Istudent {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    surname: string;
    position: Iposition;
    avatar_url: string;
    phone_number: string;
}