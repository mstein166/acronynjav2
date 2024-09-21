import React, { useState } from 'react';
import { motion } from 'framer-motion'
import { Sword, Target, Zap, ArrowLeft } from 'lucide-react'

export default function AcronynjaNinja() {
    const [gameStarted, setGameStarted] = useState(false)
    const [difficulty, setDifficulty] = useState('')
    const [guessesLeft, setGuessesLeft] = useState(5)
    const [currentAcronym, setCurrentAcronym] = useState('LOL')
    const [guess, setGuess] = useState(['', '', ''])

    const startGame = (selectedDifficulty: string) => {
        setDifficulty(selectedDifficulty)
        setGameStarted(true)
    }

    const goBack = () => {
        setGameStarted(false)
        setGuessesLeft(5)
        setGuess(['', '', ''])
    }

    const submitGuess = () => {
        setGuessesLeft(guessesLeft - 1)
    }

    const getHint = () => {
        // Implement hint logic here
    }

    const showAnswer = () => {
        // Implement show answer logic here
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center p-4">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full"
            >
                {!gameStarted ? (
                    <StartScreen startGame={startGame} />
                ) : (
                    <GameScreen
                        guessesLeft={guessesLeft}
                        currentAcronym={currentAcronym}
                        guess={guess}
                        setGuess={setGuess}
                        submitGuess={submitGuess}
                        getHint={getHint}
                        showAnswer={showAnswer}
                        goBack={goBack}
                    />
                )}
            </motion.div>
        </div>
    )
}

function StartScreen({ startGame }: { startGame: (difficulty: string) => void }) {
    return (
        <div className="text-center">
            <motion.h1
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                className="text-4xl font-bold text-purple-600 mb-6"
            >
                Acronynja
            </motion.h1>
            <p className="text-gray-600 mb-8">
                Think you know your acronyms? You have five guesses to prove it!
            </p>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Choose your difficulty level</h2>
            <div className="flex flex-col space-y-4 mb-8">
                {['Easy', 'Medium', 'Hard'].map((level) => (
                    <motion.button
                        key={level}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-6 py-3 rounded-full text-white font-semibold shadow-md ${level === 'Easy'
                            ? 'bg-green-500 hover:bg-green-600'
                            : level === 'Medium'
                                ? 'bg-yellow-500 hover:bg-yellow-600'
                                : 'bg-red-500 hover:bg-red-600'
                            }`}
                        onClick={() => startGame(level)}
                    >
                        {level === 'Easy' ? <Target className="inline-block mr-2" /> : null}
                        {level === 'Medium' ? <Zap className="inline-block mr-2" /> : null}
                        {level === 'Hard' ? <Sword className="inline-block mr-2" /> : null}
                        {level}
                    </motion.button>
                ))}
            </div>
        </div>
    )
}

function GameScreen({
    guessesLeft,
    currentAcronym,
    guess,
    setGuess,
    submitGuess,
    getHint,
    showAnswer,
    goBack,
}: {
    guessesLeft: number
    currentAcronym: string
    guess: string[]
    setGuess: React.Dispatch<React.SetStateAction<string[]>>
    submitGuess: () => void
    getHint: () => void
    showAnswer: () => void
    goBack: () => void
}) {
    return (
        <div className="text-center">
            <div className="flex justify-between items-center mb-6">
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-purple-600 hover:text-purple-800"
                    onClick={goBack}
                >
                    <ArrowLeft size={24} />
                </motion.button>
                <h1 className="text-3xl font-bold text-purple-600">Acronynja</h1>
                <div className="w-6" /> {/* Spacer for alignment */}
            </div>
            <p className="text-xl font-semibold text-gray-800 mb-4">
                Guesses left: <span className="text-purple-600">{guessesLeft}</span>
            </p>
            <p className="text-2xl font-bold text-gray-800 mb-6">
                The acronym is: <span className="text-purple-600">{currentAcronym}</span>
            </p>
            <div className="space-y-4 mb-6">
                {currentAcronym.split('').map((letter, index) => (
                    <div key={index} className="flex items-center justify-center space-x-2">
                        <span className="text-xl font-semibold text-purple-600">{letter} =</span>
                        <input
                            type="text"
                            value={guess[index]}
                            onChange={(e) => {
                                const newGuess = [...guess]
                                newGuess[index] = e.target.value
                                setGuess(newGuess)
                            }}
                            className="border-2 border-purple-300 rounded-md px-3 py-2 focus:outline-none focus:border-purple-500"
                            placeholder="Enter your guess"
                        />
                    </div>
                ))}
            </div>
            <div className="space-y-4">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full px-6 py-3 bg-purple-600 text-white rounded-full font-semibold shadow-md hover:bg-purple-700 transition duration-300"
                    onClick={submitGuess}
                >
                    Submit your guess
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full px-6 py-3 bg-blue-500 text-white rounded-full font-semibold shadow-md hover:bg-blue-600 transition duration-300"
                    onClick={getHint}
                >
                    Get a hint
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full px-6 py-3 bg-gray-500 text-white rounded-full font-semibold shadow-md hover:bg-gray-600 transition duration-300"
                    onClick={showAnswer}
                >
                    Show me the answer
                </motion.button>
            </div>
        </div>
    )
}