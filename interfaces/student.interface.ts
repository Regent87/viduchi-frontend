export interface PositionModel {
	id: number;
	title: string;
}

export interface StudentModel {
	id: number;
	email: string;
    first_name: string;
    last_name: string;
    surname: string;
    phone_number: string;
    position: PositionModel;
}

export interface TeacherModel {
	id: number;
	email: string;
    first_name: string;
    last_name: string;
    surname: string;
    phone_number: string;
}