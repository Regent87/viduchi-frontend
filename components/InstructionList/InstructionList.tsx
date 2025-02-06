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
;

export default function InstructionList({ className }: InstructionListProps)  {

    // let new_instructions: InstructionModel[] = [
    //     {
    //         id: 1,
    //         title: "первая длинная инструкция для замены батарейки",
    //         date: "2024-12-17T13:24:20.980895Z",

    //     },
    //     {
    //         id: 2,
    //         title: "вторая",
    //         date: "2024-12-17T13:24:20.980895Z",

    //     },
    //     {
    //         id: 3,
    //         title: "третья",
    //         date: "2024-12-17T13:24:20.980895Z",

    //     },
    //     {
    //         id: 4,
    //         title: "четвертая",
    //         date: "2024-12-17T13:24:20.980895Z",

    //     },
    //     {
    //         id: 5,
    //         title: "пятая",
    //         date: "2024-12-17T13:24:20.980895Z",

    //     }
    // ]

	// const [instructions, setInstructions] = useState<InstructionModel[]>([]);
    const [instructions, setInstructions] = useState<InstructionModel[]>([]);
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
