import React from "react"
import {encode} from 'html-entities'

export default function Quiz(props) {
    
    console.log(props.falseAnswers[0])
    console.log(props.answers[0])
    
        //for (let i = 0; i < props.questions.length; i++) {
        //console.log(props.questions[i])
        //perguntas += props.questions[i]
        //console.log(perguntas)
    //}
    
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