"use client";
import { useState } from 'react';
import styles from './CreateInstruction.module.css';
import { CreateInstructionProps } from './CreateInstruction.props';
import useStore from '@/store/store';
import { EmptyPlayerModal } from '../EmptyPlayerModal/EmptyPlayerModal';
import { GenerateSubtitlesModal } from '../GenerateSubtitlesModal/GenerateSubtitlesModal';


export const CreateInstruction = ({projectId }: CreateInstructionProps ) => {

// достаем треки из плеера
    const tracks = useStore((state) => state.trackItemIds);
  

    // данные для показа модальных окон
    const [ isEmptyPlayerModalOpen, setIsEmptyPlayerModalOpen ] = useState(false);
    const [ isGenerateSubtitlesModalOpen , setIsGenerateSubtitlesModalOpen ] = useState(false);



    const closeDropdown = () => {
        setIsEmptyPlayerModalOpen(false);
    }

    return (
     <>
        <button
        onClick={() => {
          //  console.log("Создать инструкцию номер проекта: " + projectId );
         
            if (tracks.length < 1) {
                setIsEmptyPlayerModalOpen(true)
            } else {
                setIsGenerateSubtitlesModalOpen(true)
            }
        }} 
        className={styles.createInstruction} 
        >
        Создать инструкцию
        </button>

<EmptyPlayerModal isOpen={isEmptyPlayerModalOpen} onClose={() => {
    closeDropdown();
    setIsEmptyPlayerModalOpen(false);
    console.log("refresh");
  //  router.replace('/projects');
  }} />

<GenerateSubtitlesModal projectId={projectId} isOpen={isGenerateSubtitlesModalOpen} onClose={() => {
  //  closeDropdown();
    setIsGenerateSubtitlesModalOpen(false);
    console.log("refresh");
  //  router.replace('/projects');
  }} />

    </>
        
    )
}