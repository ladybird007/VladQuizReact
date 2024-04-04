import React, {Component} from "react";
import './QuizList.css';
import Loader from "../../components/UI/Loader/Loader";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { fetchQuizes } from "../../store/actions/quiz";

class QuizList extends Component {

  renderQuizes() {
    return this.props.quizes.map(quiz => {
      return (
        <li key={quiz.id}>
          <NavLink to={'/quiz/' + quiz.id}>
            {quiz.name}
          </NavLink>
        </li>
      )
    })
  }

  componentDidMount() {
    this.props.fetchQuizes(); 
  } 

	render() {
		return (
      <div className="QuizList">
        <h1>Quiz List</h1>

        { this.props.loading && this.props.quizes.length !== 0
          ? <Loader/> 
          : <ul>
              { this.renderQuizes() }
            </ul>
        } 
      </div>
    )
	}
}

function mapStateToProps(state) {
  return {
    quizes: state.quiz.quizes,
    loading: state.quiz.loading
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchQuizes: () => dispatch(fetchQuizes())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizList);