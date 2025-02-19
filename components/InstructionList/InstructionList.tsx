import styles from './InstructionList.module.css';
import cn from 'classnames';
import { getProjects } from '@/api/client/projects';
import { ProjectCard } from '../ProjectCard/ProjectCard';
import { InstructionListProps } from './InstructionList.props';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { InstructionModel } from '@/interfaces/instruction.interface';
import { InstructionCard } from '../InstructionCard/InstructionCard';
import { getAllInstructions } from '@/api/client/instructions';
import useStore from '@/store/store';

export default function InstructionList({ className }: InstructionListProps)  {

    // zustand store
    const instructions = useStore((state) => state.instructions);
    const setInstructions = useStore((state) => state.setAllInstructions);

	// const [instructions, setInstructions] = useState<InstructionModel[]>([]);
   // const [instructions, setInstructions] = useState<InstructionModel[]>([]);
	const [isLoading, setIsLoading] = useState(false);


   /// console.log("INSTRUCTION LIST: ", instructions)

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
		<div className={cn(className, styles.projectList)}>
			{instructions.map((instruction) => (
				// <Link href={`/projects/${project.id}`} key={project.id}>
					<InstructionCard
					key={instruction.id}
					instructionModel={instruction} />
				// </Link>
			))}
		</div>
	);
};
