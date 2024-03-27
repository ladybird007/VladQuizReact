import React, {Component} from "react";
import Button from "../../components/UI/Button/Button";
import {createControl} from "../../form/formFramework";
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

const changeHandler = (value, controlName) => {

}
export default class QuizCreator extends Component {

    state = {
        quiz: [],
        rightAnswerId: '1',
        formControls: createFormControls()
    }

    submitHandler = event => {
        event.preventDefault();
    }

    addQuestionHandler = () => {}

    createQuizHandler = () => {}

    renderControls() {
      return Object.keys(this.state.formControls).map((controlName, index) => {
        const control = this.state.formControls[controlName];

        return (
          <>
            <Input 
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
                <h1>QuizCreator</h1>

                <form className="AuthForm" onSubmit={this.submitHandler}>
                    { this.renderControls() }
                    { select }
                    <div>
                        <Button type="primary" onClick={this.addQuestionHandler}>
                            Add question
                        </Button>
                        <Button type="success" onClick={this.createQuizHandler}>
                            Create quiz
                        </Button>
                    </div>
                </form>
            </div>
        )
    }
}