import { Istep, Isubtitle } from "@/components/SubtitlesEditor/SubtitlesEditor";
import { InstructionModel } from "@/interfaces/instruction.interface";
import { ProjectModel } from "@/interfaces/project.interface";
import { StudentModel } from "@/interfaces/student.interface";
import { IaudioFromServer, IvideoFromServer } from "@/interfaces/video.interface";
import CanvasTimeline, {
  ITimelineScaleState,
  ITimelineScrollState,
  ITrack,
  ITrackItem,
  ITransition,
} from "@designcombo/timeline";
import { PlayerRef } from "@remotion/player";
import { create } from "zustand";

interface ITimelineStore {
  playerControls: boolean;
  duration: number;
  fps: number;
  scale: ITimelineScaleState;
  scroll: ITimelineScrollState;

  tracks: ITrack[];
  trackItemIds: string[];
  transitionIds: string[];
  transitionsMap: Record<string, ITransition>;
  trackItemsMap: Record<string, ITrackItem>;
  activeIds: string[];
  timeline: CanvasTimeline | null;
  setTimeline: (timeline: CanvasTimeline) => void;
  setScale: (scale: ITimelineScaleState) => void;
  setScroll: (scroll: ITimelineScrollState) => void;
  // setPlayerControls: (playerControls: any) => void;
  playerRef: React.RefObject<PlayerRef> | null;
  setPlayerRef: (playerRef: React.RefObject<PlayerRef> | null) => void;

  setState: (state: any) => Promise<void>;
  uploadedFiles: FileWithUrl[];

  renderedVideoFiles: File[];
  setRenderedVideoFiles: (new_videofile: File) => void;

  setTracks: (new_tracks: ITrack[]) => void;
  removeAllTracks: () => void;

  setTrackItemIds: (new_trackItemIds: string[]) => void;

  setTrackItemsMap: (new_trackItemsMap: Record<string, ITrackItem>) => void;

  setFps: (new_fps: number) => void;

  setUploadedFiles: (uploadedFile: FileWithUrl) => void;
  deleteUploadedFile: (fileUrl: string) => void;

  subtitles: Isubtitle[];
  setSubtitles: (subtitle: Isubtitle) => void;
  setAllSubtitles: (new_subtitles: Isubtitle[]) => void;
  updateSubtitles: (id: number, text: string) => void;
  removeAllSubtitles: () => void;

  steps: Istep[];
  setSteps: (step: Istep) => void;
  setAllSteps: (new_steps: Istep[]) => void;
  deleteStep: (stepId: number) => void;
  updateSteps: (id: number, text: string) => void;
  removeAllSteps: () => void;

  isSubtitlesShown: boolean;
  setIsSubtitlesShown: (isShown: boolean) => void;

  videoIdForInstruction: number;
  setVideoIdForInstruction: (id: number) => void;

  selectedSubtitles: Isubtitle[];
  setSelectedSubtitles: (subtitle: Isubtitle) => void;

  removeAllSelectedSubtitles: () => void;

  lastCheckedSubtitles: Isubtitle[],

  setAllLastCheckedSubtitles: (subtitles: Isubtitle[]) => void;
  removeAllLastCheckedSubtitles: () => void;

  students: StudentModel[];
  setAllStudents: (new_students: StudentModel[]) => void;
  setStudents: (student: StudentModel) => void;
  deleteStudent: (studentId: number) => void;
  updateStudent: (id: number, new_student: StudentModel) => void;

  videosFromServer: IvideoFromServer[];
  setAllVideosFromServer: (new_videos: IvideoFromServer[]) => void;

  audiosFromServer: IaudioFromServer[];
  setAllAudiosFromServer: (new_audios: IaudioFromServer[]) => void;

  instructions: InstructionModel[];
  setAllInstructions: (new_instructions: InstructionModel[]) => void;
  updateInstruction: (id: number, new_title: string) => void;

  projects: ProjectModel[];
  setAllProjects: (new_projects: ProjectModel[]) => void;
  updateProject: (id: number, new_title: string) => void;

  isSubtitlesGenerating: boolean;
  setIsSubtitlesGenerating: (isGenerating: boolean) => void;


}


