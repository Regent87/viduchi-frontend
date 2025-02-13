export const API = {
	auth: {
		login: '/admin-api/v1/auth/login',
		confirm: '/admin-api/v1/auth/confirm',
		logout: '/admin-api/v1/auth/logout',
	},
	admins: {
		me: '/admin-api/v1/admins/me',
		avatar: '/admin-api/v1/admins/avatar',
	},
	projects: {
		create: '/admin-api/v1/projects',
		delete: (id: number) => `/admin-api/v1/projects/${id}`,
		list: '/admin-api/v1/projects',
		byId: (id: number) => process.env.NEXT_PUBLIC_API_URL + `/admin-api/v1/projects/${id}`,
		addVideo: (id: any) => `/admin-api/v1/projects/${id}/videos`,
		addAudio: (id: any) => `/admin-api/v1/projects/${id}/audios`,
		audios: (id: any) => `/admin-api/v1/projects/${id}/audios`,
		videos: (id: any) => `/admin-api/v1/projects/${id}/videos`,
		deleteVideo: (id: any, videoId: any) => `/admin-api/v1/projects/${id}/videos/${videoId}`,
		deleteAudio: (id: any, videoId: any) => `/admin-api/v1/projects/${id}/audios/${videoId}`,
		saveTimeline: (id: number) => `/admin-api/v1/projects/${id}/save`,
		getSteps: (id: number) => `/admin-api/v1/projects/${id}/steps`,
		generateSteps: (id: number) => `/admin-api/v1/projects/${id}/steps/generate`,
		transcribeVideo: (id: number, videoId: number) => `/admin-api/v1/projects/${id}/videos/${videoId}/transcribe`,
		addSubtitles: (id: number) => `/admin-api/v1/projects/${id}/subtitles`,
		addSteps: (id: number) => `/admin-api/v1/projects/${id}/steps`,
		updateStep: (id: number, stepId: number) => `/admin-api/v1/projects/${id}/steps/${stepId}`,
	},
	students: {
		create: '/admin-api/v1/students',
		list: '/admin-api/v1/students',
		delete: (id: number) => `/admin-api/v1/students/${id}`,
		update: (id: number) => `/admin-api/v1/students/${id}`
	},
	positions: {
		list: '/admin-api/v1/positions'
	},
	instructions: {
		create: '/admin-api/v1/instructions',
		list: '/admin-api/v1/instructions',
		byId: (id: number) => `/admin-api/v1/instructions/${id}`,
		delete: (id: number) => `/admin-api/v1/instructions/${id}`,
		editTitle: (id: number) => `/admin-api/v1/instructions/${id}/title`,
		deletePosition: (id: number, positionId: number) => `/admin-api/v1/instructions/${id}/positions/${positionId}`,
		addPosition: (id: number, positionId: number) => `/admin-api/v1/instructions/${id}/positions/${positionId}`,
		positions: (id: number) => `/admin-api/v1/instructions/${id}/positions`,

	},
	mentors: {
		list: '/admin-api/v1/mentors',
		create: '/admin-api/v1/mentors',
		delete: (id: number) => `/admin-api/v1/mentors/${id}`,
		update: (id: number) => `/admin-api/v1/mentors/${id}`,
	},
	render: {
		renderVideo: '/render/api/rendervideo',
		sendProject: '/render/api/sendproject',
	}
};
