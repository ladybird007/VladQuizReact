import React, {Component} from "react";
import './QuizList.css';
import { NavLink } from "react-router-dom";

export default class QuizList extends Component {

  renderQuizes() {
    return [1,2,3].map((quiz, i) => {
      return (
        <li key={i}>
          <NavLink to={'/quiz/' + quiz}>
            Quiz {quiz}
          </NavLink>
        </li>
      )
    })
  }

	render() {
		return (
      <div className="QuizList">
        <h1>QuizList</h1>

        <ul>
          { this.renderQuizes() }
        </ul>
      </div>
    )
	}
}