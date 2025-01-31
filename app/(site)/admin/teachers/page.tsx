import { AdminMenu } from "@/components/AdminMenu/AdminMenu";
import { Teachers } from "@/components/Teachers/Teachers";


export default function TeachersPage() {

    return (
        <main className={'admin'}>
          <AdminMenu />
          <Teachers />
        </main>
    )
}