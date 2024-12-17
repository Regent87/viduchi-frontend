import styles from './ProjectList.module.css';
import cn from 'classnames';
import { getProjects } from '@/api/client/projects';
import { ProjectCard } from '../ProjectCard/ProjectCard';
import { ProjectListProps } from './ProjectList.props';
import { useEffect, useState } from 'react';
import { ProjectModel } from '@/interfaces/project.interface';
import Link from 'next/link';
;

export default function ProjectList({ className }: ProjectListProps)  {
	const [projects, setProjects] = useState<ProjectModel[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const fetchProjects = async () => {
			setIsLoading(true);

			const projects = await getProjects();
			setProjects(projects);

			setIsLoading(false);
		};
		fetchProjects();
	}, []);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<div className={cn(className, styles.projectList)}>
			{projects.map((project) => (
				// <Link href={`/projects/${project.id}`} key={project.id}>
					<ProjectCard 
					key={project.id}
					projectModel={project} />
				// </Link>
			))}
		</div>
	);
};
