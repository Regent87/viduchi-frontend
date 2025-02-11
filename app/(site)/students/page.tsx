import { Students } from "@/components/Students/Students";
import { StudentsMenu } from "@/components/StudentsMenu/StudentsMenu";

export default function StudentsPage() {

    return (
        <main className={'students'}>
          <StudentsMenu />
          <Students />
        </main>
    )
}