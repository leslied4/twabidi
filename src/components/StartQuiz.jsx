export default function startQuiz(props) {
  return (
    <div className="start-quiz">
      <div className='title'>Twabidi</div>
      <div className='sub-title'>Answer Random Quiz Questions</div>
      <button className="start-quiz-button" onClick={props.startNewQuiz}>Start Quiz</button>
    </div>
  )
}