import React from 'react';
import { InteractiveMenu, InteractiveMenuItem } from "./ui/modern-mobile-menu";
import { Home, Briefcase, Calendar, Shield, Settings } from 'lucide-react';

const lucideDemoMenuItems: InteractiveMenuItem[] = [
    { label: 'home', icon: Home },
    { label: 'strategy', icon: Briefcase },
    { label: 'period', icon: Calendar },
    { label: 'security', icon: Shield },
    { label: 'settings', icon: Settings },
];

const customAccentColor = 'var(--color-chart-2)';

export default function NavbarDemo() {
    return (
        <div className="flex flex-col gap-12 items-center p-8 bg-zinc-950 min-h-[400px] justify-center">
            <div className="flex flex-col items-center gap-4">
                <h3 className="text-zinc-400 text-sm font-medium">Default Mode</h3>
                <InteractiveMenu />
            </div>

            <div className="flex flex-col items-center gap-4">
                <h3 className="text-zinc-400 text-sm font-medium">Customized (Green Accent)</h3>
                <InteractiveMenu items={lucideDemoMenuItems} accentColor={customAccentColor} />
            </div>
        </div>
    );
}
