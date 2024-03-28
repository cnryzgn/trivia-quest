import { Answer } from "./Answer"

import { DataContext, useContext } from "../Context/DataContext"
import { useEffect, useState } from "react"
import { Loading } from "./Loading"
import { ScrollButton } from "./ScrollButton"
import { useNavigate } from "react-router-dom"

export const Question = () => {
    const navigate = useNavigate()
    const { questions, setQuizResults }: any = useContext(DataContext)
    let qNum: number = 1


    useEffect(() => { localStorage.removeItem('quizResults') }, [])

    const formHandler = (event: React.FormEvent) => {
        event.preventDefault()
        const answerInputs        : any    = document.querySelectorAll('.answerInput') // All answers elements - hidden inputs -
        const questionText        : any    = document.querySelectorAll('.questionText') // All questions elements - hidden inputs - 
        let correctAnswerCount    : number = 0
        let answeredQuestionCount : number = 0

        Object.keys(answerInputs).map((i: any) => {
            if (answerInputs[i].checked) {
                answeredQuestionCount++

                let getQuestionNumber: any = Object.keys(questionText).filter((j: any) => questionText[j].id === answerInputs[i].name)
                let question: any = questions.filter((data: any) => data.question === questionText[getQuestionNumber].value)
                let correctAnswer = question[0].correct_answer



                if (correctAnswer === answerInputs[i].value) {
                    correctAnswerCount++
                } 

            }
        })


        setQuizResults({
            correctAnswers   : correctAnswerCount,
            incorrectAnswers : (answeredQuestionCount - correctAnswerCount),
            totalAnswered    : answeredQuestionCount,
            totalQuestion    : Object.keys(questions).length
        })

        const results = {
            correctAnswers   : correctAnswerCount,
            incorrectAnswers : (answeredQuestionCount - correctAnswerCount),
            totalAnswered    : answeredQuestionCount,
            totalQuestion    : Object.keys(questions).length
        }

        localStorage.setItem('quizResults', JSON.stringify(results))

        navigate('/results')

    }


    return (
        <>
            {questions === undefined 
                ? <Loading />
                : <form onSubmit={(e: React.FormEvent) => formHandler(e)} method="POST">

                    <div className="question-container">
                        {

                            questions.map((question: any, index: number) => (
                                <div key={Math.floor(Math.random() * 1000)} className="question">
                                    <div id="question-top">
                                        <p>{qNum++}) </p>
                                        <p style={{ display: 'inline-block' }}>{question.question}</p>
                                    </div>
                                    <input type="hidden" id={`question_${index}`} className="questionText" value={question.question} />
                                    <Answer
                                        incorrectAnswers = { question.incorrect_answers }
                                        correctAnswer = { question.correct_answer }
                                        questionNumber = { `question_${index}` }
                                    />
                                </div>
                            ))
                        }
                        <button id="finish-btn" type="submit">Finish</button>
                    </div>

                    <ScrollButton />
                    <button onClick={() => navigate(-1)} type="button" id="back-button">
                        <i className="fa-solid fa-arrow-left-long"></i>
                    </button>
                </form>
            }
        </>
    )

}