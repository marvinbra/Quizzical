import React from "react"
import LandingPage from "./components/LandingPage"
import Quiz from "./components/Quiz"

export default function App() {
    
    const [startGame, setStartGame] = React.useState(false)
    const [question, setQuestion] = React.useState([])
    const [answer, setAnswer] = React.useState([])
    
    function startGameFunc() {
        console.log("started")
        setStartGame(oldState => !oldState)
        console.log(startGame)
    }

}