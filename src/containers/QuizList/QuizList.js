import React, {Component} from "react";
import axios from "axios";
import './QuizList.css';
import Loader from "../../components/UI/Loader/Loader";
import { NavLink } from "react-router-dom";

export default class QuizList extends Component {

  state = {
    quizes: [],
    loading: true
  }

  renderQuizes() {
    return this.state.quizes.map(quiz => {
      return (
        <li key={quiz.id}>
          <NavLink to={'/quiz/' + quiz.id}>
            {quiz.name}
          </NavLink>
        </li>
      )
    })
  }

  async componentDidMount() {
    try {
      const response = await axios.get('https://quiz-61d92-default-rtdb.firebaseio.com/quizes');
      const quizes = [];

      Object.keys(response.data).forEach((key, index) => {
        quizes.push({
          id: key,
          name: `Quiz #${index + 1}`
        })
      });

      this.setState({
        loading: false
      })

      console.log(response);
    } catch (error) {
      console.log(error)
    }
    
  } 

	render() {
		return (
      <div className="QuizList">
        <h1>Quiz List</h1>

        { this.state.loading 
          ? <Loader/> 
          : <ul>
              { this.renderQuizes() }
            </ul>
        } 
      </div>
    )
	}
}