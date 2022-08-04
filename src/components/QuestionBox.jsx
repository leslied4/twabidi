export default function QuestionBox(props) {

  function decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  }

  const answers = props.answers.map((answer) => {
    let htmlClasses = ''
    if (props.checkAnswers && answer.isCorrect) {
      htmlClasses = "is-correct-button"
    }else if (props.checkAnswers && !answer.isCorrect && answer.isSelected) {
      htmlClasses = "is-wrong-button"
    }else if(answer.isSelected) {
      htmlClasses = "is-selected-button"
    }else {
      htmlClasses = "answer-button"
    }

    return (
      <button 
        key={answer.id}
        onClick={() => props.selectAnswer(answer.id)}
        className={`possible-answers-button ${htmlClasses}`}
      >
        {decodeHtml(answer.text)}
      </button>
    )
  });

  return (
    <div className='question-section'>
      <div>
        <div className="questions">{decodeHtml(props.question)}</div>
      </div>
      <div className='answer-section'>
        {answers}
      </div>
    </div>
  )
}