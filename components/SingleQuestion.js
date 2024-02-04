import React from "react"
import {decode} from "html-entities"

export default function SingleQuestion(props) {
    //console.log(props)
    
    function clickAnswer(answer, currentQuestion) {
        props.updateAnswer(currentQuestion, answer)
    }
    
    const answerElements = props.allAnswers.map((answer, index) => {
        return (
            <button 
                key={index} 
                onClick={() => clickAnswer(answer, props.question)}
                className={`answer-btn ${
                    answer === props.selectedAnswer ? "selected" : ""
                    }
                    ${props.showResult && answer === props.correctAnswer ? "correct" : ""}
                    ${props.showResult && answer === props.selectedAnswer && answer !== props.correctAnswer ? "incorrect" : ""}
                `}
            >
                {decode(answer)}
            </button>
        )
    })
    
    return (
        <div className="question-container">
            <h2 className="question">{decode(props.question)}</h2>
                <div className="answers-btn-container">
                    {answerElements}
                </div>
            <hr />
        </div>
    )
}