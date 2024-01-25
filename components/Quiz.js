import React from "react"
import {encode} from 'html-entities'

export default function Quiz(props) {
    
    //console.log(props.rightAnswer)
    //console.log(props.falseAnswer)
    //console.log(props.allAnswers)
    
    for (let i = 0; i < props.questions.length; i++) {
        console.log(props.rightAnswer[i])
        console.log(props.falseAnswer[i])
    }
    
    const quizQuestion = props.questions.map((question, index) => {
        //console.log(question)
        return  (
            <div>
                <p>{question}</p>
                <hr />
            </div>
        )
    })
    
    return (
        <section>
            <h1>Quiz started, good luck!</h1>
            <p>{quizQuestion}</p>
        </section>
    )
}