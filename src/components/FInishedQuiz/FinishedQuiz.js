import React from "react";
import Button from "../UI/Button/Button";
import './FinishedQuiz.css'

const FinishedQuiz = props => {
  let successCount = Object.keys(props.results).reduce((total, key) => {
    if (props.results[key] === 'success') {
      total ++
    }
    return total;
  }, 0)
  return (
      <div className="FinishedQuiz">
        <ul>
          {
            props.quiz.map((item, i) => {
              const cls = props.results[item.id] === 'error' ? 'error' :  'success';
              return (
                <li key={i} className={cls}>
                  <strong>{i + 1}. </strong>
                  {item.question}
                </li>
              )
            })
          }

        </ul>

        <p>Correct answers {successCount}/{props.quizLength}</p>

        <div>
          <Button onClick={props.onRetry} type="primary">Retry</Button>
        </div>
      </div>
  )
}

export default FinishedQuiz;