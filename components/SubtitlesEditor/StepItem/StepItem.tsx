import { Istep } from "../SubtitlesEditor";
import EditIcon from "../edit.svg";
import DeleteIcon from "../delete.svg";
import styles from "./StepItem.module.css";
import useStore from '@/store/store';


export const StepItem = ({step}: any) => {

    const { playerRef } = useStore();

    console.log("Step inside stepItem: ", step)

    return (
        <div key={step.id} className={styles.singleStep}>
<span style={{ cursor:"pointer" }}
onClick={() => {
  playerRef?.current?.seekTo(step.start * 10 )
}}
>{step.text}</span>
<span> <EditIcon /> <DeleteIcon

/> </span>
    </div>
    );
}