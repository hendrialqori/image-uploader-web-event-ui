import Profile from './modules/profile';
import UploadArea from './modules/upload-area';
import UploadHistory from './modules/upload-history';
import Logo from '#/components/ui/logo';

export default function ImageUploadPage() {

    return (
        <main className="font-lilita-one min-h-dvh w-full flex-center px-3 py-16"
            style={{ backgroundImage: "url('/pertamina-1.webp')", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundAttachment: "fixed" }}
        >
            <div className="fixed inset-0 bg-black/50" aria-label="overlay" />
            <div className='relative bg-white w-[512px] mx-auto rounded-[0.65rem]'>
                <header className="border-b-2 border-[#D9D9D9] h-[150px]">
                    <Logo />
                </header>
                <div className='p-6'>
                    <Profile />
                    <UploadArea />
                    <UploadHistory />
                </div>
            </div>
        </main>

    )
}
