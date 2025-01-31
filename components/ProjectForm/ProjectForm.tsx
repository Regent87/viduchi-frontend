'use client';

import { ProjectFormProps } from './ProjectForm.props';
import styles from './ProjectForm.module.css';
import cn from 'classnames';
import { useState, useCallback, useEffect, useRef } from 'react';
import {
    Video,
    Audio,
    Sequence,
    useCurrentFrame,
    useVideoConfig,
    AbsoluteFill
} from 'remotion';
import { Player } from '@remotion/player';
import { getVideoMetadata } from '@remotion/media-utils';
import ReactPlayer from 'react-player';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

interface Track {
    id: string;
    type: 'video' | 'audio' | 'subtitle';
    url: string;
    startTime: number;
    endTime: number;
    name: string;
    volume?: number;
}

const VideoPlayer: React.FC<{ url: string }> = ({ url }) => {
    const videoNode = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoNode.current) {
            const player = videojs(videoNode.current, {
                controls: true,
                autoplay: false,
                preload: 'auto',
                sources: [{ src: url, type: 'video/mp4' }]
            });

            return () => {
                player.dispose();
            };
        }
    }, [url]);

    return (
        <div data-vjs-player>
            <video ref={videoNode} className="video-js vjs-default-skin" />
        </div>
    );
};

const Timeline: React.FC<{
    tracks?: Track[],
    onTimeUpdate?: (time: number) => void
}> = ({ tracks = [], onTimeUpdate }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const [internalTime, setInternalTime] = useState(0);

    useEffect(() => {
        const currentTimeInSeconds = frame / fps;
        setInternalTime(currentTimeInSeconds);

        if (onTimeUpdate) {
            onTimeUpdate(currentTimeInSeconds);
        }
    }, [frame, fps, onTimeUpdate]);

    return (
        <AbsoluteFill>
            {tracks.map((track) => {
                if (track.type === 'video') {
                    return (
                        <Sequence
                            key={track.id}
                            from={track.startTime * fps}
                            durationInFrames={(track.endTime - track.startTime) * fps}
                        >
                            <VideoPlayer url={track.url} />
                        </Sequence>
                    );
                }
                if (track.type === 'audio') {
                    return (
                        <Sequence
                            key={track.id}
                            from={track.startTime * fps}
                            durationInFrames={(track.endTime - track.startTime) * fps}
                        >
                            <Audio
                                src={track.url}
                                volume={track.volume || 1}
                            />
                        </Sequence>
                    );
                }
                return null;
            })}
        </AbsoluteFill>
    );
};

export const ProjectForm = ({ project, className, ...props }: ProjectFormProps): JSX.Element => {
    const [tracks, setTracks] = useState<Track[]>([]);
    const [selectedTrack, setSelectedTrack] = useState<string | null>(null);
    const [duration, setDuration] = useState(1);
    const [playing, setPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleVideoAdd = useCallback(async (file: File) => {
        try {
            setIsLoading(true);
            setError(null);

            if (!file.type.startsWith('video/')) {
                throw new Error('Неверный формат файла. Пожалуйста, выберите видео файл.');
            }

            const url = URL.createObjectURL(file);

            const getMetadata = () => new Promise<number>((resolve, reject) => {
                const player: HTMLVideoElement = document.createElement('video');
                player.onloadedmetadata = () => {
                    resolve(player.duration);
                };
                player.onerror = () => {
                    reject(new Error('Ошибка загрузки видео'));
                };
                player.src = url;
            });

            const videoDuration = await getMetadata();

            const newTrack: Track = {
                id: Date.now().toString(),
                type: 'video',
                url,
                startTime: currentTime,
                endTime: currentTime + videoDuration,
                name: file.name,
                volume: 1
            };

            setTracks(prev => [...prev, newTrack]);
            setDuration(prevDuration => Math.max(prevDuration, currentTime + videoDuration));

        } catch (err) {
            setError(err instanceof Error ? err.message : 'Произошла ошибка при загрузке видео');
        } finally {
            setIsLoading(false);
        }
    }, [currentTime]);

    const handleSplitTrack = useCallback((trackId: string) => {
        const trackIndex = tracks.findIndex(t => t.id === trackId);
        if (trackIndex === -1) return;

        const track = tracks[trackIndex];
        const splitPoint = currentTime;

        if (splitPoint <= track.startTime || splitPoint >= track.endTime) return;

        const track1: Track = {
            ...track,
            id: Date.now().toString(),
            endTime: splitPoint
        };

        const track2: Track = {
            ...track,
            id: (Date.now() + 1).toString(),
            startTime: splitPoint
        };

        const newTracks = [...tracks];
        newTracks.splice(trackIndex, 1, track1, track2);
        setTracks(newTracks);
    }, [tracks, currentTime]);

    const handleVolumeChange = useCallback((trackId: string, volume: number) => {
        setTracks(prev =>
            prev.map(track =>
                track.id === trackId
                    ? { ...track, volume }
                    : track
            )
        );
    }, []);

    const handleTimelineUpdate = useCallback((time: number) => {
        setCurrentTime(time);
    }, []);

    useEffect(() => {
        return () => {
            tracks.forEach(track => {
                if (track.url.startsWith('blob:')) {
                    URL.revokeObjectURL(track.url);
                }
            });
        };
    }, [tracks]);

    useEffect(() => {
        console.log('Current tracks:', tracks);
        console.log('Current duration:', duration);
    }, [tracks, duration]);

    return (
        <div className={cn(styles.projectForm, className)} {...props}>
            <div className={styles.preview}>
                <Player
                    component={Timeline}
                    compositionWidth={1920}
                    compositionHeight={1080}
                    fps={30}
                    durationInFrames={Math.ceil(duration * 30)}
                    autoPlay={playing}
                />
            </div>

            <div className={styles.timeline}>
                <div className={styles.timelineRuler}>
                    {Array.from({ length: Math.ceil(duration) }).map((_, i) => (
                        <div key={i} className={styles.timelineMarker}>
                            {i}s
                        </div>
                    ))}
                </div>
            </div>

            <div className={styles.controls}>
                <input
                    type="file"
                    accept="video/*"
                    onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleVideoAdd(file);
                    }}
                    disabled={isLoading}
                />
                <input
                    type="file"
                    accept="audio/*"
                />
                {selectedTrack && (
                    <button onClick={() => handleSplitTrack(selectedTrack)}>
                        Разделить трек
                    </button>
                )}
                <button onClick={() => setPlaying(!playing)}>
                    {playing ? 'Па��за' : 'Воспроизвести'}
                </button>
                {isLoading && <div className={styles.loading}>Загрузка...</div>}
                {error && <div className={styles.error}>{error}</div>}
            </div>
        </div>
    );
};