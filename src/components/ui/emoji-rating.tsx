"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "../../lib/utils"

interface RatingInteractionProps {
    onChange?: (rating: number) => void
    className?: string
}

const ratingData = [
    { emoji: "😔", label: "Terrible", glow: "rgba(239, 68, 68, 0.2)" },
    { emoji: "😕", label: "Poor", glow: "rgba(249, 115, 22, 0.2)" },
    { emoji: "😐", label: "Okay", glow: "rgba(234, 179, 8, 0.2)" },
    { emoji: "🙂", label: "Good", glow: "rgba(132, 204, 22, 0.2)" },
    { emoji: "😍", label: "Amazing", glow: "rgba(16, 185, 129, 0.2)" },
]

export function RatingInteraction({ onChange, className }: RatingInteractionProps) {
    const [rating, setRating] = useState(0)
    const [hoverRating, setHoverRating] = useState(0)

    const handleClick = (value: number) => {
        setRating(value)
        onChange?.(value)
    }

    const displayRating = hoverRating || rating

    return (
        <div className={cn("flex flex-col items-center gap-10", className)}>
            {/* Emoji rating buttons */}
            <div className="flex items-center gap-4">
                {ratingData.map((item, i) => {
                    const value = i + 1
                    const isActive = value <= displayRating
                    const isSelected = rating === value

                    return (
                        <motion.button
                            key={value}
                            onClick={() => handleClick(value)}
                            onMouseEnter={() => setHoverRating(value)}
                            onMouseLeave={() => setHoverRating(0)}
                            whileHover={{ scale: 1.2, y: -5 }}
                            whileTap={{ scale: 0.9 }}
                            className="group relative focus:outline-none"
                            aria-label={`Rate ${value}: ${item.label}`}
                        >
                            {/* Glow effect behind emoji */}
                            <AnimatePresence>
                                {(isActive || isSelected) && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        animate={{ opacity: 1, scale: 1.5 }}
                                        exit={{ opacity: 0, scale: 0.5 }}
                                        className="absolute inset-0 rounded-full blur-xl z-0"
                                        style={{ backgroundColor: item.glow }}
                                    />
                                )}
                            </AnimatePresence>

                            <div
                                className={cn(
                                    "relative flex h-16 w-16 items-center justify-center rounded-2xl transition-all duration-500 ease-out z-10",
                                    isActive ? "grayscale-0 scale-110" : "grayscale opacity-30 group-hover:opacity-100 group-hover:grayscale-0",
                                    isSelected && "ring-2 ring-white/20 bg-white/5"
                                )}
                            >
                                <span className="text-4xl select-none leading-none">
                                    {item.emoji}
                                </span>
                            </div>
                        </motion.button>
                    )
                })}
            </div>

            <div className="relative h-8 flex items-center justify-center min-w-[120px]">
                <AnimatePresence mode="wait">
                    {displayRating === 0 ? (
                        <motion.span
                            key="idle"
                            initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                            className="text-xs font-bold uppercase tracking-[0.3em] text-white/20 whitespace-nowrap"
                        >
                            Rate the feeling
                        </motion.span>
                    ) : (
                        <motion.span
                            key={ratingData[displayRating - 1].label}
                            initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                            className="text-sm font-black uppercase tracking-widest text-[#E5E5E0] whitespace-nowrap"
                        >
                            {ratingData[displayRating - 1].label}
                        </motion.span>
                    )
                    }
                </AnimatePresence>
            </div>
        </div>
    )
}
