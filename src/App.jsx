import './App.css'
import QuestionBox from "./components/QuestionBox";
import StartQuiz from "./components/StartQuiz";
import { useState } from "react";

function App() {

  const [startQuiz, setStartQuiz] = useState(false)
  const [quizQuestions, setQuizQuestions] = useState([])
  const [checkAnswers, setCheckAnswers] = useState(false)
  const [correctAnswers, setCorrectAnswers] = useState(0)

  function selectAnswer(id) {
    setQuizQuestions(prevQuizQuestions => (
      prevQuizQuestions.map((prevQuestion) => {
        if(id.split('_')[0] != prevQuestion.id){
          return prevQuestion
        }
        let resetAnswers = prevQuestion.answers.map((answer) => {
          return {...answer, isSelected: false}
        })
        let answers = resetAnswers.map((answer) => {
          return {...answer, isSelected: answer.id == id ? !answer.isSelected : answer.isSelected}
        })
        return {
          id: prevQuestion.id,
          question: prevQuestion.question,
          answers: answers
        }
      })
    ))
  }

  function shuffle(array) {
    var n = array.length, i = -1, j, k;
    while (++i < n) {
      let j = Math.floor(Math.random() * n);
      let k = Math.floor(Math.random() * n);
      let t = array[j];
      array[j] = array[k];
      array[k] = t;
    } 
    return array
  }

  function createQuestionsArray(data, index) {
    let answers = [{
      isSelected: false,
      isCorrect: true,
      text: data.correct_answer,
      id: `${index}_${0}`
    }]
    let incorrectAnswers = data.incorrect_answers.map((answer, count) => ({
      isSelected: false,
      isCorrect: false,
      text: answer,
      id: `${index}_${count + 1}`
    }))
    return {
      id: index,
      question: data.question,
      answers: shuffle(answers.concat(incorrectAnswers))
    }
  }

  function startNewQuiz() {
    // async function getQuizQuestions() {
      //   const res = await fetch("https://opentdb.com/api.php?amount=10")
      //   const data = await res.json()
      //   setQuizQuestions(data.results.map((data, index) => createQuestionsArray(data, index)))
      // }
    // getQuizQuestions()
    setQuizQuestions([])
    setCheckAnswers(false)
    fetch("https://opentdb.com/api.php?amount=10")
      .then(res => res.json())
      .then(data => setQuizQuestions(data.results.map((data, index) => createQuestionsArray(data, index))))
    setStartQuiz(true)
  }

  function handleCheckAnswers() {
    setCheckAnswers(true)
    let count = 0
    quizQuestions.forEach(question => {
      question.answers.forEach(answer => {
        if (answer.isCorrect && answer.isCorrect == answer.isSelected) {
          count += 1;
        }
      })
    })
    setCorrectAnswers(count)
  }

  return (
    <main>
      {startQuiz ?
        quizQuestions.length > 0 ?
          <>
            {
              quizQuestions.map((quizQuestion) => (
                <QuestionBox
                  key={quizQuestion.id}
                  id={quizQuestion.id}
                  question={quizQuestion.question}
                  checkAnswers={checkAnswers}
                  answers={quizQuestion.answers}
                  selectAnswer={selectAnswer}
                />
              ))
            }
            {checkAnswers ? 
              <div className='play-again'>
                <h1 className="sub-title">You scored {correctAnswers} / {quizQuestions.length} correct answers </h1>
                <button className="play-again-button" onClick={startNewQuiz}>Play Again</button>
              </div>

            : <button className="play-again-button" onClick={handleCheckAnswers}>Check Answers</button>}
          </>
        : <div className="loader"></div>
      :
        <StartQuiz startNewQuiz={startNewQuiz}/>
      }
    </main>
  )
}

export default App
