import React from 'react';
import { CpuArchitecture } from "./ui/cpu-architecture";
import { motion } from "framer-motion";

export default function LoadingScreen() {
    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0A0F1C] transition-colors duration-500"
        >
            <div className="w-full max-w-lg p-8 reveal">
                <div className="p-8 rounded-3xl bg-blue-500/5 border border-blue-500/10 shadow-2xl relative overflow-hidden group">
                    <div className="absolute inset-0 bg-blue-500/10 blur-[100px] -z-10 animate-pulse" />
                    <CpuArchitecture
                        className="w-full h-auto text-blue-400"
                        text="CORE"
                    />
                </div>

                <div className="mt-12 text-center space-y-4">
                    <div className="h-1 w-48 bg-white/5 rounded-full mx-auto overflow-hidden relative">
                        <motion.div
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-400"
                        />
                    </div>
                    <p className="text-xs font-black tracking-[0.5em] uppercase text-blue-500/60 animate-pulse">
                        Initializing System
                    </p>
                </div>
            </div>
        </motion.div>
    );
}
