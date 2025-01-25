export interface IStep {
	start: number;
	text: string;
}

export interface InstructionModel {
	id: number;
	title: string;
	steps: IStep[];
	video_url: string;
	cover_url: string;
}