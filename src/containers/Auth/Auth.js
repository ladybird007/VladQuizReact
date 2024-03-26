import React, {Component} from "react";
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input'
import './Auth.css'


const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
export default class Auth extends Component {

  state = {
    formControls: {
      email: {
        value: '',
        type: 'email',
        label: 'Email',
        errorMessage: 'Type correct email',
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true
        },
        autocomplete: 'username'
      },
      password: {
        value: '',
        type: 'password',
        label: 'Password',
        errorMessage: 'Type correct password',
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6
        },
        autocomplete: 'current-password'
      }
    }
  }

  loginHandler = () => {

  }

  resisterHandler = () => {

  }

  submitHandler = () => {

  }

  validateControl (value, validation) {
    if (!validation) {
      return true
    }

    let isValid = true;

    if (validation.required) {
      isValid = value.trim() !== '' && isValid;
    }
    if (validation.email) {
      isValid = validateEmail(value) && isValid;
    }
    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid;
    }

    return isValid;
  }

  onChangeHandler = (event, controlName) => {

    const formControls = { ...this.state.formControls };
    const control = { ...formControls[controlName] };

    control.value = event.target.value;
    control.touched = true;
    control.valid = this.validateControl(control.value, control.validation);

    formControls[controlName] = control;

    this.setState({
      formControls
    });
  }

  renderInputs () {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName];
      return (
        <Input 
          key={controlName + index}
          type={control.type}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          label={control.label}
          autocomplete={control.autocomplete}
          shouldValidate={!!control.validation}
          errorMessage={control.errorMessage}
          onChange={event => this.onChangeHandler(event, controlName)}
        />
      )
    });
  }

	render() {
		return (
      <div className="Auth">
        <h1>Auth</h1>

        <form submit={this.submitHandler} className="AuthForm">

           { this.renderInputs() } 

          <div>
            <Button type="success" onClick={this.loginHandler}>Log in</Button>
            <Button type="primary" onClick={this.registerHandler}>Register</Button>
          </div>
        </form>
      </div>
    )
	}
}