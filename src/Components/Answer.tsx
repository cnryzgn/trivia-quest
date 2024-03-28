import { useEffect, useState } from "react"

export const Answer = ({ correctAnswer, incorrectAnswers, questionNumber }: any) => {
    const [answers, setAnswers] = useState<any>([])

    const answerType = ['A', 'B', 'C', 'D', 'E']
    useEffect(() => {
        let allAnswers = incorrectAnswers
        allAnswers.push(correctAnswer)
        shuffleArr(allAnswers)
        setAnswers(allAnswers)

    }, [])

    function shuffleArr(array: unknown[]): unknown[] {
        let currectIndex = array.length
        let randomIndex

        while (currectIndex !== 0) {
            randomIndex = Math.floor(Math.random () * currectIndex)
            currectIndex--

            [array[currectIndex], array[randomIndex]] = [array[randomIndex], array[currectIndex]]
        }

        return array
    }

    return (
        <div className="answer-container">
            {
                answers !== undefined &&

                answers.map((answer: any, index: any) => (

                    <div key={Math.floor(Math.random() * 1000)} className="answer-wrapper">
                        <input
                            type="radio"
                            key={Math.floor(Math.random() * 1000)}
                            id={`${answer}-${index}`}
                            className="answerInput"
                            name={questionNumber}
                            style={{ 'display': 'none' }}
                            value={answer}
                        />
                        <label className="answer-label" htmlFor={`${answer}-${index}`}>
                            <span id="answer-option">{answerType[index]})</span>
                            {answer}
                        </label>
                    </div>
                ))
            }
        </div>
    )
}