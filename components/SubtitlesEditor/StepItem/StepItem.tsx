import { Istep } from "../SubtitlesEditor";
import EditIcon from "../edit.svg";
import DeleteIcon from "../delete.svg";
import styles from "./StepItem.module.css";
import useStore from '@/store/store';
import { useState } from "react";


export const StepItem = ({step}: any) => {

  const updateSteps = useStore((state) => state.updateSteps);
  const deleteStep = useStore((state) => state.deleteStep);

  const [toggle, setToggle] = useState(false);
  const [currentStepText, setCurrentStepText] = useState(step.text);


    const { playerRef } = useStore();

    console.log("Step inside stepItem: ", step)

    return (

        <div className={styles.singleStep}>
          {
            !toggle ? <span style={{ cursor:"pointer" }}
            onClick={() => {
              playerRef?.current?.seekTo(step.start * 10 )
            }}
            >{step.text}</span> : <input type="text" value={currentStepText}
            onChange={(e) => {
              setCurrentStepText(e.target.value)
              updateSteps(step.id, e.target.value)
            }}
            />
          }
        
          

<span className={styles.theIcons}> <EditIcon 
onClick={() => setToggle(!toggle)}
/> <DeleteIcon
onClick={() => deleteStep(step.id)}
/> </span>
    </div>

    );
}