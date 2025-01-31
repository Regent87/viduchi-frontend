import { AdminMenu } from "@/components/AdminMenu/AdminMenu";
import { Students } from "@/components/Students/Students";


export default function StudentsPage() {

    return (
        <main className={'admin'}>
          <AdminMenu />
          <Students />
        </main>
    )
}