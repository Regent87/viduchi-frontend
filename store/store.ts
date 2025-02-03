import { Istep, Isubtitle } from "@/components/SubtitlesEditor/SubtitlesEditor";
import { Istudent } from "@/interfaces/student.interface";
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

  setTracks: (new_tracks: ITrack[]) => void;
  removeAllTracks: () => void;

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

  students: Istudent[];
  setAllStudents: (new_students: Istudent[]) => void;
  setStudents: (student: Istudent) => void;
  deleteStudent: (studentId: number) => void;
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



  setAllStudents: (new_students: Istudent[]) => 
    set((state) => ({
      students: new_students,
    })),

    setStudents: (student: Istudent) =>
      set((state) => ({
        students: [...state.students, student],
      })),

    deleteStudent: (studentId: number) =>
      set((state) => ({
        students: state.students.filter((item) => item.id !== studentId),
      })),

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
