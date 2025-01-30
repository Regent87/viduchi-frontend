import { useState } from "react"
import styles from "./SubtitleItem.module.css";
import useStore from "@/store/store";

export const SubtitleItem = ({ subtitle }: any) => {

    const updateSubtitles = useStore((state) => state.updateSubtitles);
    const subtitles_zustand = useStore((state) => state.subtitles);

    const [toggle, setToggle] = useState(true);
    const [currentSubtitleText, setCurrentSubtitleText] = useState(subtitle.text);

    return (
        <div key={subtitle.id}>


        { toggle ? <p
       // onClick={() => getDataFromSelectedSubtitles(subtitle.id)}
        onDoubleClick={() => setToggle(false)} id={subtitle.id} className={styles.subtitle} key={subtitle.id}>{subtitle.text}</p> : <input type="text" value={currentSubtitleText}
        onChange={(e) => {
            setCurrentSubtitleText(e.target.value);
            updateSubtitles(subtitle.id, e.target.value);
            console.log("UDATED SUBTITLES FROM ZUSTAND: ", subtitles_zustand)
            setToggle(false);
        } }
         key={subtitle.id} />  }
       
             </div>
    )

}