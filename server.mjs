/**
 * This is an example of a server that returns dynamic video.
 * Run `npm run server` to try it out!
 * If you don't want to render videos on a server, you can safely
 * delete this file.
 */

import fs from "fs";
import os from "os";
import path from "path";

import { bundle } from "@remotion/bundler";
import {
  getCompositions,
  selectComposition,
  renderMedia
} from "@remotion/renderer";
import express from "express";
import cors from 'cors';

// import { webpackOverride } from "./webpack-override";

const app = express();
app.use(cors());
app.use(express.json())
const port = process.env.PORT || 4000;
const compositionId = "myComp";

// const cache = new Map<string, string>();

// POST запрос с клиента - получаем данные проекта и созраняем его вфайл json
app.post('/api/sendproject', async (req, res) => {

  // получаем данные проекта
  const { updatedProject } = req.body;
  console.log("request: ", req.body)

  // сохраняем данные проекта в файл json в папку public
  saveProjectToPublicFolder(updatedProject, function(err) {
    if (err) {
      res.status(404).json({ message: "Project was not saved" });
      return;
    }

    res.json({ message: "Project saved in public folder" });
  });

  function saveProjectToPublicFolder(project, callback) {
    fs.writeFile('./public/project.json', JSON.stringify(project), callback);
  }
});


// render video
app.get('/api/rendervideo', async (req, res) => {

// The composition you want to render
const compositionId = 'myComp';

console.log("PAth: ", path.join(process.cwd(), './components/player/root.ts'))
 
// You only have to create a bundle once, and you may reuse it
// for multiple renders that you can parametrize using input props.
const bundleLocation = await bundle({
 ignoreRegisterRootWarning: true,
  entryPoint: path.join(process.cwd(), './components/player/root.ts'),
  // If you have a webpack override in remotion.config.ts, pass it here as well.
  // webpackOverride: (config) => config,
});


console.log(" Budnle location: ", bundleLocation);

const compositionsList = await getCompositions(bundleLocation);

console.log("Compositions list: ", compositionsList)
 
// Parametrize the video by passing props to your component.
const inputProps = {
  // foo: 'bar',
};
 
// Get the composition you want to render. Pass `inputProps` if you
// want to customize the duration or other metadata.
const composition = await selectComposition({
  serveUrl: bundleLocation,
  id: compositionId,
  inputProps,
});

console.log("Composition: ", composition)
 
// Render the video. Pass the same `inputProps` again
// if your video is parametrized with data.

const finalOutput = `out/${compositionId}.mp4`;

await renderMedia({
  composition,
  serveUrl: bundleLocation,
  codec: 'h264',
  outputLocation: finalOutput,
  inputProps,
});

console.log('Render done!');

const options = {
  root:  path.join(process.cwd(), './out/')
};

const fileName =`${compositionId}.mp4`;
return res.status(200).sendFile(fileName, options, function (err) {
  if (err) {
      console.error('Error sending file:', err);
  } else {
      console.log('Sent:', fileName);
  }
});

 // return res.sendFile( path.join(process.cwd(), './' + finalOutput));
 

// res.status(200).json({ message: "Render done" });

})





// GET запрос из компонента - отправляем ему данные из файла json в формате json

// app.get("/", async (req: any, res: any) => {
//   const sendFile = (file: string) => {
//     fs.createReadStream(file)
//       .pipe(res)
//       .on("close", () => {
//         res.end();
//       });
//   };
//   try {
//     if (cache.get(JSON.stringify(req.query))) {
//       sendFile(cache.get(JSON.stringify(req.query)) as string);
//       return;
//     }
//     const bundled = await bundle({
//       entryPoint: path.join(__dirname, "./src/index.tsx"),
//     //  webpackOverride: webpackOverride,
//     });
//     const comps = await getCompositions(bundled, { inputProps: req.query });
//     const video = comps.find((c) => c.id === compositionId);
//     if (!video) {
//       throw new Error(`No video called ${compositionId}`);
//     }
//     res.set("content-type", "video/mp4");

//     const tmpDir = await fs.promises.mkdtemp(
//       path.join(os.tmpdir(), "remotion-")
//     );
//     const { assetsInfo } = await renderFrames({
//       composition: video,
//       serveUrl: bundled,
//       onStart: () => console.log("Rendering frames..."),
//       onFrameUpdate: (f) => {
//         if (f % 10 === 0) {
//           console.log(`Rendered frame ${f}`);
//         }
//       },
//       concurrency: null,
//       outputDir: tmpDir,
//       inputProps: req.query,
//       imageFormat: "jpeg",
//     });

//     const finalOutput = path.join(tmpDir, "out.mp4");
//     await stitchFramesToVideo({
//       dir: tmpDir,
//       force: true,
//       fps: video.fps,
//       height: video.height,
//       width: video.width,
//       outputLocation: finalOutput,
//       assetsInfo,
//     });
//     cache.set(JSON.stringify(req.query), finalOutput);
//     sendFile(finalOutput);
//     console.log("Video rendered and sent!");
//   } catch (err) {
//     console.error(err);
//     res.json({
//       error: err,
//     });
//   }
// });

app.listen(port);

console.log(
  [
    `The server has started on http://localhost:${port}!`,
    "You can render a video by passing props as URL parameters.",
    "",
    "If you are running Hello World, try this:",
    "",
    `http://localhost:${port}?titleText=Hello,+World!&titleColor=red`,
    "",
  ].join("\n")
);
