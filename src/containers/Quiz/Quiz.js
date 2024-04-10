import React, {Component} from "react";
import { connect } from "react-redux";
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FInishedQuiz/FinishedQuiz";
import Loader from "../../components/UI/Loader/Loader";
import { fetchQuizById, quizAnswerClick, retryQuiz } from "../../store/actions/quiz";
import './Quiz.css';


class Quiz extends Component {

  componentDidMount() {
    const quizId = (document.location.href).substring((document.location.href).lastIndexOf('/') + 1);
    this.props.fetchQuizById(quizId);
  }

  componentWillUnmount() {
    this.props.retryQuiz();
  }

  render() {
    return (
      <div className="Quiz">
        <h1>Quiz</h1>

        {
          this.props.loading || !this.props.quiz
          ? <Loader />
          : 
            this.props.isFinished
              ? <FinishedQuiz
                  results={this.props.results}
                  quiz={this.props.quiz}
                  quizLength={this.props.quiz.length}
                  onRetry={this.props.retryQuiz}
                />
              : <ActiveQuiz 
                  answers={this.props.quiz[this.props.activeQuestion].answers}
                  question={this.props.quiz[this.props.activeQuestion].question}
                  onAnswerClick={this.props.quizAnswerClick}
                  quizLength={this.props.quiz.length}
                  answerNumber={this.props.activeQuestion + 1}
                  answerState={this.props.answerState}
                />
        }
        
      </div>
    )
  } 
  
}

function mapStateToProps(state) {
  return {
    results: state.quiz.results,
    isFinished: state.quiz.isFinished,
    activeQuestion: state.quiz.activeQuestion,
    answerState: state.quiz.answerState,
    quiz: state.quiz.quiz,
    loading: state.quiz.loading
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchQuizById: id => dispatch(fetchQuizById(id)),
    quizAnswerClick: answerId => dispatch(quizAnswerClick(answerId)),
    retryQuiz: () => dispatch(retryQuiz())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);