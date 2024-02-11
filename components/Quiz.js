import React from "react"
import SingleQuestion from "./SingleQuestion"

export default function Questions() {
    
    const [questions, setQuestions] = React.useState([])
    const [questionsAndAnswers, setQuestionsAndAnswers] = React.useState([])
    const [showWarning, setShowWarning] = React.useState(false)
    const [numCorrectAnswers, setNumCorrectAnswers] = React.useState(0)
    const [showResults, setShowResults] = React.useState(false)
    
    React.useEffect(() => {
        if(questionsAndAnswers.length === 0) {
            fetch("https://opentdb.com/api.php?amount=5")
                .then(res => res.json())
                .then(data => {
                    //console.log(data.results)
                    setQuestions(data.results)
                    setQuestionsAndAnswers(
                        data.results.map( (questionObj) => {
                        return {
                                question: questionObj.question,
                                shuffledAnswers: shuffle([
                                        ...questionObj.incorrect_answers,
                                        questionObj.correct_answer
                                    ]),
                                correctAnswer: questionObj.correct_answer,
                                selectedAnswer: ""
                            }
                        })
                    )
                })            
        }
    }, [questionsAndAnswers])
    
    // stackoverflow
    function shuffle(array) {
    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle.
        while (currentIndex > 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }
    
    function updateAnswer(currentQuestion, answer) {
        setQuestionsAndAnswers(
            questionsAndAnswers.map(questionObj => {
                return questionObj.question === currentQuestion
                ? {...questionObj, selectedAnswer: answer}
                : questionObj
            })
        )
    }
    
    function checkAnswers() {
        const notAllAnswered = questionsAndAnswers.some( questionObj => {
            return questionObj.selectedAnswer === ""
        })
        setShowWarning(notAllAnswered)
        
        // all questions have been answered
        if (!notAllAnswered) {
            questionsAndAnswers.forEach( questionObj => {
                if(questionObj.selectedAnswer === questionObj.correctAnswer) {
                    setNumCorrectAnswers(prevNum => prevNum + 1)
                }
            })
            setShowResults(true)
        }
    }
    
    function playAgain() {
        setQuestions([])
        setQuestionsAndAnswers([])
        setShowResults(false)
        setNumCorrectAnswers(0)
    }
    
    const questionsElement = questionsAndAnswers.map( (questionObj, index) => {
        return (
            <SingleQuestion
                key={index}
                question={questionObj.question}
                allAnswers={questionObj.shuffledAnswers}
                updateAnswer={updateAnswer}
                selectedAnswer={questionObj.selectedAnswer}
                showResult={showResults}
                correctAnswer={questionObj.correctAnswer}
            />
        )
    })
    
    return (
        <div>
        
            <div className="questions-container">
                {questionsElement}
            </div>
            
            <div className="text-center">
            
                {!showWarning ? "" 
                 : <p className="warning-message">
                    Not all questions have been answered yet
                  </p>}
            
                { questions.length > 0 && !showResults ?
                    <button onClick={checkAnswers} className="check-btn">Check answers</button>
                : ""
                }
                
            </div>
            
            { showResults ?
                <div className="result-container">
                
                    <p className="result-message">
                        You scored {numCorrectAnswers}/5 correct answers
                    </p>
                    
                    <button onClick={playAgain} className="play-again-btn">
                        Play again
                    </button>
                    
                </div> 
                : ""
            }
            
        </div>
    )
}