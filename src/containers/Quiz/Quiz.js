import React, {Component} from "react";
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FInishedQuiz/FinishedQuiz";
import axios from "../../axios/axios-quiz";
import Loader from "../../components/UI/Loader/Loader";
import './Quiz.css';


class Quiz extends Component {
  state = {
    results: {},
    isFinished: false,
    activeQuestion: 0,
    answerState: null,
    quiz: [],
    loading: true
  }

  onAnswerClickHandler = answerId => {
    if (this.state.answerState) {
      const key = Object.keys(this.state.answerState)[0];
      if (this.state.answerState[key] === 'success') {
        return
      }
    }


    const question = this.state.quiz[this.state.activeQuestion];
    let results = this.state.results;

    if (question.rightAnswerId === answerId) {
      if(!results[question.id]) {
        results[question.id] = 'success'
      }

      this.setState({
        answerState: {[answerId]: 'success'},
        results
      });

      const timeout = window.setTimeout(() => {
        if (this.isQuizFinished()) {
          this.setState({
            isFinished: true
          })
        } else {
          this.setState({
            activeQuestion: this.state.activeQuestion + 1,
            answerState: null
          })
        }

        window.clearTimeout(timeout);
       }, 1000);
    } else {
      results[question.id] ='error';
      this.setState({
        answerState: {[answerId]: 'error'},
        results
      });
    }
  }

  isQuizFinished() {
    return this.state.activeQuestion + 1 === this.state.quiz.length
  }

  retryHandler = () => {
    this.setState({
      activeQuestion: 0,
      answerState: null,
      isFinished: false,
      results: {}
    })
  }

  async componentDidMount() {
    const href = document.location.href;
    const quizId = href.substring(href.lastIndexOf('/') + 1);
    try {
      const response = await axios.get(`/quizes/${quizId}.json`);
      const quiz = response.data;

      this.setState({
        quiz,
        loading: false
      })
    } catch (e) {
      console.log(e)
    }

  }

  render() {
    const {activeQuestion, quiz, answerState, isFinished, results} = this.state;
    return (
      <div className="Quiz">
        <h1>Quiz</h1>

        {
          this.state.loading 
          ? <Loader />
          : 
            isFinished
              ? <FinishedQuiz
                  results={results}
                  quiz={quiz}
                  quizLength={quiz.length}
                  onRetry={this.retryHandler}
                />
              : <ActiveQuiz 
                  answers={quiz[activeQuestion].answers}
                  question={quiz[activeQuestion].question}
                  onAnswerClick={this.onAnswerClickHandler}
                  quizLength={quiz.length}
                  answerNumber={activeQuestion + 1}
                  answerState={answerState}
                />
          
        }
        
      </div>
    )
  } 
  
}

export default Quiz;