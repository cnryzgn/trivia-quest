import { useEffect, useState } from "react"

import { DataContext, useContext } from "../Context/DataContext"

export const Result = () => {
    const { quizResults, setQuizResults }: any = useContext(DataContext)
    const [toggle, setToggle] = useState<boolean>(false)

    useEffect(() => {
        let results: any = localStorage.getItem('quizResults')

        if (results !== null) {
            return setQuizResults(JSON.parse(results))
        }

        window.location.pathname = '/questions'

    }, [])

    return (
        <div className="result-container">
            <h1>Quiz Results</h1>

            <div className="result-wrapper">

                <div className="result">
                    <h2>Results</h2>
                    <div>
                        <div>
                            <p className="result-title">Correct Answer <span>:</span></p>
                            <p className="result-value">{ quizResults.correctAnswers }</p>
                        </div>
                        <div>
                            <p className="result-title">Incorrect Answer <span>:</span></p>
                            <p className="result-value">{ quizResults.incorrectAnswers }</p>
                        </div>
                        <div>
                            <p className="result-title">Empty Answer <span>:</span></p>
                            <p className="result-value">{ quizResults.totalQuestion - (quizResults.incorrectAnswers + quizResults.correctAnswers) }</p>
                        </div>
                        <div>
                            <p className="result-title">Total Answered <span>:</span></p>
                            <p className="result-value">{ quizResults.totalAnswered }</p>
                        </div>
                        <div>
                            <p className="result-title">Score <span>:</span></p>
                            <p className="result-value">{ (quizResults.correctAnswers * 100) / quizResults.totalQuestion}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}