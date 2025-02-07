import {bundle} from '@remotion/bundler';
import {renderMedia, selectComposition, getCompositions} from '@remotion/renderer';
import path from 'path';
 
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


await renderMedia({
  composition,
  serveUrl: bundleLocation,
  codec: 'h264',
  outputLocation: `out/${compositionId}.mp4`,
  inputProps,
});
 
console.log('Render done!');