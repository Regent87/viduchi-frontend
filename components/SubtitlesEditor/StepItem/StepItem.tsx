import { Istep } from "../SubtitlesEditor";
import EditIcon from "../edit.svg";
import DeleteIcon from "../delete.svg";
import styles from "./StepItem.module.css";
import useStore from '@/store/store';
import { useState } from "react";
import { DeleteStepModal } from "@/components/DeleteStepModal/DeleteStepModal";


export const StepItem = ({step, id}: any) => {

  const updateSteps = useStore((state) => state.updateSteps);
  

  const [toggle, setToggle] = useState(false);
  const [currentStepText, setCurrentStepText] = useState(step.text);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);


    const { playerRef } = useStore();

 //   console.log("Step inside stepItem: ", step)

    const onClose = () => {
      setIsDeleteModalOpen(false);
    }


    return (
<>
        <div className={styles.singleStep}>
          {
            !toggle ? <span style={{ cursor:"pointer" }}
            onClick={() => {
              playerRef?.current?.seekTo(step.start * 30 )
            }}
            >{step.text}</span> : <input type="text" value={currentStepText}
            onChange={(e) => {
              setCurrentStepText(e.target.value)
              updateSteps(id, e.target.value)
            }}
            />
          }
        
          

<span className={styles.theIcons}> <EditIcon 
onClick={() => setToggle(!toggle)}
/> <DeleteIcon
// onClick={() => deleteStep(step.id)}
onClick={() => setIsDeleteModalOpen(true) }
/> </span>
    </div>

{  
  isDeleteModalOpen && (
    <DeleteStepModal
    isOpen={isDeleteModalOpen}
    onClose={onClose}
    stepId={id}
    />
  )
}

    </>

    );
}