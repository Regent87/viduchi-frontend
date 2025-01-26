import useStore from "@/store/store";
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { toBlobURL } from '@ffmpeg/util';


export function saveCanvasToVideoWithAudioWebmMp4() {

 
    const { playerRef , duration } = useStore();

    console.log('modified')
  //  let mp4 = this.selectedVideoFormat === 'mp4'
  let mp4 = false;
//   getting canvas

//    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const canvas: any = playerRef;
    const stream = canvas.captureStream(30);
 //   const audioElements = this.editorElements.filter(isEditorAudioElement)
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