const useStore = create<ITimelineStore>((set) => ({
  playerControls: false,
  timeline: null,
  duration: 0,
  fps: 30,
  scale: {
    unit: 60,
    zoom: 1 / 180,
    segments: 5,
  },
  scroll: {
    left: 0,
    top: 0,
  },
  playerRef: null,

  activeIds: [],
  targetIds: [],
  tracks: [],
  trackItemIds: [],
  transitionIds: [],
  transitionsMap: {},
  trackItemsMap: {},
  uploadedFiles: [],
  isSubtitlesShown: false,
  subtitles: [],
  steps: [],
  videoIdForInstruction: 0,
  selectedSubtitles: [],
  lastCheckedSubtitles: [],
  students: [],
  videosFromServer: [],
  audiosFromServer: [],
  renderedVideoFiles: [],
  instructions: [],
  projects: [],
  isSubtitlesGenerating: false,


  setIsSubtitlesGenerating: (isGenerating: boolean) => 
    set((state) => ({
      isSubtitlesGenerating: isGenerating,
    })),

  setAllProjects: (new_projects: ProjectModel[] ) => 
    set((state) => ({
      projects: new_projects,
    })),

    updateProject: (id: number, new_title: string) => {
      set((state) => {
        const obj = state.projects.find((item) => Number(item.id) == id);
        if (obj) {
          obj.title = new_title; 
        }
        return { projects: [...state.projects] };
      });
    },


  setAllInstructions: (new_instructions: InstructionModel[] ) => 
    set((state) => ({
      instructions: new_instructions,
    })),

    updateInstruction: (id: number, new_title: string) => {
      set((state) => {
        const obj = state.instructions.find((item) => Number(item.id) == id);
        if (obj) {
          obj.title = new_title; 
        }
        return { instructions: [...state.instructions] };
      });
    },

  setRenderedVideoFiles: (new_videofile: File) =>
    set((state) => ({
      renderedVideoFiles: [...state.renderedVideoFiles, new_videofile],
    })),

  setAllAudiosFromServer: (new_audios: IaudioFromServer[] ) => 
    set((state) => ({
      audiosFromServer: new_audios,
    })),


  setFps: (new_fps: number) => 
    set((state) => ({
      fps: new_fps,
    })),

  setTrackItemsMap: (new_trackItemsMap: Record<string, ITrackItem>) => 
    set((state) => ({
      trackItemsMap: new_trackItemsMap,
    })),

  setTrackItemIds: (new_trackItemIds: string[]) => 
    set((state) => ({
      trackItemIds: new_trackItemIds,
    })),

  setAllVideosFromServer: (new_videos: IvideoFromServer[]) => 
    set((state) => ({
      videosFromServer: new_videos,
    })),

  setAllStudents: (new_students: StudentModel[]) => 
    set((state) => ({
      students: new_students,
    })),

    setStudents: (student: StudentModel) =>
      set((state) => ({
        students: [...state.students, student],
      })),

    deleteStudent: (studentId: number) =>
      set((state) => ({
        students: state.students.filter((item) => item.id !== studentId),
      })),

      updateStudent: (id: number, new_student: StudentModel) => {
        set((state) => {
          const obj = state.students.find((item) => Number(item.id) == id);
          if (obj) {
            obj.first_name = new_student.first_name; 
            obj.last_name = new_student.last_name; 
            obj.surname = new_student.surname; 
            obj.phone_number = new_student.phone_number; 
            obj.email = new_student.email; 
            obj.position.id = new_student.position.id; 
            obj.position.title = new_student.position.title; 


          }
          return { students: [...state.students] };
        });
      },

  setTracks: (new_tracks: ITrack[]) => 
    set((state) => ({
      tracks: new_tracks,
    })),

    removeAllTracks: () => 
      set((state) => ({
        tracks: [],
      })),

  setVideoIdForInstruction: (id: number) =>
    set((state) => ({
      videoIdForInstruction: id,
    })),

  setSteps: (step: Istep) =>
    set((state) => ({
      steps: [...state.steps, step],
    })),

    setAllSteps: (new_steps: Istep[]) =>
      set((state) => ({
        steps: new_steps,
      })),

    deleteStep: (stepId: number) =>
      set((state) => ({
        steps: state.steps.filter((item) => item.start !== stepId),
      })),

      removeAllSteps: () => 
        set((state) => ({
          steps: [],
        })),

  setSubtitles: (subtitle: Isubtitle) =>
    set((state) => ({
      subtitles: [...state.subtitles, subtitle],
    })),

    setSelectedSubtitles: (subtitle: Isubtitle) =>
      set((state) => ({
        selectedSubtitles: [...state.selectedSubtitles, subtitle],
      })),

  setAllSubtitles: (new_subtitles: Isubtitle[]) =>
    set((state) => ({
      subtitles: new_subtitles,
    })),

    removeAllSubtitles: () => 
      set((state) => ({
        subtitles: [],
      })),

    setAllLastCheckedSubtitles: (new_subtitles: Isubtitle[]) =>
      set((state) => ({
        lastCheckedSubtitles: new_subtitles,
      })),

  removeAllSelectedSubtitles: () =>
      set((state) => ({
        selectedSubtitles: [],
      })),

      removeAllLastCheckedSubtitles: () =>
        set((state) => ({
          lastCheckedSubtitles: [],
        })),

    updateSubtitles: (id: number, text: string) => {
      set((state) => {
        const obj = state.subtitles.find((item) => Number(item.id) == id);
        if (obj) {
          obj.text = text; 
        }
        return { subtitles: [...state.subtitles] };
      });
    },

    updateSteps: (id: number, text: string) => {
      set((state) => {
        const obj = state.steps.find((item) => Number(item.start) == id);
        if (obj) {
          obj.text = text; 
        }
        return { steps: [...state.steps] };
      });
    },

  setIsSubtitlesShown: (isShown: boolean) =>
    set((state) => ({
      isSubtitlesShown: isShown
    })),

  setUploadedFiles: (uploadedFile: FileWithUrl) =>
    set((state) => ({
      uploadedFiles: [...state.uploadedFiles, uploadedFile],
    })),
  deleteUploadedFile: (fileUrl: string) =>
    set((state) => ({
      uploadedFiles: state.uploadedFiles.filter((item) => item.url !== fileUrl),
    })),

  setTimeline: (timeline: CanvasTimeline) =>
    set(() => ({
      timeline: timeline,
    })),
  setScale: (scale: ITimelineScaleState) =>
    set(() => ({
      scale: scale,
    })),
  setScroll: (scroll: ITimelineScrollState) =>
    set(() => ({
      scroll: scroll,
    })),
  setState: async (state) => {
    return set({ ...state });
  },

  // set player controls
  // setPlayerControls: (playerControls: boolean) =>
  //   set(() => ({
  //     playerControls: playerControls
  //   })),

  setPlayerRef: (playerRef: React.RefObject<PlayerRef> | null) =>
    set({ playerRef }),
}));

export default useStore;
