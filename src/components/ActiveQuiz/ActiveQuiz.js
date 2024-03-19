import React from "react";
import AnswersList from "../AnswersList/AnswersList";
import './ActiveQuiz.css';

const ActiveQuiz = props => {
  return (
    <div className="ActiveQiuz">
      <p className="Question">
        <span>{props.question}</span>
        <small>{props.answerNumber}/{props.quizLength}</small>
      </p>

      <AnswersList
        answerState={props.answerState}
        answers={props.answers}
        onAnswerClick={props.onAnswerClick}
      />
    </div>
  )
}

export default ActiveQuiz;