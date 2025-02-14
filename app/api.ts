export const API = {
	auth: {
		login: process.env.ADMIN_API_URL + '/admin-api/v1/auth/login',
		confirm: process.env.ADMIN_API_URL + '/admin-api/v1/auth/confirm',
		logout: process.env.ADMIN_API_URL + '/admin-api/v1/auth/logout',
	},
	admins: {
		me: process.env.ADMIN_API_URL + '/admin-api/v1/admins/me',
		avatar: process.env.ADMIN_API_URL + '/admin-api/v1/admins/avatar',
	},
	projects: {
		create: process.env.ADMIN_API_URL + '/admin-api/v1/projects',
		delete: (id: number) => process.env.ADMIN_API_URL + `/admin-api/v1/projects/${id}`,
		list: process.env.ADMIN_API_URL + '/admin-api/v1/projects',
		byId: (id: number) => process.env.ADMIN_API_URL + `/v1/projects/${id}`,
		addVideo: (id: any) => process.env.ADMIN_API_URL + `/admin-api/v1/projects/${id}/videos`,
		addAudio: (id: any) => process.env.ADMIN_API_URL + `/admin-api/v1/projects/${id}/audios`,
		audios: (id: any) => process.env.ADMIN_API_URL + `/admin-api/v1/projects/${id}/audios`,
		videos: (id: any) => process.env.ADMIN_API_URL + `/admin-api/v1/projects/${id}/videos`,
		deleteVideo: (id: any, videoId: any) => process.env.ADMIN_API_URL + `/admin-api/v1/projects/${id}/videos/${videoId}`,
		deleteAudio: (id: any, videoId: any) => process.env.ADMIN_API_URL + `/admin-api/v1/projects/${id}/audios/${videoId}`,
		saveTimeline: (id: number) => process.env.ADMIN_API_URL + `/admin-api/v1/projects/${id}/save`,
		getSteps: (id: number) => process.env.ADMIN_API_URL + `/admin-api/v1/projects/${id}/steps`,
		generateSteps: (id: number) => process.env.ADMIN_API_URL + `/admin-api/v1/projects/${id}/steps/generate`,
		transcribeVideo: (id: number, videoId: number) => process.env.ADMIN_API_URL + `/admin-api/v1/projects/${id}/videos/${videoId}/transcribe`,
		addSubtitles: (id: number) => process.env.ADMIN_API_URL + `/admin-api/v1/projects/${id}/subtitles`,
		addSteps: (id: number) => process.env.ADMIN_API_URL + `/admin-api/v1/projects/${id}/steps`,
		updateStep: (id: number, stepId: number) => process.env.ADMIN_API_URL + `/admin-api/v1/projects/${id}/steps/${stepId}`,
	},
	students: {
		create: process.env.ADMIN_API_URL + '/admin-api/v1/students',
		list: process.env.ADMIN_API_URL + '/admin-api/v1/students',
		delete: (id: number) => process.env.ADMIN_API_URL + `/admin-api/v1/students/${id}`,
		update: (id: number) => process.env.ADMIN_API_URL + `/admin-api/v1/students/${id}`
	},
	positions: {
		list: process.env.ADMIN_API_URL + '/admin-api/v1/positions'
	},
	instructions: {
		create: process.env.ADMIN_API_URL + '/admin-api/v1/instructions',
		list: process.env.ADMIN_API_URL + '/admin-api/v1/instructions',
		byId: (id: number) => process.env.ADMIN_API_URL + `/admin-api/v1/instructions/${id}`,
		delete: (id: number) => process.env.ADMIN_API_URL + `/admin-api/v1/instructions/${id}`,
		editTitle: (id: number) => process.env.ADMIN_API_URL + `/admin-api/v1/instructions/${id}/title`,
		deletePosition: (id: number, positionId: number) => process.env.ADMIN_API_URL + `/admin-api/v1/instructions/${id}/positions/${positionId}`,
		addPosition: (id: number, positionId: number) => process.env.ADMIN_API_URL + `/admin-api/v1/instructions/${id}/positions/${positionId}`,
		positions: (id: number) => process.env.ADMIN_API_URL + `/admin-api/v1/instructions/${id}/positions`,

	},
	mentors: {
		list: process.env.ADMIN_API_URL + '/admin-api/v1/mentors',
		create: process.env.ADMIN_API_URL + '/admin-api/v1/mentors',
		delete: (id: number) => process.env.ADMIN_API_URL + `/admin-api/v1/mentors/${id}`,
		update: (id: number) => process.env.ADMIN_API_URL + `/admin-api/v1/mentors/${id}`,
	},
	render: {
		renderVideo: process.env.RENDER_SERVER_URL + '/render/api/rendervideo',
		sendProject: process.env.RENDER_SERVER_URL + '/render/api/sendproject',
	}
};
