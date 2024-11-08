import React from 'react';
import Profile from './modules/profile';
import UploadArea from './modules/upload-area';
import type { FileHistory } from '#/@types';
import UploadHistory from './modules/upload-history';

export default function ImageUploadPage() {

    const [histories, setHistories] = React.useState<FileHistory[]>([])

    function updateHistory(data: FileHistory) {
        setHistories((prev) => [data, ...prev])
    }

    return (
        <main className='bg-[#F9F9F9] pb-20'>
            <header className="p-5">
                <h1 className="text-sm text-center md:text-left font-semibold !-tracking-wider">[Company_name/Logo]</h1>
            </header>
            <section className="w-[calc(100%_-_50px)] max-w-2xl mx-auto space-y-6">
                <Profile />
                <UploadArea onUpdateHistory={updateHistory} />
                <UploadHistory histories={histories} />
            </section>
        </main>
    )
}