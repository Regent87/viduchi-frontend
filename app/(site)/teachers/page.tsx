import { StudentsMenu } from "@/components/StudentsMenu/StudentsMenu";
import { Teachers } from "@/components/Teachers/Teachers";


export default function TeachersPage() {

    return (
        <main className={'students'}>
          <StudentsMenu />
          <Teachers />
        </main>
    )
}