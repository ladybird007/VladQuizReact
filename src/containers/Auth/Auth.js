import React, {Component} from "react";
import { connect } from 'react-redux';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import { auth } from '../../store/actions/auth';
import './Auth.css';


const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
class Auth extends Component {

  state = {
    isFormValid: false,
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

  loginHandler = (e) => {
    e.preventDefault();

    this.props.auth(
      this.state.formControls.email.value, 
      this.state.formControls.password.value,
      true
    );
  }

  registerHandler = (e) => {
    e.preventDefault();

    this.props.auth(
      this.state.formControls.email.value, 
      this.state.formControls.password.value,
      false
    );
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

    let isFormValid = true;

    Object.keys(formControls).forEach(name => {
      isFormValid = formControls[name].valid && isFormValid
    })

    this.setState({
      formControls,
      isFormValid
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

        <form className="AuthForm">

           { this.renderInputs() } 

          <div>
            <Button 
              type="success" 
              onClick={this.loginHandler}
              disabled={!this.state.isFormValid}
            >
              Log in
            </Button>
            <Button 
              type="primary" 
              onClick={this.registerHandler}
              disabled={!this.state.isFormValid}
            >
              Register
            </Button>
          </div>
        </form>
      </div>
    )
	}
}

function mapDispatchToProps(dispatch) {
  return {
    auth: (email, password, isLogin) => dispatch(auth(email, password, isLogin))
  }
}
 
export default connect(null, mapDispatchToProps)(Auth);