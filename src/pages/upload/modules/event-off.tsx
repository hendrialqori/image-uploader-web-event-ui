import Logo from "#/components/ui/logo";
import { TOKEN } from "#/constant";
import { useNavigate } from "react-router-dom";

export default function EventOff() {
    const navigate = useNavigate()

    function logoutAction() {
        localStorage.removeItem(TOKEN)
        navigate("/auth/login")
    }


    return (
        <main className="font-lilita-one min-h-dvh w-full flex-center px-3 py-16"
            style={{ backgroundImage: "url('/pertamina-4.webp')", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundAttachment: "fixed" }}
        >
            <div className="fixed inset-0 bg-black/50" aria-label="overlay" />
            <div className='relative bg-white w-[512px] mx-auto rounded-[0.65rem]'>
                <header className="border-b-2 border-[#D9D9D9] h-[150px]">
                    <Logo />
                </header>
                <div className="py-10 text-center space-y-5">
                    <div className="text-xs md:text-base">
                        <h1>Hebat Banget! Sayangnya Event ini telah berakhir</h1>
                        <p className="tracking-wider">Ikuti terus dan jangan lewatkan Event berikutnya ya! ☺️</p>
                    </div>
                    <button onClick={logoutAction} className="text-xs md:text-sm font-medium bg-black hover:outline hover:outline-blbg-black text-white rounded-md py-2 px-6">
                        Logout
                    </button>
                </div>
            </div>
        </main>
    )
}