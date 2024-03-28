import { useEffect, useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import axios from "axios"

// Context
import { DataContext } from "./Context/DataContext"

// Components
import { Question } from "./Components/Question"
import { Result } from "./Components/Result"
import { Home } from "./Components/Home"

// Interfaces
import { QuizResult } from "./Interfaces/GeneralInterfaces"

export const App = () => {
    const [questions, setQuestions] = useState<any>()
    const [categories, setCategories] = useState<any>([])
    const [selectedCategory, setSelectedCategory] = useState<any>()
    const [selectedDifficulty, setSelectedDifficulty] = useState<any>('')
    const [difficulties, setDifficulties] = useState<any>([])
    const [quizResults, setQuizResults] = useState<QuizResult>({
        correctAnswers: 0,
        incorrectAnswers: 0,
        totalAnswered: 0,
        totalQuestion: 0
    })

    useEffect(() => {
        axios.get('data.json')
            .then((loadedQuestion: any) => {
                setCategories(loadedQuestion.data.trivia_categories)
                setDifficulties(loadedQuestion.data.difficulties)

            })
            .catch((err: any) => err)
    }, [])

    const data = {  
        questions, setQuestions,
        quizResults, 
        setQuizResults, 
        categories, 
        difficulties, 
        selectedCategory, setSelectedCategory, 
        selectedDifficulty, setSelectedDifficulty, 
    }


    return (
        <DataContext.Provider value={data}>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/questions" element={<Question />} />
                    <Route path="/results" element={<Result />} />
                </Routes>
            </Router>
        </DataContext.Provider>
    )
}