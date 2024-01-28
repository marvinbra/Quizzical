import React from "react"
import {encode} from 'html-entities'

export default function Quiz(props) {
    
    //console.log(props.rightAnswer)
    //console.log(props.falseAnswer)
    console.log(props.allAnswers)
    
    //const allAnswers = props.allAnswers.map(answer => {
    //    console.log(answer)
    //})
    
    let mergedData = props.allAnswers.reduce((acc, current) => {
    let existingItem = acc.find(item => JSON.stringify(item.index) === JSON.stringify(current.index));

    if (existingItem) {
        // Merge properties of the existing item with the current item
        Object.entries(current).forEach(([key, value]) => {
        if (key !== 'index') {
            existingItem[key] = Array.isArray(existingItem[key])
            ? existingItem[key].concat(value)
            : [existingItem[key], value];
        }
        });
    } else {
        // Add the current item to the accumulator
        acc.push(current);
    }

    return acc;
    }, []);

    console.log(mergedData)
    
    

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