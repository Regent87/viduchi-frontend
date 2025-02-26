import styles from './InstructionList.module.css';
import cn from 'classnames';
import { InstructionListProps } from './InstructionList.props';
import { useEffect, useState } from 'react';
import { InstructionModel } from '@/interfaces/instruction.interface';
import { InstructionCard } from '../InstructionCard/InstructionCard';
import { getAllInstructions } from '@/api/client/instructions';
;

export default function InstructionList({ className }: InstructionListProps)  {

    const [instructions, setInstructions] = useState<InstructionModel[]>([]);
	const [isLoading, setIsLoading] = useState(false);

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
		</div>
	);
};
