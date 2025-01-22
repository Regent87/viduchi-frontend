'use client';

import { useState } from 'react';
import styles from './GenerateSubtitlesModal.module.css';
import { Modal } from '@/components/site/ModalForm/ModalForm';
import { GenerateSubtitlesModalProps } from './GenerateSubtitlesModal.props';

// import { createProject } from '@/api/client/projects';
import { useRouter } from 'next/navigation';

export const GenerateSubtitlesModal = ({ projectId, isOpen, onClose }: GenerateSubtitlesModalProps) => {
  const [projectName, setProjectName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
      setIsLoading(true);

  //    const project = await createProject(projectName);
     // console.log("project");
   //   console.log(project);

      setProjectName('');

      onClose();

    //   if (project) {
    //     console.log("project refresh");
    //     router.replace("/projects");
    //     router.push('/editor/' + project.id)
    //    // location.reload();
    //   }
    router.push('/subtitles/' + projectId );

      setIsLoading(false);

  };

  return (

    <Modal
    className={styles.white}
    isOpen={isOpen} onClose={onClose} title="">
<form onSubmit={(e) => {
    e.preventDefault();
    handleSubmit();
  }}>
<div className={styles.addProject}>

{/* <input
onChange={(e: any) => setProjectName(e.target.value)}
value={projectName}
placeholder='Введите название проекта'
type="text" required /> */}


<p>ИИ выделит аудио дорожку из видео и преобразует ее в субтитры и вы перейдете на страницу редактирования интсрукции</p>

<p>В противном случае необходимо импортировать аудио</p>


</div>



<div className={styles.buttons}>

<button
onClick={onClose}
className={styles.reset}>Импортировать аудио</button>
<button
type='submit'
// disabled={isLoading || !projectName.trim()}
className={styles.apply}>Генерировать субтитры</button>
</div>



</form>
        </Modal>

  );
};