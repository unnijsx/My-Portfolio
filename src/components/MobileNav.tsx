import React from "react";
import { Dock } from "./ui/dock";

export default function MobileNav() {
    return (
        <div className="fixed bottom-6 left-0 right-0 z-50 flex justify-center px-4 md:hidden">
            <div className="w-full max-w-md">
                <Dock />
            </div>

            {/* Dynamic Styles for the Halo and Tooltip effects */}
            <style>{`
        .hover-halo{position:relative}
        .hover-halo::after{content:"";position:absolute;inset:-2px;border-radius:inherit;opacity:0;transition:opacity .25s, transform .25s;box-shadow:0 0 0 0 rgba(255,255,255,.18),0 12px 30px -10px rgba(0,0,0,.7)}
        .hover-halo:hover::after{opacity:1;}
        .tooltip{opacity:0;transform:translateY(6px);transition:opacity .2s, transform .2s}
        .group:hover .tooltip{opacity:1;transform:translateY(0)}
      `}</style>
        </div>
    );
}
