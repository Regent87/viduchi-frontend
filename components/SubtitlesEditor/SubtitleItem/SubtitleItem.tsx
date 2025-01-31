import { useState } from "react"
import styles from "./SubtitleItem.module.css";
import useStore from "@/store/store";

export const SubtitleItem = ({ subtitle }: any) => {

    const updateSubtitles = useStore((state) => state.updateSubtitles);
    const subtitles_zustand = useStore((state) => state.subtitles);
    const selected_subtitles = useStore((state) => state.selectedSubtitles);
    const setSelectedSubtitle = useStore((state) => state.setSelectedSubtitles);
    const removeAllSelectedSubtitles = useStore((state) => state.removeAllSelectedSubtitles);

    const [toggle, setToggle] = useState(true);
    const [currentSubtitleText, setCurrentSubtitleText] = useState(subtitle.text);

    let elementBackgroundColor = "transparent";
    // проверяем еявляется ли элемент выделенным. если выделен то деааем бэкграунд синим
    if (selected_subtitles[0]) {
        if (  subtitle.id === selected_subtitles[0].id) {
            elementBackgroundColor = "darkblue"
        }
    }

    if (selected_subtitles[1]) {
        if (  subtitle.id === selected_subtitles[1].id) {
            elementBackgroundColor = "darkblue"
        }
    }
    

    return (
        <div key={subtitle.id}>


        { toggle ? <p
        onClick={() => {
            // делаем проверку если у нас количество выделенных субтитлов меньше двух то добавляем
            if (selected_subtitles.length < 2) {
                setSelectedSubtitle(subtitle);
                console.log("Selected Subtitles, ", selected_subtitles);
            }
            if (selected_subtitles.length >= 2) {
                // удаляем все выбранные субтитлы
                removeAllSelectedSubtitles();
                // добавляем новый
                setSelectedSubtitle(subtitle);
            }
        }}
        onDoubleClick={() => setToggle(false)} id={subtitle.id} className={styles.subtitle}
        style={{ background: elementBackgroundColor  }}
        key={subtitle.id}>{subtitle.text}</p> : <input type="text" value={currentSubtitleText}
        onChange={(e) => {
            setCurrentSubtitleText(e.target.value);
            updateSubtitles(subtitle.id, e.target.value);
           // console.log("UDATED SUBTITLES FROM ZUSTAND: ", subtitles_zustand)
           setTimeout(() => {
            setToggle(true);
          }, 20000);
          
        } }
         key={subtitle.id} />  }
       
             </div>
    )

}