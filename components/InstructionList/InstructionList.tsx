import styles from './InstructionList.module.css';
import cn from 'classnames';
import { InstructionListProps } from './InstructionList.props';
import { useEffect, useState } from 'react';
import { InstructionCard } from '../InstructionCard/InstructionCard';
import { getAllInstructions } from '@/api/client/instructions';
import useStore from '@/store/store';
import { InstructionNewCreationCard } from '../InstructionNewCreationCard/InstructionNewCreationCard';

export default function InstructionList({ className }: InstructionListProps)  {

    // zustand store
    const instructions = useStore((state) => state.instructions);
    const setInstructions = useStore((state) => state.setAllInstructions);

	const [isLoading, setIsLoading] = useState(false);
    // is new instruction rendering
    const [isRendering, setIsRendering] = useState(false);

    // проерка если есть параметры projectid  то нужно сделать рендеринг видео
    // функционал рендеринга видео и создания новой инструкции

    useEffect(() => {
        const fetchInstructions = async () => {
            setIsLoading(true);
            const instructions = await getAllInstructions();
            setInstructions(instructions);
            setIsLoading(false);
        }
        fetchInstructions();
    }, [])

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<div className={cn(className, styles.instructionList)}>
			{instructions.map((instruction) => (
                <InstructionCard
                key={instruction.id}
                instructionModel={instruction} />
			))}

            {
                isRendering && (
                    <InstructionNewCreationCard />
                )
            }
		</div>
	);
};
