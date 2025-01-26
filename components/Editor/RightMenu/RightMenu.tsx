"use client"
import { useEffect, useState } from 'react';
import Image from "next/image";
import styles from './RightMenu.module.css';
import SubtitlesIcon from '../cc.svg';
import VolumeIcon from "./volume-loud.svg";
import SmallVolumeIcon from "./volume_small.svg";
import SoundIcon from "./sound.svg";
import tryAI from '../subtitlesAI.png';

import useStore from '@/store/store';

import { FFmpeg } from '@ffmpeg/ffmpeg';
import { toBlobURL } from '@ffmpeg/util';

interface HTMLMediaElementWithCaptureStream extends HTMLMediaElement{
  captureStream(): MediaStream;
}

export const RightMenu = () => {

  const {  duration, tracks } = useStore();
  const { playerRef } = useStore();

  function saveCanvasToVideoWithAudioWebmMp4() {

    console.log('vide bagen recoring')
  //  let mp4 = this.selectedVideoFormat === 'mp4'
  let mp4 = false;
//   getting canvas

//    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
// const canvas: any = document.getElementById("vid")!;
const canvas: any = document.getElementsByTagName("video")[0];
// const canvas: any = playerRef?.current;
// const canvas: any | null = document.getElementById("vid");
   // const stream = canvas.captureStream(30);
console.log("Canvas video: ", canvas) 
    const stream = canvas!.captureStream(30)

 //   stream.addTrack(tracks[0].items[0])


 //   const audioElements = this.editorElements.filter(isEditorAudioElement)
 // console.log("Stream : ", stream)
    const audioStreams: MediaStream[] = [];

    // audioElements.forEach((audio) => {
    //   const audioElement = document.getElementById(audio.properties.elementId) as HTMLAudioElement;
    //   let ctx = new AudioContext();
    //   let sourceNode = ctx.createMediaElementSource(audioElement);
    //   let dest = ctx.createMediaStreamDestination();
    //   sourceNode.connect(dest);
    //   sourceNode.connect(ctx.destination);
    //   audioStreams.push(dest.stream);
    // });

    // audioStreams.forEach((audioStream) => {
    //   stream.addTrack(audioStream.getAudioTracks()[0]);
    // });

    const video = document.createElement("video");
    video.srcObject = stream;
    video.height = 500;
    video.width = 800;
    // video.controls = true;
    // document.body.appendChild(video);

    // video.play().
    playerRef?.current?.play();
    
    video.play().then(() => {
      const mediaRecorder = new MediaRecorder(stream);
      const chunks: Blob[] = [];
      mediaRecorder.ondataavailable = function (e) {
        chunks.push(e.data);
        console.log("data available");

      };
      mediaRecorder.onstop = async function (e) {
        const blob = new Blob(chunks, { type: "video/webm" });

        if (mp4) {
          // lets use ffmpeg to convert webm to mp4
          const data = new Uint8Array(await (blob).arrayBuffer());
          const ffmpeg = new FFmpeg();
          const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.2/dist/umd"
          await ffmpeg.load({
            coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
            wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
            // workerURL: await toBlobURL(`${baseURL}/ffmpeg-core.worker.js`, 'text/javascript'),
          });
          await ffmpeg.writeFile('video.webm', data);
          await ffmpeg.exec(["-y", "-i", "video.webm", "-c", "copy", "video.mp4"]);
          // await ffmpeg.exec(["-y", "-i", "video.webm", "-c:v", "libx264", "video.mp4"]);

          const output = await ffmpeg.readFile('video.mp4');
          const outputBlob = new Blob([output], { type: "video/mp4" });
          const outputUrl = URL.createObjectURL(outputBlob);
          const a = document.createElement("a");
          a.download = "video.mp4";
          a.href = outputUrl;
          a.click();

        } else {
            console.log(blob);
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "video.webm";
          a.click();
        }
      };
      mediaRecorder.start();
      setTimeout(() => {
        mediaRecorder.stop();
      }, duration);
      video.remove();
    })
  }


    // set sound volume data
    const [data, setData] = useState(50);
    const [isSubtitlesOpen, setIsSubtitlesOpen] = useState(false);

    const setIsSubtitlesShown = useStore((state) => state.setIsSubtitlesShown);
    const isSubtitlesShown = useStore((state) => state.isSubtitlesShown);
    const [isAudioTitlesShown, setIsAudioTitlesShown] = useState(false);
    const [isVolumeShown, setIsVolumeShown] = useState(false);




  const setSoundVolume = (e:any) => {
setData(e);
playerRef?.current?.setVolume(data / 100);
  }

  
  useEffect(() => {
    setIsAudioTitlesShown(isSubtitlesShown)
  }, [isSubtitlesShown, setIsAudioTitlesShown])

    return (
        <div className={styles.navRight}>
        <nav>
          <ul>
            <li>
            <span className={ isSubtitlesOpen ? styles.white : styles.gray  }>
            <SubtitlesIcon onClick={() => {
                setIsVolumeShown(false);
                setIsSubtitlesOpen(!isSubtitlesOpen)
               }} />
              <p>Субтитры</p>
            </span>
             
            </li>
            

            <li>
            <span className={ isVolumeShown ? styles.white : styles.gray  }>
                <VolumeIcon onClick={() => {
setIsSubtitlesOpen(false);
setIsVolumeShown(!isVolumeShown); 
                }} />
                <p>Аудио</p>
            </span>
            </li>

          </ul>
        </nav>

{ isSubtitlesOpen && (
 <div className={styles.subtitles}>
 
<h3>Субтитры</h3>
<select className={styles.languageSelect}>
 <option value="">Выбор языка</option>
</select>

<div className={styles.show_subtitles}>
<label
onClick={() => {
 setIsAudioTitlesShown(!isAudioTitlesShown)
//   setIsSubtitlesShown(isAudioTitlesShown);
  // if (isAudioTitlesShown == false) {
  //   setIsAudioTitlesShown(true);
  //   setIsSubtitlesShown(true);
  // } else {
  //   setIsAudioTitlesShown(false);
  //   setIsSubtitlesShown(false);
  // }

  
  
} }
className="switch">
  <input
  checked={isSubtitlesShown}
  onChange={() => setIsSubtitlesShown(isAudioTitlesShown)}
  type="checkbox" />
  <span className="slider round"></span>

</label>
<p>
Отображать <br /> субтитры
</p>

</div>

<div className={styles.create_subtitles}>
  <p>Создайте новые субтитры с помощью ММ</p>
<Image src={tryAI} alt="Try AI to create subtitles" />

<button className={styles.create_subtitles_button}>
  Создать
</button>
</div>

</div>
) }


{
    isVolumeShown && (
        <div className={styles.volume}>
<h3>Аудио</h3>
<div className={styles.loud}>
    <span>Громкость</span>
    <span>{ data }%</span>
</div>
<div className={styles.loud}>
    <SmallVolumeIcon />
    <input
    onChange={(e: any) => setSoundVolume(e.target.value)}
    type="range" min="0" max="100" />
</div>


<button className={styles.getSoundButton}><SoundIcon /> Отделить звук</button>

<button
onClick={() => {
 // playerRef?.current?.play();
 console.log("tracks: ", tracks)
   saveCanvasToVideoWithAudioWebmMp4();
}}
className={styles.textToSpeech}>Преобразование <br /> текста в речь</button>

        </div>
    )
}
       


      </div>
    )
}