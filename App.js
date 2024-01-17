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
    
    React.useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=10")
            .then(res => res.json())
            .then(data => {
                //console.log(data.results)
                if(data && data.results && Array.isArray(data.results)) {
                    const questionsArr = data.results.map(result => result.question)
                    const correctAnswerArr = data.results.map(result => result.correct_answer)
                    setQuestion(questionsArr)
                    setAnswer(correctAnswerArr)
                }
            })
            .catch(error => {
                console.error("Error fetching data:", error)
            })
    }, [question, answer])
    
    //console.log(answer)
    
    return (
        <main>
              
            {   
                !startGame ?
                <LandingPage
                    startQuiz={startGameFunc}
               />
                :
               <Quiz
                    questions={question}
                    answers={answer}
               />
            }
           
        </main>
    )
}