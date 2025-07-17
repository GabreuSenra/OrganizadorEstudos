import React, { useState, useEffect } from 'react'

const PomodoroTimer = ({ focusedTask, onPomodoroEnd }) => {
    const [secondsLeft, setSecondsLeft] = useState(25 * 60)
    const [isRunning, setIsRunning] = useState(false)

    useEffect(() => {
        let interval
        if (isRunning) {
            interval = setInterval(() => {
                setSecondsLeft(prev => {
                    if (prev === 1) {
                        clearInterval(interval)
                        setIsRunning(false)
                        onPomodoroEnd()

                        return 25 * 60 // reseta para 25 minutos
                    }
                    return prev - 1
                })
            }, 1000)
        }
        return () => clearInterval(interval)
    }, [isRunning, onPomodoroEnd])

    const formatTime = () => {
        const m = Math.floor(secondsLeft / 60)
        const s = secondsLeft % 60
        return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
    }

    const radius = 90
    const circumference = 2 * Math.PI * radius
    const progress = (secondsLeft / (25 * 60)) * 100

    return (
        <div className="bg-white p-6 rounded-2xl shadow-md text-center relative">
            <h2 className="text-2xl font-semibold text-purple-700 mb-4">Pomodoro</h2>

            {focusedTask && (
                <p className="mb-2 text-gray-600">
                    Focando em: <span className="font-medium text-purple-600">{focusedTask.text}</span>
                </p>
            )}

            <div className="relative w-64 h-64 mx-auto">
                <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 256 256">
                    <defs>
                        <linearGradient id="gradient" x1="1" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#7c3aed" />      {/* Roxo claro */}
                            <stop offset="100%" stopColor="#4c1d95" />    {/* Roxo escuro */}
                        </linearGradient>
                    </defs>

                    {/* Fundo do círculo */}
                    <circle
                        cx="128"
                        cy="128"
                        r={radius}
                        stroke="#E5E7EB"
                        strokeWidth="10"
                        fill="none"
                    />

                    {/* Anel com gradiente */}
                    <circle
                        cx="128"
                        cy="128"
                        r={radius}
                        stroke="url(#gradient)"
                        strokeWidth="10"
                        fill="none"
                        strokeDasharray={circumference}
                        strokeDashoffset={(1 - progress / 100) * circumference}
                        strokeLinecap="round"
                        transform="rotate(-90 128 128)"
                    />
                </svg>

                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <p className="text-4xl font-mono text-purple-800">{formatTime()}</p>
                </div>
            </div>

            <button
                onClick={() => setIsRunning(prev => !prev)}
                className="mt-6 px-6 py-2 rounded-xl bg-purple-600 text-white hover:bg-purple-700 transition"
            >
                {isRunning ? 'Pausar' : 'Iniciar'}
            </button>
        </div>
    )
}

export default PomodoroTimer
