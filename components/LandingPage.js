import React from "react"

export default function LadingPage(props) {
  //  console.log(props)
    return (
        <div className="landinPage">
            <h2>Quizzical</h2>
            <p>Some description if needed</p> 
            <button onClick={props.startQuiz}>Start quiz</button>
        </div>
    )
}