export interface VideoModel {
	id: number;
	title: string;
	createdAt: string;
	cover: string;
}

export interface IVideo {
	id: string;
	title: string;
	url: string;
}

export interface IvideoFromServer {
	id: number;
	project_id: number;
	video_url: string;
	cover_url: string;
}


export interface IaudioFromServer {
	id: number;
	project_id: number;
	audio_url: string;
}