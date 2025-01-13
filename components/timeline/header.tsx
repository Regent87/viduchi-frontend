import Image from "next/image";
import {
  ACTIVE_CLONE,
  ACTIVE_DELETE,
  ACTIVE_SPLIT,
  TIMELINE_SCALE_CHANGED,
  dispatch,
} from "@designcombo/events";
import { frameToTimeString, getCurrentTime, timeToString } from "@/utils/time";
import useStore from "../../store/store";
import {
  Copy,
  SquareSplitHorizontal,
  Trash,
  ZoomIn,
  ZoomOut,
  Maximize2,
} from "lucide-react";
import { getNextZoomLevel, getPreviousZoomLevel } from "@/utils/timeline";
import { useCurrentPlayerFrame } from "../../hooks/use-current-frame";
import styles from "./header.module.css";
import { IconButton } from "../ui/iconButton";

const Header = () => {
  const { duration, fps, scale, playerRef, activeIds } = useStore();
  const currentFrame = useCurrentPlayerFrame(playerRef!);

  const onZoomOutClick = () => {
    const previousZoom = getPreviousZoomLevel(scale);
    dispatch(TIMELINE_SCALE_CHANGED, {
      payload: {
        scale: previousZoom,
      },
    });
  };

  const onZoomInClick = () => {
    const nextZoom = getNextZoomLevel(scale);

    dispatch(TIMELINE_SCALE_CHANGED, {
      payload: {
        scale: nextZoom,
      },
    });
  };

  const doActiveClone = () => {
    dispatch(ACTIVE_CLONE);
  };

  const doActiveDelete = () => {
    dispatch(ACTIVE_DELETE);
  };

  const doActiveSplit = () => {
    dispatch(ACTIVE_SPLIT, {
      payload: {},
      options: {
        time: getCurrentTime(),
      },
    });
  };

  return (
    <div className={styles.header}>
      <div className={styles.absoluteWrapper}>
        <div className={styles.gridContainer}>
          <div className={styles.leftButtonsSet}>
            <IconButton>
              <Image
                src="/timeline-btn-icon.png"
                width={20}
                height={20}
                alt="btn icon"
              />
            </IconButton>
            <IconButton disabled={!activeIds.length} onClick={doActiveDelete}>
              <Trash
                size={18}
                color={
                  !activeIds.length ? "rgba(244, 244, 244, 0.15)" : "#F4F4F4"
                }
              />
            </IconButton>
            <IconButton disabled={!activeIds.length} onClick={doActiveClone}>
              <Copy
                size={18}
                color={
                  !activeIds.length ? "rgba(244, 244, 244, 0.15)" : "#F4F4F4"
                }
              />
            </IconButton>
            <IconButton disabled={!activeIds.length} onClick={doActiveSplit}>
              <SquareSplitHorizontal
                size={18}
                color={
                  !activeIds.length ? "rgba(244, 244, 244, 0.15)" : "#F4F4F4"
                }
              />
            </IconButton>
          </div>
          <div className={styles.timeWrapper}>
            <div
              className={styles.currentTime}
              data-current-time={currentFrame / fps}
              id="video-current-time"
            >
              {frameToTimeString({ frame: currentFrame }, { fps })}
            </div>
            <span className={styles.currentTime}>/</span>
            <div className={styles.sumTime}>
              {timeToString({ time: duration })}
            </div>
          </div>

          <div className={styles.rightButtonsSet}>
            <IconButton onClick={onZoomOutClick}>
              <ZoomOut size={20} color="rgba(244, 244, 244, 0.55)" />
            </IconButton>
            <IconButton onClick={onZoomInClick}>
              <ZoomIn size={20} color="rgba(244, 244, 244, 0.55)" />
            </IconButton>
            <IconButton>
              <Maximize2 size={20} color="rgba(244, 244, 244, 0.55)" />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
