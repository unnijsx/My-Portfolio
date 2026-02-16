import React from 'react';
import HeroSection from './ui/glassmorphism-trust-hero';
import RatingDemo from './RatingDemo';
import NotFound from './NotFoundDemo';
import DockDemo from './DockDemo';
import NavbarDemo from './NavbarDemo';

export default function AllDemos() {
    return (
        <div className="flex flex-col w-full bg-zinc-950 min-h-screen">
            <section id="navbar" className="py-20 border-b border-zinc-800">
                <div className="container mx-auto">
                    <h2 className="text-2xl font-bold text-white text-center mb-10">Modern Mobile Menu (Navbar)</h2>
                    <NavbarDemo />
                </div>
            </section>

            <section id="hero">
                <HeroSection />
            </section>

            <section id="dock" className="py-20 border-t border-zinc-800">
                <div className="container mx-auto">
                    <h2 className="text-2xl font-bold text-white text-center mb-10">Hero Dock Component</h2>
                    <DockDemo />
                </div>
            </section>

            <section id="rating" className="py-20 border-t border-zinc-800">
                <div className="container mx-auto">
                    <h2 className="text-2xl font-bold text-white text-center mb-10">Emoji Rating Component</h2>
                    <RatingDemo />
                </div>
            </section>

            <section id="404" className="py-20 border-t border-zinc-800">
                <div className="container mx-auto">
                    <h2 className="text-2xl font-bold text-white text-center mb-10">Cosmic 404 Component</h2>
                    <NotFound />
                </div>
            </section>
        </div>
    );
}
