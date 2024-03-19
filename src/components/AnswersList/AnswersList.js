import React from "react";
import AnswerItem from "../AnswerItem/AnswerItem";
import './AnswersList.css';

const AnswersList = props => {
  return (
    <ul className="AnswersList">
      { props.answers.map((answer, i) => {
        return (
          <AnswerItem 
            key={i}
            answer={answer}
            onAnswerClick={props.onAnswerClick} 
            answerState={props.answerState ? props.answerState[answer.id] : null}
          />
        )
      }) }
    </ul>
  )
}

export default AnswersList;