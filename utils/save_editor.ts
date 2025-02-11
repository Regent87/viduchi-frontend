import { saveProjectTimeline } from "@/api/client/projects";
import useStore from "@/store/store"

export async function saveProjectData (projectId: number) {

    const tracks = useStore((state) => state.tracks);
    const trackItemIds = useStore((state) => state.trackItemIds);
    const trackItemsMap = useStore((state) => state.trackItemsMap);
    const fps = useStore((state) => state.fps);

    const savedData = await saveProjectTimeline(projectId, tracks, trackItemIds, trackItemsMap, fps );

    if (savedData) {
        console.log("DATA WAS SAVED IN DB")
    }

}