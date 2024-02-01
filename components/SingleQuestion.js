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
            className={`answer-btn ${answer === props.selectedAnswer ? "selected" : ""}`}
            >
                {decode(answer)}
            </button>
        )
    })
    
    return (
        <div>
            <h3>{decode(props.question)}</h3>
            <div>{answerElements}</div>
            <hr />
        </div>
    )
}