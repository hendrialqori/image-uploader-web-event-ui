import Aside from "./modules/aside";
import Header from "./modules/header";
import ImageList from "./modules/image-list";
import UserTable from "./modules/user-table";

export default function AdminDashboardPage() {
    return (
        <main className="flex max-w-[2550px] mx-auto">
            <Aside />
            <section className="p-5 space-y-10">
                <Header />
                <div className="flex gap-20">
                    <UserTable />
                    <ImageList />
                </div>
            </section>
        </main>
    )
}