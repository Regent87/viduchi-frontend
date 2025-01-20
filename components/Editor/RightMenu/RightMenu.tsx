"use client"
import { useState } from 'react';
import Image from "next/image";
import styles from './RightMenu.module.css';
import SubtitlesIcon from '../cc.svg';
import tryAI from '../subtitlesAI.png';

import useStore from '@/store/store';

export const RightMenu = () => {

    const [isSubtitlesOpen, setIsSubtitlesOpen] = useState(false);

    const setIsSubtitlesShown = useStore((state) => state.setIsSubtitlesShown);
    const isSubtitlesShown = useStore((state) => state.isSubtitlesShown);
    const [isAudioTitlesShown, setIsAudioTitlesShown] = useState(false);

    return (
        <div className={styles.navRight}>
        <nav>
          <ul>
            <li>
            <span className={ isSubtitlesOpen ? styles.white : styles.gray  }>
            <SubtitlesIcon onClick={() => {
                setIsSubtitlesOpen(!isSubtitlesOpen)
               }} />
              <p>Субтитры</p>
            </span>
             
            </li>
          </ul>
        </nav>

{ isSubtitlesOpen && (
 <div className={styles.subtitles}>
 
<h3>Субтитры</h3>
<select className={styles.languageSelect}>
 <option value="">Выбор языка</option>
</select>

<div className={styles.show_subtitles}>
<label
onClick={() => {
 setIsAudioTitlesShown(!isAudioTitlesShown)
  setIsSubtitlesShown(isAudioTitlesShown);
  // if (isAudioTitlesShown == false) {
  //   setIsAudioTitlesShown(true);
  //   setIsSubtitlesShown(true);
  // } else {
  //   setIsAudioTitlesShown(false);
  //   setIsSubtitlesShown(false);
  // }

  
  
} }
className="switch">
  <input type="checkbox" />
  <span className="slider round"></span>

</label>
<p>
Отображать <br /> субтитры
</p>

</div>

<div className={styles.create_subtitles}>
  <p>Создайте новые субтитры с помощью ММ</p>
<Image src={tryAI} alt="Try AI to create subtitles" />

<button className={styles.create_subtitles_button}>
  Создать
</button>
</div>

</div>
) }
       


      </div>
    )
}