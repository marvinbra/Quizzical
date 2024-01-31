import React from "react"

export default function OpenScreen(props) {
    //console.log(props)
    return (
        <div>
            <h1>Quizzical</h1>
            <p>Some description</p>
            <button
                onClick={() => props.setShowQuestions(true)}
            >
              Start quiz
            </button>
        </div>
    )
}