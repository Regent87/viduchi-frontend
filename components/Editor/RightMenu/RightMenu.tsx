"use client"
import { useEffect, useState } from 'react';
import Image from "next/image";
import styles from './RightMenu.module.css';
import SubtitlesIcon from '../cc.svg';
import VolumeIcon from "./volume-loud.svg";
import SmallVolumeIcon from "./volume_small.svg";
import SoundIcon from "./sound.svg";
import tryAI from '../subtitlesAI.png';

import useStore from '@/store/store';

export const RightMenu = () => {

    // set sound volume data
    const [data, setData] = useState(50);
    const [isSubtitlesOpen, setIsSubtitlesOpen] = useState(false);

    const setIsSubtitlesShown = useStore((state) => state.setIsSubtitlesShown);
    const isSubtitlesShown = useStore((state) => state.isSubtitlesShown);
    const [isAudioTitlesShown, setIsAudioTitlesShown] = useState(false);
    const [isVolumeShown, setIsVolumeShown] = useState(false);

    const { playerRef } = useStore();


  const setSoundVolume = (e:any) => {
setData(e);
playerRef?.current?.setVolume(data / 100);
  }

  
  useEffect(() => {
    setIsAudioTitlesShown(isSubtitlesShown)
  }, [isSubtitlesShown, setIsAudioTitlesShown])

    return (
        <div className={styles.navRight}>
        <nav>
          <ul>
            <li>
            <span className={ isSubtitlesOpen ? styles.white : styles.gray  }>
            <SubtitlesIcon onClick={() => {
                setIsVolumeShown(false);
                setIsSubtitlesOpen(!isSubtitlesOpen)
               }} />
              <p>Субтитры</p>
            </span>
             
            </li>
            

            <li>
            <span className={ isVolumeShown ? styles.white : styles.gray  }>
                <VolumeIcon onClick={() => {
setIsSubtitlesOpen(false);
setIsVolumeShown(!isVolumeShown); 
                }} />
                <p>Аудио</p>
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


{
    isVolumeShown && (
        <div className={styles.volume}>
<h3>Аудио</h3>
<div className={styles.loud}>
    <span>Громкость</span>
    <span>{ data }%</span>
</div>
<div className={styles.loud}>
    <SmallVolumeIcon />
    <input
    onChange={(e: any) => setSoundVolume(e.target.value)}
    type="range" min="0" max="100" />
</div>


<button className={styles.getSoundButton}><SoundIcon /> Отделить звук</button>

        </div>
    )
}
       


      </div>
    )
}