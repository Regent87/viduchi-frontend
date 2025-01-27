export const API = {
	auth: {
		login: process.env.NEXT_PUBLIC_API_URL + '/v1/auth/login',
		confirm: process.env.NEXT_PUBLIC_API_URL + '/v1/auth/confirm',
		me: process.env.NEXT_PUBLIC_API_URL + '/v1/auth/me',
		logout: process.env.NEXT_PUBLIC_API_URL + '/v1/auth/logout',
	},
	admins: {
		me: process.env.NEXT_PUBLIC_API_URL + '/v1/admins/me',
		avatar: process.env.NEXT_PUBLIC_API_URL + '/v1/admins/avatar',
	},
	projects: {
		create: process.env.NEXT_PUBLIC_API_URL + '/v1/projects',
		delete: (id: number) => process.env.NEXT_PUBLIC_API_URL + `/v1/projects/${id}`,
		list: process.env.NEXT_PUBLIC_API_URL + '/v1/projects',
		byId: (id: number) => process.env.NEXT_PUBLIC_API_URL + `/v1/projects/${id}`,
		addVideo: (id: any) => process.env.NEXT_PUBLIC_API_URL + `/v1/projects/${id}/videos`,
		addAudio: (id: any) => process.env.NEXT_PUBLIC_API_URL + `/v1/projects/${id}/audios`,
		audios: (id: any) => process.env.NEXT_PUBLIC_API_URL + `/v1/projects/${id}/audios`,
		videos: (id: any) => process.env.NEXT_PUBLIC_API_URL + `/v1/projects/${id}/videos`,
		deleteVideo: (id: any, videoId: any) => process.env.NEXT_PUBLIC_API_URL + `/v1/projects/${id}/videos/${videoId}`,
		deleteAudio: (id: any, videoId: any) => process.env.NEXT_PUBLIC_API_URL + `/v1/projects/${id}/audios/${videoId}`,
		saveTimeline: (id: number) => process.env.NEXT_PUBLIC_API_URL + `/v1/projects/${id}/save`,
		getSteps: (id: number) => process.env.NEXT_PUBLIC_API_URL + `/v1/projects/${id}/steps`,
		generateSteps: (id: number) => process.env.NEXT_PUBLIC_API_URL + `/v1/projects/${id}/steps/generate`,
		transcribeVideo: (id: number, videoId: number) => process.env.NEXT_PUBLIC_API_URL + `/v1/projects/${id}/videos/${videoId}/transcribe`,
		addSubtitles: (id: number) => process.env.NEXT_PUBLIC_API_URL + `/v1/projects/${id}/subtitles`,
		addSteps: (id: number) => process.env.NEXT_PUBLIC_API_URL + `/v1/projects/${id}/steps`,
	},
	students: {
		create: process.env.NEXT_PUBLIC_API_URL + '/v1/students',
		list: process.env.NEXT_PUBLIC_API_URL + '/v1/students',
		delete: (id: number) => process.env.NEXT_PUBLIC_API_URL + `/v1/students/${id}`,
		update: (id: number) => process.env.NEXT_PUBLIC_API_URL + `/v1/students/${id}`
	},
	positions: {
		list: process.env.NEXT_PUBLIC_API_URL + '/v1/positions'
	},
	instructions: {
		create: process.env.NEXT_PUBLIC_API_URL + '/v1/instructions',
		list: process.env.NEXT_PUBLIC_API_URL + '/v1/instructions',
		byId: (id: number) => process.env.NEXT_PUBLIC_API_URL + `/v1/instructions/${id}`,
		delete: (id: number) => process.env.NEXT_PUBLIC_API_URL + `/v1/instructions/${id}`,
		editTitle: (id: number) => process.env.NEXT_PUBLIC_API_URL + `/v1/instructions/${id}/title`,
		deletePosition: (id: number, positionId: number) => process.env.NEXT_PUBLIC_API_URL + `/v1/instructions/${id}/positions/${positionId}`,
		addPosition: (id: number, positionId: number) => process.env.NEXT_PUBLIC_API_URL + `/v1/instructions/${id}/positions/${positionId}`,
		positions: (id: number) => process.env.NEXT_PUBLIC_API_URL + `/v1/instructions/${id}/positions`,
		
	},
	mentors: {
		list: process.env.NEXT_PUBLIC_API_URL + '/v1/mentors',
		create: process.env.NEXT_PUBLIC_API_URL + '/v1/mentors',
		delete: (id: number) => process.env.NEXT_PUBLIC_API_URL + `/v1/mentors/${id}`,
		update: (id: number) => process.env.NEXT_PUBLIC_API_URL + `/v1/mentors/${id}`,
	}
};
