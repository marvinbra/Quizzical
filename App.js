import React from "react"
import LandingPage from "./components/LandingPage"
import Quiz from "./components/Quiz"

export default function App() {
    
    const [startGame, setStartGame] = React.useState(false)
    const [question, setQuestion] = React.useState([])
    const [allAnswers, setAllAnswers] = React.useState([])
    const [rightAnswers, setRightAnswers] = React.useState([])
    const [falseAnswers, setFalseAnswers] = React.useState([])
    
    function startGameFunc() {
        console.log("started")
        setStartGame(oldState => !oldState)
        console.log(startGame)
    }
    
    React.useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5")
            .then(res => res.json())
            .then(data => {
                //console.log(data.results)
                if(data && data.results && Array.isArray(data.results)) {
                    const questionsArr = data.results.map(result => result.question)
                    const correctAnswerArr = data.results.map(result => result.correct_answer)
                    const incorrectAnswerArr = data.results.map(result => result.incorrect_answers)
                    
                    setQuestion(questionsArr)
                    
                    const rightAnswers = []
                    const falseAnswers = []
                    
                    for (
                        let i = 0; i < correctAnswerArr.length && i < incorrectAnswerArr.length; i++
                        ) 
                        {
                           rightAnswers.push(
                               { isCorrect: true, content: correctAnswerArr[i] }
                               )
                            falseAnswers.push(
                                { isCorrect: false, content: incorrectAnswerArr[i] }
                                )
                    }
                    
                    setRightAnswers(rightAnswers)
                    setFalseAnswers(falseAnswers)
                    
                     const allAnswers = rightAnswers.concat(falseAnswers)
                     
                     for (let i = allAnswers.length - 1; i > 0; i--) {
                        const j = Math.floor(Math.random() * (i + 1));
                        [allAnswers[i], allAnswers[j]] = [allAnswers[j], allAnswers[i]];
                    }
                    
                    setAllAnswers(allAnswers)
                    
                }
            })
            .catch(error => {
                console.error("Error fetching data:", error)
            })
    }, [])
    
    
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
                    allAnswers={allAnswers}
                    rightAnswer={rightAnswers}
                    falseAnswer={falseAnswers}
               />
            }
           
        </main>
    )
}