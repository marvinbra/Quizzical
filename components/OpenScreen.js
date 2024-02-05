import React from "react"

export default function OpenScreen(props) {
    //console.log(props)
    return (
        <div className="open-screen-content">
            <h1 className="header">Quizzical</h1>
            <p className="description">Some description</p>
            <button
                onClick={() => props.setShowQuestions(true)}
                className="start-btn"
            >
              Start quiz
            </button>
        </div>
    )
}