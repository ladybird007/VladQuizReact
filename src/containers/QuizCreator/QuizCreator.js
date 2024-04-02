import React, {Component} from "react";
import axios from 'axios';
import Button from "../../components/UI/Button/Button";
import {createControl, validate, validateForm} from "../../form/formFramework";
import Input from "../../components/UI/Input/Input";
import Select from "../../components/UI/Select/Select";
import '../QuizCreator/QuizCreator.css'

function createOptionControl(number) {
    return createControl({
        label: `Variant ${number}`,
        errorMessage: 'Field can not be empty',
        id: number
    }, {required: true})
}

function createFormControls() {
  return ({
    question: createControl({
      label: 'Type your question',
      errorMessage: 'Field can not be empty'
    }, {required: true}),
    option1: createOptionControl(1),
    option2: createOptionControl(2),
    option3: createOptionControl(3),
    option4: createOptionControl(4)
  })
}

export default class QuizCreator extends Component {

    state = {
        quiz: [],
        isFormValid: false,
        rightAnswerId: '1',
        formControls: createFormControls()
    }

    submitHandler = event => {
      event.preventDefault();
    }

    addQuestionHandler = (event) => {
      event.preventDefault();

      const quiz = [...this.state.quiz];
      const index = quiz.length + 1;

      const {question, option1, option2, option3, option4 } = this.state.formControls

      const questionItem = {
        question: question.value,
        id: index,
        rightAnswerId: this.state.rightAnswerId,
        answers: [
          {text: option1.value, id: option1.id},
          {text: option2.value, id: option2.id},
          {text: option3.value, id: option3.id},
          {text: option4.value, id: option4.id},
        ]
      }

      quiz.push(questionItem);

      this.setState({
        quiz,
        isFormValid: false,
        rightAnswerId: '1',
        formControls: createFormControls()
      })
    }

    createQuizHandler = (event) => {
      event.preventDefault();

      axios.post('https://quiz-61d92-default-rtdb.firebaseio.com/quizes', this.state.quiz)
        .then(response => {
          console.log('response', response)
        })
        .catch(error => console.log('error', error))
    }

    changeHandler = (value, controlName) => {
      const formControls = { ...this.state.formControls };
      const control = { ...formControls[controlName] };
     
      control.touched = true;
      control.value = value;
      control.valid = validate(control.value, control.validation);
    
      formControls[controlName] = control;
    
      this.setState({
        formControls,
        isFromValid: validateForm(formControls)
      })
    }

    renderControls() {
      return Object.keys(this.state.formControls).map((controlName, index) => {
        const control = this.state.formControls[controlName];

        return (
          <>
            <Input 
              key={control.htmlFor}
              label={control.label}
              value={control.value}
              valid={control.valid}
              shouldValidate={!!control.validation}
              touched={control.touched}
              errorMessage={control.errorMessage}
              onChange={event => this.changeHandler(event.target.value, controlName)}
            />
            { index === 0 ? <hr/> : null}
          </>
        )
      })
    }

    selectChangeHandler = (event) => {
      this.setState({
        rightAnswerId: +event.target.value
      })
    }

    render() {
      const select = <Select
        label="Check correct answer"
        value={this.state.rightAnswer}
        onChange={this.selectChangeHandler}
        options={[
          { text: '1', value: 1 },
          { text: '2', value: 2 },
          { text: '3', value: 3 },
          { text: '4', value: 4 }
        ]}
      />
        return (
            <div className="QuizCreator">
              <h1>Quiz Creator</h1>

              <form className="AuthForm" onSubmit={this.submitHandler}>
                { this.renderControls() }
                { select }
                <div>
                    <Button 
                      type="primary" 
                      onClick={this.addQuestionHandler} 
                      disabled={!this.state.isFromValid}
                    >
                        Add question
                    </Button>
                    <Button 
                      type="success" 
                      onClick={this.createQuizHandler}
                      disabled={this.state.length === 0}
                    >
                        Create quiz
                    </Button>
                </div>
              </form>
            </div>
        )
    }
}