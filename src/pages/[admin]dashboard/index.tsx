import Aside from "./modules/aside";
import Header from "./modules/header";
import ImageList from "./modules/image-list";
import UserTable from "./modules/user-table";

export default function AdminDashboardPage() {
    return (
        <main className="flex min-h-screen font-inter">
            <Aside />
            <section className="max-w-[1550px] mx-auto p-5 space-y-3 md:space-y-10 w-full">
                <Header />
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-20 xl:gap-10">
                    <UserTable />
                    <ImageList />
                </div>
            </section>
        </main>
    )
}