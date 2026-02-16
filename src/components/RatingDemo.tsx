"use client"

import { RatingInteraction } from "./ui/emoji-rating"

export default function RatingDemo() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 p-8 w-full">
            <div className="flex flex-col items-center gap-8">

                <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
                    How was your experience?
                </p>

                <RatingInteraction />

                <div className="mt-4 h-px w-24 bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
            </div>
        </main>
    )
}
