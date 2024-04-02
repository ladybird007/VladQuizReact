import React from 'react';
import Layout from './hoc/Layout/Layout'; 
import {Route, Routes, useParams} from 'react-router-dom';
import Auth from './containers/Auth/Auth';
//import Quiz from './containers/Quiz/Quiz';
import QuizList from './containers/QuizList/QuizList';
import QuizCreator from './containers/QuizCreator/QuizCreator';

function Quiz() {
  const { id } = useParams();
}

function App() {
  return (
    <Layout>
      <Routes>
          <Route path="/auth" element={<Auth/>} />
          <Route path="/quiz-creator" element={<QuizCreator/>} />
          <Route path="/quiz/:id" element={<Quiz/>} />
          <Route path="/" element={<QuizList/>} exact />
      </Routes>
    </Layout>
  );
}

export default App;
