import { Istep, Isubtitle } from "@/components/SubtitlesEditor/SubtitlesEditor";
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

  setUploadedFiles: (uploadedFile: FileWithUrl) => void;
  deleteUploadedFile: (fileUrl: string) => void;

  subtitles: Isubtitle[];
  setSubtitles: (subtitle: Isubtitle) => void;
  updateSubtitles: (id: number, text: string) => void;

  steps: Istep[];
  setSteps: (step: Istep) => void;
  deleteStep: (stepId: number) => void;

  isSubtitlesShown: boolean;
  setIsSubtitlesShown: (isShown: boolean) => void;
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


  setSteps: (step: Istep) =>
    set((state) => ({
      steps: [...state.steps, step],
    })),

    deleteStep: (stepId: number) =>
      set((state) => ({
        steps: state.steps.filter((item) => item.id !== stepId),
      })),

  setSubtitles: (subtitle: Isubtitle) =>
    set((state) => ({
      subtitles: [...state.subtitles, subtitle],
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
