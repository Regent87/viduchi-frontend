
import { Editor } from '@/components/Editor/Editor';
import styles from './page.module.css';
interface Props {
    params: {
        id: string
    }
}

export default function EditorProjectPage ({ params }: Props ): JSX.Element {
 
const id = params.id;
    return <Editor params={params} />
}