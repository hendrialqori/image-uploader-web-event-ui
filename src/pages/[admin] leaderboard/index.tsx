import Logo from "#/components/ui/logo";
import Placements from "./modules/placements";

export default function AdminLeaderboardPage() {
    return (
        <main className="font-lilita-one min-h-dvh w-full flex-center px-3 py-16"
            style={{ backgroundImage: "url('/pertamina-5.webp')", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundAttachment: "fixed" }}
        >
            <div className="fixed inset-0 bg-black/50" aria-label="overlay" />
            <div className="relative bg-white w-full max-w-[642px] mx-auto rounded-[0.65rem]" aria-label="form">
                <header className="border-b-2 border-[#D9D9D9] h-[130px] md:h-[150px]">
                    <Logo />
                </header>
                <div aria-label="placements">
                    <div className="text-center space-y-3 md:space-y-7 py-6 md:py-12 px-5 md:px-14">
                        <h1 className="text-2xl md:text-5xl text-pertamina-navy">Leaderboard</h1>
                        <p className="text-xs md:text-lg text-pertamina-blue">
                            Check user rankings based on points earned for each photo uploaded.
                            The more photos you upload and engage, the higher your rank!
                        </p>
                    </div>
                    <Placements />
                </div>
            </div>
        </main>
    )
}


