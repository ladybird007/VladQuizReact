import React, {Component} from 'react';
import { connect } from 'react-redux';
import Layout from './hoc/Layout/Layout'; 
import { Route, Routes } from 'react-router-dom';
import Auth from './containers/Auth/Auth';
import Quiz from './containers/Quiz/Quiz';
import QuizList from './containers/QuizList/QuizList';
import QuizCreator from './containers/QuizCreator/QuizCreator';
import Logout from './components/Logout/Logout';
import { autoLogin } from "./store/actions/auth";

class App extends Component {

  componentDidMount() {
    this.props.autoLogin();
  }

  render () {
    let routes = (
      <Routes>
          <Route path="/auth" element={<Auth/>} />
          <Route path="/quiz/:id" element={<Quiz/>} />
          <Route path="/" element={<QuizList/>} exact />
          redirect("/")
      </Routes>
    );
  
    if (this.props.isAuthentificated) {
      routes = (
        <Routes>
          <Route path="/quiz-creator" element={<QuizCreator/>} />
          <Route path="/quiz/:id" element={<Quiz/>} />
          <Route path="/logout" element={<Logout/>} />
          <Route path="/" element={<QuizList/>} exact />
          redirect("/")
        </Routes>
      )
    }
  
    return (
      <Layout>
        { routes }
      </Layout>
    );
  };
  
}

function mapStateToProps(state) {
  return {
    isAuthentificated: !!state.auth.token
  }
}

function mapDispatchToProps(dispatch) {
  return {
    autoLogin: () => dispatch(autoLogin())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
