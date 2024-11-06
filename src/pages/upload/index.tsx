import React from 'react';
import Profile from './modules/profile';

export default function ImageUploadPage() {

    return (
        <main>
            <header className="p-5">
                <h1 className="text-sm text-center md:text-left font-semibold !-tracking-wider">[Company_name/Logo]</h1>
            </header>
            <section className="w-[calc(100%_-_50px)] max-w-3xl mx-auto">
                <Profile />
            </section>
        </main>
    )
}