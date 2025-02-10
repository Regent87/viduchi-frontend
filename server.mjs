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
  renderFrames,
  stitchFramesToVideo,
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
