import { Istep } from "@/components/SubtitlesEditor/SubtitlesEditor";

export interface IStep {
	start: number;
	text: string;
}

export interface InstructionModel {
	id: number;
	title: string;
	steps: Istep[];
	video_url: string;
	cover_url: string;
}