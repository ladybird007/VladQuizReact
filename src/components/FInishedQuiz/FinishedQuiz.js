import React from "react";
import Button from "../UI/Button/Button";
import './FinishedQuiz.css'

const FinishedQuiz = props => {
  console.log(props.results);
  let successCount = Object.keys(props.results).reduce((total, key) => {
    // console.log('total', total);
    if (props.results[key] === 'success') {
      total ++
    }
    return total;
  }, 0);

  // console.log('count', successCount);

  return (
      <div className="FinishedQuiz">
        <ul>
          {
            props.quiz.map((item, i) => {
              console.log(item);
              const cls = props.results[item.id];
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